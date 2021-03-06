var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var User = require("../models/User");
const tokenList = {};
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');
const {OAuth2Client} = require('google-auth-library');
const {check, validationResult} = require("express-validator/check");
const recaptchaHelpers = require('../helpers/recaptcha');
var _ = require('lodash');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directory + '\\drivers\\');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('image');

var register = async (req, res) => {
    const checkUsername = await User.findOne({'username': req.body.username});
    if (!checkUsername) {
        const recaptchaData = {
            remoteip: req.connection.remoteAddress,
            response: req.body.recaptchaResponse,
            secret: config.recaptcha.RECAPTCHA_SECRET_KEY,
        };
        console.log('here')
        recaptchaHelpers.verifyRecaptcha(recaptchaData)
            .then(() => {
                console.log('here')
                User.findOne({email: req.body.email}).then(u => {
                    if (!u) {

                        console.log('here')
                        const newUser = new User({
                            username: req.body.username,
                            lastName: req.body.lastName,
                            firstName: req.body.firstName,
                            email: req.body.email,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            avatar: req.body.avatar,
                        });
                        console.log(newUser, 'newUser')

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
                            console.log(data, 'data')
                            await User.updateOne({'_id': data._id}, {$set: {'password': pwd}});
                            res.set('Content-Type', 'application/json');
                            res.status(202).json(data);
                        })
                            .catch(error => {
                                console.log(error, 'error')
                                res.set('Content-Type', 'application/json');
                                res.status(500).send(error);
                            });
                    } else {
                        res.set('Content-Type', 'application/json');
                        res.send({status: 400, message: "Email already exists"});
                    }
                })
            });

    } else {
        res.set('Content-Type', 'application/json');
        res.send ({"status": 400, message: "Username already exists"});
    }
};

var login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {email, password} = req.body;
    //ParserBody
    console.log(req.body);
    try {
        console.log(req.body);
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
        const isMatch = await bcrypt.compareSync(password, u.password);
        console.log(password, 'password');
        console.log(u.password, 'u.password');
        console.log(isMatch);
        if (isMatch === false) {
            return res.status(400).json({'status': 'error', 'message': 'Invalid Credentials'});
        }
        const payload = {
            User: {
                id: u.id,
                username: u.username,
                role: u.role,
                email: u.email,
                phone: u.phone,
                lastName: u.lastName,
                firstName: u.firstName,
            }
        };
        jwt.sign(
            u.toJSON(),
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
        res.status(500).json({'status': 'error', 'message': 'Invalid Credentials'});
    }
};

var token = (req, res) => {
    const postData = req.body
    if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "username": postData.username
        };
        const token = jwt.sign(user, config.authentification.secret, {expiresIn: config.authentification.tokenLife})
        const response = {
            "token": token,
        };
        tokenList[postData.refreshToken].token = token;
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
};

const client = new OAuth2Client('871066785220-82c81c51vgc954etqo4fo5d5b9505c3c.apps.googleusercontent.com');
var googleLogin = (req, res) => {
    console.log("req.body");
    const {idToken} = req.body;

    client.verifyIdToken({
        idToken,
        audience: '871066785220-hldeeag52kteqd0krje4cvmcfkvci3ui.apps.googleusercontent.com'
    })
        .then(response => {
            console.log("req.body 155");
            const {email_verified, name, email} = response.payload;
            if (email_verified) {
                User.findOne({email}).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({_id: user._id}, config.authentification.secret, {expiresIn: '7d'});
                        const {_id, email, name, role} = user;
                        return res.json({
                            token,
                            user: {_id, email, name, role}
                        });
                    } else {
                        let password = email + config.authentification.secret;
                        user = new User({name, email, password});
                        User.save((err, data) => {
                            if (err) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    error: 'User signup failed with google'
                                });
                            }
                            const token = jwt.sign({_id: data._id}, config.authentification.secret, {expiresIn: '7d'});
                            const {_id, email, name, role} = data;
                            return res.json({
                                token,
                                user: {_id, email, name, role}
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                });
            }
        });
};

signToken = user => {
    return jwt.sign(user.toJSON(), config.authentification.secret);
};
var googleOAuth = (req, res, next) => {
    console.log('req.user ', req.user);
    const token = signToken(req.user);
    res.status(200).json({token});
};
var facebookOAuth = (req, res, next) => {
    console.log('req.user ', req.user);
    const token = signToken(req.user);
    res.status(200).json({token});
};

var secret = async (req,res, next) => {
    console.log('I managed to get here');
    res.json({secret: 'ressource'});
};
module.exports = {
    login,
    token,
    register,
    googleLogin,
    googleOAuth,
    facebookOAuth,
    secret,
};

