var Group = require('../models/Group');
var driverRequest = require('../models/DriverRequest');
var user = require('../models/User');
var car = require('../models/Car');
var allCarsModelsCapacity = require('../models/AllCarsModelCapacity');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var getAll = (req, res, next) => {
    car.find({}).then((data) => {
        res.status(200).send(data);
    }, error => {
        res.status(400).send(error);
    });
};

var getAllCarsModelCapacity = (req, res, next) => {
    allCarsModelsCapacity.find({}).then((data) => {
        res.status(200).send(data);
    }, error => {
        res.status(400).send(error);
    });
};

// var addCarToUser = async (req, res, next) => {
//     console.log(req.params.id,'********************');
//     if (await user.findOne({"_id": req.params.id}) != null) {
//         const us = await user.findOne({"_id": req.params.id});
//         const dreq = await driverRequest.findOne({"user": us});
//         const c = await allCarsModelsCapacity.findOne({"marque": req.body.marque, "model": req.body.model});
//         if (dreq == null) {
//             if (!us.car) {
//                 car.create({
//                     capacite: c.capacite,
//                     owner: us,
//                     year: req.body.year,
//                     color: req.body.color,
//                     marque: req.body.marque,
//                     model: req.body.model,
//                 }).then(async (data) => {
//                         const add = await user.update({"_id": req.params.id}, {"$set": {"car": data}});
//                         driverRequest.create({user: us})
//                             .then((dq) => {
//                                 console.log(dq, 'driver request');
//                                 res.status(202).json(data);
//                             }, err => {
//                                 res.status(202).json(err);
//                             });
//
//                     },
//                     (error) => res.status(200).send(error));
//             } else {
//                 res.status(200).send({"status": 400, "message": "This user already have a car"});
//             }
//         }else {
//             res.status(202).json({"status": "error", "message": "request exists with this user"});
//         }
//
//     } else {
//         res.status(200).send({"status": 400, "message": "This user doesn't exist"});
//     }
// };

module.exports = {
    getAll,
    getAllCarsModelCapacity,
};

