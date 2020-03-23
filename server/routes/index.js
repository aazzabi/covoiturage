var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthenticationController');
var emailController = require('../controllers/SendEmailController');
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const isAuthenticated = require('../policies/isAuthenticated');
var multer = require('multer');
var config = require('../config/config');
var user = require('../models/User');
const crypto = require('crypto');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directoryUsersImage );
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadImage = multer({storage: storage}).single('image');

/* GET home page. */
router.get('/', function(req, res, next) {res.render('index', { title: 'Express' });});

router.post('/login', authController.login);
router.post('/register',  authController.register);
router.post('/token', authController.token);
router.post('/sendEmail', emailController.sendEmail);

router.post('/uploadUserImage/:id',  async (req, res, next) => {
    const idU = req.params.id;
    var hashName = crypto.createHash('md5').update(idU).digest("hex");
    var ext = '';
    uploadImage(req, res, async function (error) {
            console.log(hashName);
            if (error) {
                res.status(500).json(error);
            } else {
                switch (req.file.mimetype)
                {
                    case 'image/png':
                    { ext = '.png';  break; }
                    case 'image/jpeg':
                    { ext = '.jpeg'; break; }
                    case 'image/bmp':
                    {ext = '.bmp'; break; }
                }
                await user.updateOne( {"_id" : idU } , {"avatar": hashName + ext} ).then((data) => {
                    fs.rename(config.upload.directoryUsersImage + req.file.originalname,
                        config.upload.directoryUsersImage  + hashName  + ext ,
                        (error) => {
                            if (error) {
                                res.status(400).json({"success": false, "message": error });
                            }
                            else {
                                res.status(202).json({"success": true, "message": "user image was uploaded successfully"});
                            }
                        });
                });

            }
    });

});

module.exports = router;
