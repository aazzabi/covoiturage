var user = require('../models/User');
var groupModel = require('../models/Group');
var privilege = require('../models/Privilege');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var config = require('../config/database');

var getAllUsers = (req, res, next) => {
    user.find({}).sort('firstName')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

var getUserById = (req, res, next) => {
    user.findOne({"_id": req.params.id})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

var profile=  function (req, res) {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send(decoded);
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    profile
};