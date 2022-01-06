const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.addNewUser); 
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

// auth
router.post('/getToken', usersController.getToken);
router.post('/refreshToken', usersController.refreshToken);

module.exports = router;