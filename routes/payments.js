const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments');

router.get('/', paymentsController.getAllPayments);
router.post('/', paymentsController.addNewPayment);
router.get('/:id', paymentsController.getPaymentById);
router.put('/:id', paymentsController.updatePaymentById);
router.delete('/:id', paymentsController.deletePaymentById);

module.exports = router;