var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var user = require("../models/User");
const tokenList = {};

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

var login = (req, res, next) => {
    user.findOne({
        username: req.body.username
    }, function (err, u) {
        if (err) throw err;

        if (!u) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            u.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log(u);
                    // if user is found and password is right create a token
                    var token = jwt.sign(u.toJSON(), config.authentification.secret);
                    var refreshToken = jwt.sign(u.toJSON(), config.authentification.refreshTokenSecret, { expiresIn: config.authentification.refreshTokenLife})
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
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "username": postData.username
        };
        const token = jwt.sign(user, config.authentification.secret, { expiresIn: config.authentification.tokenLife})
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

module.exports = {
    login,
    token,
    register,
};

