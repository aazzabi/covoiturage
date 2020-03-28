var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var user = require("../models/User");
const tokenList = {};
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');
const { OAuth2Client } = require('google-auth-library');

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

var register = (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.lastName || !req.body.firstName) {
        res.json({success: false, msg: 'Please pass the necessary information .'});
    } else {
        user.create({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            phone: req.body.phone,
            gender: req.body.gender,
            avatar: req.body.avatar,
        }).then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
            .catch(error => {
                res.set('Content-Type', 'text/html');
                res.status(500).send(error);
            });
    }
};

var uploadUserImage = (req, res, next) => {
    console.log(req.body.id, 'id');
    console.log(req.file, 'file');
    // upload(req, res, function (error) {
    //     if (error) {
    //         res.status(500).json(error);
    //     } else {
    //         var ext = '';
    //         switch (req.file.mimetype)
    //         {
    //             case 'image/png':
    //             {
    //                 ext = '.png';
    //                 break;
    //             }
    //             case 'image/jpeg':
    //             {
    //                 ext = '.jpeg';
    //                 break;
    //             }
    //             case 'image/bmp':
    //             {
    //                 ext = '.bmp';
    //                 break;
    //             }
    //         }
    //         var hashName = crypto.createHash('md5').update(req.file.originalname).digest("hex");
    //         fs.rename(config.upload.directory + '\\users\\' + req.file.originalname ,
    //             config.upload.directory + '\\users\\' + hashName  + ext ,
    //             (error) => {
    //                 if (error) {
    //                     // Show the error
    //                     console.log(error);
    //                 }
    //                 else {
    //                     user.updateOne({"_id": req.body.id}, {"$set": {"avatar": hashName + ext }} );
    //                     console.log("\nFile Renamed\n");
    //                 }
    //             });
    //         res.status(202).json("data");
    //     }
    // });
};

var login = (req, res, next) => {
    user.findOne({
        email: req.body.email
    }, function (err, u) {
        if (err) throw err;

        if (!u) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            console.log(u);
            console.log(req.body.password);
            // check if password matches
            u.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log(u);
                    // if user is found and password is right create a token
                    var token = jwt.sign(u.toJSON(), config.authentification.secret);
                    var refreshToken = jwt.sign(u.toJSON(), config.authentification.refreshTokenSecret, {expiresIn: config.authentification.refreshTokenLife})
                    tokenList[refreshToken] = res;
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
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
                        user.save((err, data) => {
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
    uploadUserImage,
    googleLogin
};

