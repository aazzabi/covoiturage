var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthenticationController');
var emailController = require('../controllers/SendEmailController');
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const isAuthenticated = require('../policies/isAuthenticated');
var multer = require('multer');
var config = require('../config/config');
var User = require('../models/User');
const crypto = require('crypto');
var fs = require('fs');
const passport = require('passport');
const {check, validationResult} = require("express-validator/check");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directoryUsersImage);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadImage = multer({storage: storage}).single('image');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/token', authController.token);
router.post('/sendEmail', emailController.sendEmail);
router.get('/auth/google', passport.authenticate('google', {scope: ["profile", "email"] }));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });
router.post('/uploadUserImage/:id', async (req, res, next) => {
    const idU = req.params.id;
    var hashName = crypto.createHash('md5').update(idU).digest("hex");
    var ext = '';
    uploadImage(req, res, async function (error) {
        console.log(hashName);
        if (error) {
            res.status(500).json(error);
        } else {
            switch (req.files.image.mimetype) {
                case 'image/png': {
                    ext = '.png';
                    break;
                }
                case 'image/jpeg': {
                    ext = '.jpeg';
                    break;
                }
                case 'image/bmp': {
                    ext = '.bmp';
                    break;
                }
            }
            await User.updateOne({"_id": idU}, {"avatar": hashName + ext}).then((data) => {
                req.files.image.mv(config.upload.directoryUsersImage + hashName + ext);
                res.send({
                    status: true,
                    message: 'File is uploaded',
                });
                // fs.rename(config.upload.directoryUsersImage + req.files.image.name,
                //     config.upload.directoryUsersImage + hashName + ext,
                //     (error) => {
                //         if (error) {
                //             res.status(400).json({"success": false, "message": error});
                //         } else {
                //             res.status(202).json({"success": true, "message": "User image was uploaded successfully"});
                //         }
                //     });
            });
        }
    });

});
router.post('/google-login', authController.googleLogin);



module.exports = router;
