var user = require('../models/User');
var driverRequest = require('../models/DriverRequest');
var allCarsModelsCapacity = require('../models/AllCarsModelCapacity');
var groupModel = require('../models/Group');
var privilege = require('../models/Privilege');
var _ = require('lodash');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
const {imageHash} = require('image-hash');
const crypto = require('crypto')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directoryDrivers);
    },
    filename: function (req, file, cb) {
        console.log(file); //log the file object info in console
        cb(null, file.originalname);
    }
});
var uploadDocs = multer({storage: storage}).array('document');


var getAll = (req, res, next) => {
    user.find({}).sort('firstName')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var getAllUsers = (req, res, next) => {
    user.find({"role": "USER"}).sort('firstName')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var getAllDrivers = (req, res, next) => {
    user.find({"role": "DRIVER"}).sort('firstName')
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
var updateUser = (req, res, next) => {
    console.log(req.body);
    const updateData = req.body;
    if (!updateData) {
        res.status(422).send({"message": "please provide what you want to update"})
    }
    user.findOne({"_id": req.params.id}).then(function (user) {
        console.log(req.params.id, 'id');
        console.log(user, 'id');
        if (!user) {
            return res.sendStatus(401);
        }
        //NOTE  only update fields that were actually passed...
        if (typeof updateData.username !== 'undefined') {
            user.username = updateData.username;
        }
        if (typeof updateData.email !== 'undefined') {
            user.email = updateData.email;
        }
        if (typeof updateData.firstName !== 'undefined') {
            user.firstName = updateData.firstName;
        }
        if (typeof updateData.lastName !== 'undefined') {
            user.lastName = updateData.lastName;
        }
        if (typeof updateData.phone !== 'undefined') {
            user.phone = updateData.phone;
        }
        if (typeof updateData.role !== 'undefined') {
            user.role = updateData.role;
        }
        return user.save()
            .then(function () {
                return res.json({user: user});
            });
    }).catch(() => {
            res.status(422).send({"message": "couldn't update user"})
        }
    );
};

var profile = function (req, res) {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, config.authentification.secret, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        res.status(200).send(decoded);
    });
};

var becomeDriverRequest = async (req, res) => {
    console.log(req.params.id);
    if (await user.findOne({"_id": req.params.id}) != null) {
        const us = await user.findOne({"_id": req.params.id});
        const dreq = await driverRequest.findOne({"user": us});
        const c = await allCarsModelsCapacity.findOne({"marque": req.body.marque, "model": req.body.model});
        if (dreq == null) {
            if (!us.car) {
                car.create({
                    capacite: c.capacite,
                    owner: us,
                    year: req.body.year,
                    color: req.body.color,
                    marque: req.body.marque,
                    model: req.body.model,
                }).then(async (data) => {
                        const add = await user.update({"_id": req.params.id}, {"$set": {"car": data}});
                        driverRequest.create({user: us})
                            .then((dq) => {
                                console.log(dq, 'driver request');
                                res.status(202).json(data);
                            }, err => {
                                res.status(202).json(err);
                            });

                    },
                    (error) => res.status(200).send(error));
            } else {
                res.status(200).send({"status": 400, "message": "This user already have a car"});
            }
        }else {
            res.status(202).json({"status": "error", "message": "request exists with this user"});
        }

    } else {
        res.status(200).send({"status": 400, "message": "This user doesn't exist"});
    }
};

var deleteUser = (req, res) => {
    user.remove({"_id": req.params.idUser})
        .then((data) => console.log(data), (error) => console.log(error));
};
var refuseDriverRequest = (req, res) => {
    driverRequest.remove({"_id": req.params.idUser})
        .then((data) => console.log(data), (error) => console.log(error));
};
var uploadDocumentForDriver = (req, res) => {
    uploadDocs(req, res, async function (error) {
        req.files.forEach((fi) => {
            console.log(fi, 'fi');
        });
        console.log(req.body, 'body');
    });
};
module.exports = {
    getAll,
    getAllUsers,
    getAllDrivers,
    updateUser,
    deleteUser,
    getUserById,
    profile,
    uploadDocumentForDriver,
    becomeDriverRequest,
    profile
};
