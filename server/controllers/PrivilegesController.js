var Group = require('../models/Group');
var Privelege = require('../models/Privilege');
var User = require('../models/User');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var addPrivilege = (req, res, next ) => {
    var name = req.body.name;
    var description = req.body.description;
    Privelege.create({name: name, description: description})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error =>
        {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var deletePrivilege = (req,res,next) => {
    Privelege.deleteOne({ "_id": req.params.id })
        .then(() =>
        {
            res.set('Content-Type', 'text/html');
            res.status(202).send("The privilege Was Deleted Successfully !");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

var getAll = (req, res, next) => {
    Privelege.find({})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var getById = (req, res, next) => {
    Privelege.findOne({"_id": req.params.id})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

var getByUser = (req, res, next) => {
    User.find({"_id": req.params.id}, {"privileges":1, "_id": 0})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var getByGroup = (req, res, next) => {
    Group.find({"_id": req.params.id}, {"privileges":1, "_id": 0})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

var addToUser = async (req, res, next) => {
    const priv = await Privelege.find({"_id":req.params.idPriv });
    const user = await User.find({"_id":req.params.idUser });
    User.updateOne({"_id": req.params.idUser}, {"$addToSet": {"privileges": priv}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(user);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var addToGroup = async (req, res, next) => {
    var priv = await Privelege.find({"_id":req.params.idPriv });
    const group = await Group.find({"_id":req.params.idGroup });
    Group.updateOne({"_id": req.params.idGroup}, {"$addToSet": {"privileges": priv}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(group);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

module.exports = {
    addPrivilege,
    deletePrivilege,
    getAll,
    getById,
    getByUser,
    getByGroup,
    addToUser,
    addToGroup
};
