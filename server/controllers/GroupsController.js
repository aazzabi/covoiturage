var group = require('../models/Group');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');


var getAllGroups = (req, res, next) => {
    group.find({}).sort('groupName')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var addGroup = (req, res, next) => {
    var groupName = req.body.groupName;
    group.create({groupName: groupName})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);

        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
    });
};
var getGroupById = (req,res,next) => {
    group.findOne({ "_id": req.params.id })
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
    });
};
var deleteGroup = (req,res,next) => {
    group.deleteOne({ "_id": req.params.id })
        .then(() =>
        {
            res.set('Content-Type', 'text/html');
            res.status(202).send("The groupe Was Deleted Successfully !");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

module.exports = {
    getAllGroups,
    getGroupById,
    addGroup,
    deleteGroup
};
