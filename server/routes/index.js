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
const bcrypt = require("bcryptjs");

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


router.post("/authenticate", [
        check("email", "Please enter a valid Email").isEmail(),
        check("password", "Password is required").exists()
    ], async (req, res) => {
        //Check errors in  the body
        const errors = validationResult(req);
        //Bad Request
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {email, password} = req.body;
        //ParserBody
        console.log(req.body); // lezem middleware lel hkeya hedhi
        try {
            console.log(req.body); // lezem middleware lel hkeya hedhi
            // See if User exists
            let u = await User.findOne({
                email
            });
            if (!u) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Invalid Credentials "
                        }
                    ]
                });
            }
            //See if password matches
            const isMatch = await bcrypt.compareSync(password, u.password);
            console.log(password , 'password');
            console.log(u.password , 'u.password');
            console.log(isMatch);
            if (isMatch === false) {
                return res.status(400).json({ 'status': 'error', 'message': 'Invalid Credentials' });
            }
            // Return Json WebToken
            const payload = {
                User: {
                    id: u.id,
                    username: u.username,
                    role: u.role,
                }
            }; //l'emport
            jwt.sign(
                payload,
                config.authentification.secret,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
        } catch (error) {
            console.log(error.message);
            res.status(500).send("server Error");
        }
    }
);
router.post("/inscription",  (req, res) => {
    User.findOne({email: req.body.email}).then(u => {
        if (u) {
            return res.status(400).json({msg: "Email already exists"});
        } else {
            const newUser = new User({
                username: req.body.username,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                avatar: req.body.avatar,
            });
            // hashSync : 3tatni hash , compatible ( selon bcrypt-generator)
            const pwd = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            newUser.password = pwd;
            User.create({
                password: newUser.password,
                username: newUser.username,
                lastName: newUser.lastName,
                firstName: newUser.firstName,
                email: newUser.email,
                phone: newUser.phone,
                gender: newUser.gender,
                avatar: newUser.avatar,
            }).then(async (data) => {
                await User.updateOne({'_id': data._id}, {$set: {'password': pwd}});
                res.set('Content-Type', 'application/json');
                res.status(202).json(data);
            })
            .catch(error => {
                res.set('Content-Type', 'application/json');
                res.status(500).send(error);
            });
        }
    });
});


module.exports = router;
