// router.get('/', recordsController.getAllRecords);
// router.post('/', recordsController.addNewRecord);
// router.get('/:id', recordsController.getRecordById);
// router.put('/:id', recordsController.updateRecordById);
// router.delete('/:id', recordsController.deleteRecordById);

const { DataTypes, Op } = require('sequelize');
const db = require('../configs/database');
const { getTimeStamp, getISOTimeStamp, getDateDiff } = require('../utils/timelib');
const _recordsModel = require('../models/records');
const _usersModel = require('../models/users');
const _booksModel = require('../models/books');

const recordsModel = _recordsModel(db, DataTypes);
const usersModel = _usersModel(db, DataTypes);
const booksModel = _booksModel(db, DataTypes);

exports.getAllRecords = async (req, res) => {
    await recordsModel.findAll({order: [['id', 'DESC']]})
    .then(records => {
        if (records === null || records.length === 0) {
            res.status(500).send({
                message: 'No records exist!'
            });
        } else  {
            res.send({'data': records});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of records!'
        });
    });
};

exports.addNewRecord = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await recordsModel.create({
        book_id: req.body.book_id,
        user_id: req.body.user_id,
        lent_date: req.body.lent_date, /* timestamp */
        due_date: req.body.due_date,
        overdue: req.body.overdue,
        returned: req.body.returned,
        updated_by: req.body.updated_by,
        updated_on: getISOTimeStamp() /* timestamp */
    }, { fields: ['book_id', 'user_id', 'lent_date', 'due_date', 'overdue', 'returned', 'updated_by', 'updated_on'] })
    .then(async queryResult => {
        await recordsModel.findOne({where: {id: queryResult.id}})
        .then(record => {
            if (record !== null) res.send({'data': record});
            else {
                res.status(500).send({
                    message: 'The record does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created record!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new record!'
        });
    });
};

exports.getRecordById = async (req, res) => {
    await recordsModel.findOne({where: {id: req.params.id}})
    .then(record => {
        if (record !== null) res.send({'data': record});
        else {
            res.status(500).send({
                message: 'The record does not exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the record!'
        });
    });
};

exports.updateRecordById = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await recordsModel.update({
        // book_id: req.body.book_id,
        // user_id: req.body.user_id,
        // lent_date: req.body.lent_date, /* timestamp */
        due_date: req.body.due_date,
        overdue: req.body.overdue,
        returned: req.body.returned,
        updated_by: req.body.updated_by,
        updated_on: req.body.updated_on /* timestamp */
    }, {where: {id: req.params.id}}, { fields: [/* 'book_id', 'user_id', 'lent_date', */ 'due_date', 'overdue', 'returned', 'updated_by', 'updated_on'] })
    .then(async queryResult => {
        [ updateResult ] = queryResult;
        await recordsModel.findOne({where: {id: req.params.id}})
        .then(record => {
            if (record !== null) res.send({'data': {...record.dataValues, 'updated': updateResult}});
            else {
                res.status(500).send({
                    message: 'The record does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the updated record!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating the record!'
        });
    });
};

exports.deleteRecordById = async (req, res) => {
    await recordsModel.findOne({where: {id: req.params.id}})
    .then(async record => {
        await recordsModel.destroy({where: {id: req.params.id}})
        .then(async queryResult => {
            if (queryResult) res.send({'data': {...record.dataValues, 'deleted': queryResult}});
            else {
                res.status(500).send({
                    message: 'The record does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the record!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the deleted record!'
        });
    });
};