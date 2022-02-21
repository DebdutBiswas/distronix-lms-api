const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/getToken', usersController.getToken);
router.post('/refreshToken', usersController.refreshToken);
router.delete('/invalidateToken', usersController.invalidateToken);

module.exports = router;