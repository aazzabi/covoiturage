var group = require('../models/Group');
var user = require('../models/User');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');


var getAllGroups = (req, res, next) => {
    group.find({}).sort('groupName')
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
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
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
    });
};
var deleteGroup = (req,res,next) => {
    group.deleteOne({ "_id": req.params.id })
        .then(() =>
        {
            res.set('Content-Type', 'application/json');
            res.status(202).send({"status": "success", "message": "The groupe Was Deleted Successfully !" });
        })
        .catch(error =>
        {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var addUserToGroup = async (req, res, next) => {
    const u = await user.findOne({"_id": req.params.idUser});
    const g = await group.findOne({"_id": req.params.idGroup});
    group.update({"_id": req.params.idGroup}, {"$addToSet": {"members": u}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(g);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var removeUserFromGroup = async (req, res, next) => {
    const u = await user.findOne({"_id": req.params.idUser});
    const g = await group.findOne({"_id": req.params.idGroup});
    group.update({"_id": req.params.idGroup}, {"$pull": {"members": u._id}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(g);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};
var updateGroup = (req, res, next) => {
    console.log(req.body);
    const updateData = req.body;
    if (!updateData){
        res.status(422).send({"message":"please provide what you want to update"})
    }
    group.findOne({"_id":req.params.id}).then(function(grp) {
        console.log(req.params.id, 'id');
        if (!grp) { return res.sendStatus(401); }
        //NOTE  only update fields that were actually passed...
        if (typeof updateData.groupName !== 'undefined') {
            grp.groupName = updateData.groupName;
        }
        return group.save()
            .then(function() {
                res.set('Content-Type', 'application/json');
                return res.json({ group: grp});
            });
    }).catch(()=>{
            res.set('Content-Type', 'application/json');
            res.status(422).send({"message":"couldn't update group"})
        }
    );
};

module.exports = {
    getAllGroups,
    getGroupById,
    addGroup,
    deleteGroup,
    addUserToGroup,
    removeUserFromGroup,
    updateGroup
};
