// router.get('/', usersController.getAllUsers);
// router.post('/', usersController.addNewUser); 
// router.get('/:id', usersController.getUserById);
// router.put('/:id', usersController.updateUserById);
// router.delete('/:id', usersController.deleteUserById);

const { DataTypes, Op } = require('sequelize');
const { sha256HashGen, sha256HashCheck } = require('../utils/hashlib');
const db = require('../configs/database');
const _usersModel = require('../models/users');
const usersModel = _usersModel(db, DataTypes);

exports.getAllUsers = async (req, res) => {
    await usersModel.findAll({attributes: {exclude: ['password']}, order: [['id', 'DESC']]})
    .then(users => {
        res.send({'data': users});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of users!'
        });
    });
};

exports.addNewUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await usersModel.create({
        username: req.body.username,
        password: sha256HashGen(req.body.password),
        name: req.body.name,
        active: 1,
        role: 2,
        reg_by: 1
    }, { fields: ['username', 'password', 'name', 'active', 'role', 'reg_by'] })
    .then(async queryResult => {
        await usersModel.findOne({where: {id: queryResult.id}, attributes: {exclude: ['password']}})
        .then(user => {
            res.send({'data': user});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating newly created user!'
        });
    });
};

exports.getUserById = async (req, res) => {
    await usersModel.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
    .then(user => {
        res.send({'data': user});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the user!'
        });
    });
};

exports.updateUserById = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await usersModel.update({
        username: req.body.username,
        password: sha256HashGen(req.body.password),
        name: req.body.name,
        active: req.body.active,
        role: req.body.role
    }, {where: {id: req.params.id}}, { fields: ['username', 'password', 'name', 'active', 'role'] })
    .then(async queryResult => {
        [ updateResult ] = queryResult;
        await usersModel.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
        .then(user => {
            res.send({'data': user, 'updated': updateResult});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the updated user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating the user!'
        });
    });
};

exports.deleteUserById = async (req, res) => {
    await usersModel.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
    .then(async user => {
        await usersModel.destroy({where: {id: req.params.id}})
        .then(async queryResult => {
            if (queryResult) res.send({'data': user, 'deleted': queryResult});
            else res.send({'deleted': queryResult});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the user!'
        });
    });
};

exports.getToken = async (req, res) => {

};

exports.refreshToken = async (req, res) => {

};