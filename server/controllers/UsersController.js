var user = require('../models/User');
var groupModel = require('../models/Group');
var privilege = require('../models/Privilege');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');


var login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(password);
    user.findOne({username: username.toLowerCase()})
        .then((user) => {
            console.log(user);
            if (user != null) {
                //if (bcrypt.compareSync(password, user.password))
                if (password === user.password) {
                    user.lastLogin = Date.now();
                    user.save(function (error) {
                        if (error) {
                            console.log('erooooorr 18');
                            res.status(500).send(error);
                        } else {
                            var token = jwt.sign({username: user.username}, 'shhhhh');
                            var data =
                                '{ "id":' + '"' + user._id + '"'
                                + ', "username":' + '"' + user.username + '"'
                                + ', "phone":' + '"' + user.phone + '"'
                                + ', "firstName":' + '"' + user.firstName + '"'
                                + ', "lastName":' + '"' + user.lastName + '"'
                                + ', "avatar":' + '"' + user.avatar + '"'
                                + ', "createdAt":' + '"' + user.createdAt + '"'
                                + ', "lastLogin":' + '"' + user.lastLogin + '"'
                                + ', "token":' + '"' + token + '"' + ' }';
                            res.status(202).send(JSON.parse(data));
                        }
                    });
                } else {
                    res.status(200).send("Incorrect Password.");
                }
            } else {
                console.log('erooooorr');
                res.status(200).send("No User Found With The Sent Credentials, Please Try Again.");
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

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

var addUser = async (req, res, next) => {
    var firstName = req.body.firstName;
    var username = req.body.username;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var avatar = req.body.avatar;
    var documents = req.body.documents;

    var grpAwait = await groupModel.findOne({"_id": req.body.group._id}).exec();
    var prvs = await privilege.find({ _id : { $in : req.body.privileges } } ).exec();

    console.log(prvs, 'grp');
    console.log(grpAwait, 'grp');
    // console.log(prvs, 'prvs');

    if (grpAwait.groupName === "Drivers") {
        console.log('driver');
        var docs = await privilege.find({ _id : { $in : documents } } ).exec();
    }

    // groupModel.findOne({"_id": req.body.group._id})
    //     .exec()
    //     .then((dataGroup) => {
    //         var g = dataGroup;
    //         var prv = req.body.privileges;
    //         prv.forEach((p) => {
    //             console.log(p,'pppp');
    //             privilege.findOne({"_id": p._id})
    //                 .exec()
    //                 .then((dataPriv) => {
    //                     var priv = dataPriv;
    //                     console.log(dataPriv);
    //                     // user.create({
    //                     //     username: username,
    //                     //     lastName: lastName,
    //                     //     firstName: firstName,
    //                     //     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    //                     //     phone: phone,
    //                     //     gender: gender,
    //                     //     avatar: avatar,
    //                     //     group: g,
    //                     //     privileges: priv,
    //                     // }).then((data) => {
    //                     //     res.set('Content-Type', 'application/json');
    //                     //     res.status(202).json(data);
    //                     // })
    //                     // .catch(error => {
    //                     //     res.set('Content-Type', 'text/html');
    //                     //     res.status(500).send(error);
    //                     // });
    //                 })
    //             })
    //         // });
    //
    //     });

};

/*
var addUser = (req, res, next) => {
    var firstName = req.body.firstName;
    var username = req.body.username;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var avatar = req.body.avatar;
    console.log(req.body.group._id);
    //check if existe
    if (req.body.group) {
        groupModel
            .findOne({"_id": req.body.group._id})
            .exec()
            .then((data) => {
                var g = data;
                console.log(g);
                console.log(g);
            });
    }

    if (req.body.group.groupName === "Driver") {
        car.create(
            {
                brand: req.body.car.brand,
                model: req.body.car.model,
                year: req.body.car.color,
                boxCapacity: req.body.car.boxCapacity,
                documents: req.body.car.documents,
                owner: req.body._id,
            }
        )
    }

    // .then((data) => {return data;})
    //check if driver than add car first
    var car = req.body.car;
    // foreach
    var documents = req.body.documents;

    console.log(req.body.group._id, 'g 100');
    console.log(bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)));
    // user.create(
    //     {
    //         username: username,
    //         lastName: lastName,
    //         firstName: firstName,
    //         password: bcrypt.hashSync(password , bcrypt.genSaltSync(10)),
    //         phone: phone,
    //         gender: gender,
    //         avatar: avatar,
    //         group: group,
    //         documents: documents,
    //         car: car,
    //     })
    //     .then((data) => {
    //         res.set('Content-Type', 'application/json');
    //         res.status(202).json(data);
    //
    //     })
    //     .catch(error =>
    //     {
    //         res.set('Content-Type', 'text/html');
    //         res.status(500).send(error);
    // });

};
*/
module.exports = {
    login,
    getAllUsers,
    getUserById,
    addUser
};