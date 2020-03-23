var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var config = require('../config/config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directory + '\\drivers');
    },
    filename: function (req, file, cb) {
        console.log(file); //log the file object info in console
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

router.get('/profile', isAuthenticated, userController.profile);
router.get('/getAllUsers',isAuthenticated, userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/becomeDriver/:id', userController.becomeDriver);

module.exports = router;
