var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');

router.get('/profile', isAuthenticated, userController.profile);
router.get('/getAllUsers',isAuthenticated, userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);

module.exports = router;
