// router.get('/', usersController.getAllUsers);
// router.post('/', usersController.addNewUser); 
// router.get('/:id', usersController.getUserById);
// router.put('/:id', usersController.updateUserById);
// router.delete('/:id', usersController.deleteUserById);

// auth
// router.post('/getToken', usersController.getToken);
// router.post('/refreshToken', usersController.refreshToken);

const { DataTypes, Op } = require('sequelize');
const { sha256HashGen, sha256HashCheck } = require('../utils/hashlib');
const db = require('../configs/database');
const _usersModel = require('../models/users');

const usersModel = _usersModel(db, DataTypes);

exports.getAllUsers = async (req, res) => {
    await usersModel.findAll({attributes: {exclude: ['password']}, order: [['id', 'DESC']]})
    .then(users => {
        if (users === null || users.length === 0) {
            res.status(500).send({
                message: 'No users exist!'
            });
        } else {
            res.send({'data': users});
        }
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
            if (user !== null) res.send({'data': user});
            else {
                res.status(500).send({
                    message: 'The user does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new user!'
        });
    });
};

exports.getUserById = async (req, res) => {
    await usersModel.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
    .then(user => {
        if (user !== null) res.send({'data': user});
        else {
            res.status(500).send({
                message: 'The user does not exist!'
            });
        }
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
            if (user !== null) res.send({'data': user, 'updated': updateResult});
            else {
                res.status(500).send({
                    message: 'The user does not exist!'
                });
            }
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
            else {
                res.status(500).send({
                    message: 'The user does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the user!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the deleted user!'
        });
    });
};

exports.getToken = async (req, res) => {

};

exports.refreshToken = async (req, res) => {

};