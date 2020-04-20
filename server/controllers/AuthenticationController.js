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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directory + '\\drivers\\');
    },
    filename: function (req, file, cb) {
        console.log(file); //log the file object info in console
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('image');

var register =  (req, res) => {
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
};

var login = async (req, res) => {
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
                email: u.email,
                phone: u.phone,
                lastName: u.lastName,
                firstName: u.firstName,
            }
        }; //l'emport
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
        res.status(500).send("server Error");
    }
};

var token = (req, res) => {
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "username": postData.username
        };
        const token = jwt.sign(user, config.authentification.secret, {expiresIn: config.authentification.tokenLife})
        const response = {
            "token": token,
        };
        // update the token in the list
        tokenList[postData.refreshToken].token = token;
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
};

const client = new OAuth2Client('871066785220-hldeeag52kteqd0krje4cvmcfkvci3ui.apps.googleusercontent.com');
var googleLogin = (req, res) => {
    console.log("req.body");
    const {idToken} = req.body;

    client.verifyIdToken({
        idToken,
        audience: '871066785220-hldeeag52kteqd0krje4cvmcfkvci3ui.apps.googleusercontent.com'
    })
        .then(response => {
            console.log("req.body 155");
            // console.log('GOOGLE LOGIN RESPONSE',response)
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

module.exports = {
    login,
    token,
    register,
    googleLogin
};

