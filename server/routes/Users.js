var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/login', userController.login);
router.post('/addUser', userController.addUser);


module.exports = router;
