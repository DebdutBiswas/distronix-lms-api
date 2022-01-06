const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records');

router.get('/', recordsController.getAllRecords);
router.post('/', recordsController.addNewRecord);
router.get('/:id', recordsController.getRecordById);
router.put('/:id', recordsController.updateRecordById);
router.delete('/:id', recordsController.deleteRecordById);

module.exports = router;