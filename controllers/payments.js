// router.get('/', paymentsController.getAllPayments);
// router.post('/', paymentsController.addNewPayment);
// router.get('/:id', paymentsController.getPaymentById);
// router.put('/:id', paymentsController.updatePaymentById);
// router.delete('/:id', paymentsController.deletePaymentById);

const { DataTypes, Op } = require('sequelize');
const db = require('../configs/database');
const { getISOTimeStamp } = require('../utils/timelib');
const _paymentsModel = require('../models/payments');

const paymentsModel = _paymentsModel(db, DataTypes);

exports.getAllPayments = async (req, res) => {
    await paymentsModel.findAll({order: [['id', 'DESC']]})
    .then(payments => {
        if (payments === null || payments.length === 0) {
            res.status(500).send({
                message: 'No payments exist!'
            });
        } else {
            res.send({'data': payments});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of payments!'
        });
    });
};

exports.addNewPayment = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await paymentsModel.create({
        record_id: req.body.record_id,
        pay_amount: req.body.pay_amount,
        pay_date: req.body.pay_date,
        updated_by: req.body.updated_by,
        updated_on: req.body.updated_on
    }, { fields: ['record_id', 'pay_amount', 'pay_date', 'updated_by', 'updated_on'] })
    .then(async queryResult => {
        await paymentsModel.findOne({where: {id: queryResult.id}})
        .then(payment => {
            if (payment !== null) res.send({'data': payment});
            else {
                res.status(500).send({
                    message: 'The payment does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created payment!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new payment!'
        });
    });
};

exports.getPaymentById = async (req, res) => {
    await paymentsModel.findOne({where: {id: req.params.id}})
    .then(payment => {
        if (payment !== null) res.send({'data': payment});
        else {
            res.status(500).send({
                message: 'The payment does not exist!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the payment!'
        });
    });
};

exports.updatePaymentById = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Please fill all required field'
        });
    }

    await paymentsModel.update({
        pay_amount: req.body.pay_amount,
        pay_date: req.body.pay_date,
        updated_by: req.body.updated_by,
        updated_on: getISOTimeStamp()
    }, {where: {id: req.params.id}}, { fields: ['pay_amount', 'pay_date', 'updated_by', 'updated_on'] })
    .then(async queryResult => {
        [ updateResult ] = queryResult;
        await paymentsModel.findOne({where: {id: req.params.id}})
        .then(payment => {
            if (payment !== null) res.send({'data': {...payment.dataValues, 'updated': updateResult}});
            else {
                res.status(500).send({
                    message: 'The payment does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the updated payment!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating the payment!'
        });
    });
};

exports.deletePaymentById = async (req, res) => {
    await paymentsModel.findOne({where: {id: req.params.id}})
    .then(async payment => {
        await paymentsModel.destroy({where: {id: req.params.id}})
        .then(async queryResult => {
            if (queryResult) res.send({'data': {...payment.dataValues, 'deleted': queryResult}});
            else {
                res.status(500).send({
                    message: 'The payment does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the payment!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the deleted payment!'
        });
    });
};