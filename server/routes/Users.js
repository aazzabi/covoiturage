var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var config = require('../config/config');
var authorize = require('../policies/Permition')
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
router.get('/getAll', userController.getAll);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllDrivers', userController.getAllDrivers);
router.post('/updateUser/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);
router.get('/getUserById/:id', userController.getUserById);
router.post('/becomeDriver/:id', userController.becomeDriverRequest);
router.post('/refuseDriverRequest/:idUser', authorize(['ADMIN']), userController.becomeDriverRequest);
router.post('/uploadDocumentForDriver', userController.uploadDocumentForDriver);

module.exports = router;
