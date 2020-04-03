var express = require('express');
var comment = require('../models/Comment');
var mongoose = require('mongoose')
var user = require('../models/User');
ObjectId = require('mongodb').ObjectID;

exports.allComments = (req,res) => {
    comment.find({userProfile: req.params.profileOwnerId})
        .populate('owner')
        .sort({'createdAt':-1})
        .then(comments => res.send(comments))
        .catch(err => res.status(500).send('Error' + err));
};

exports.addComment = (req,res) => {

    var now = new Date();
    var comm = new comment({

        owner : ObjectId(req.params.idOwner),
        userProfile :  ObjectId(req.params.profileOwnerId),
        content : req.body.content,
        created_at: now,

    });
    comm.save().then (()=> {
        res.status(202).send("comment has been added ");
    })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

exports.addUpDownVoteComment = async (req,res) => {
    var userr = await user.findOne({_id: req.params.userId});
    var comm = await comment.findOne({_id: req.params.commId});
    console.log(req.user);
    if (req.params.type == "upVote") {
            comm.upVotes.push(userr);
            comm.save().then(() => {
                res.status(202).send("upVotes has been updated ");
             })
            .catch(error => {
                res.set('Content-Type', 'text/html');
                res.status(500).send(error);
            });
    }
    else
    {

        comm.downVotes.push(userr);
        comm.save().then(() => {
            res.status(202).send("upVotes has been updated ");
        })
            .catch(error => {
                res.set('Content-Type', 'text/html');
                res.status(500).send(error);
            });
    }
};
exports.deleteComment = async (req, res)  => {
    comment.findByIdAndDelete(req.params.id )
        .then(() =>
        {
            res.set('Content-Type', 'text/html');
            res.status(202).send("comment has been deleted ");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });

};

exports.countUpDownVoteComment = async (req,res) => {
    var i = 0 ;
    console.log(i);
    await comment.findOne({_id: req.params.commId})
        .then((comm) => {
            if (req.params.type == "upVote") {
                for (user of comm.upVotes) {
                    i++;
                    console.log(i);
                }
            }
            else {
                if (req.params.type == "downVote") {
                    for (user of comm.downVotes) {
                        i++;
                    }
                }
            }
            res.set('Content-Type', 'text/html');
            res.status(202).send(i.toString());
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

exports.verifIfUserUpDownVoteComment = async (req,res) => {
    var i = false;
    console.log(i);
    await comment.findOne({_id: req.params.commId})
        .then((comm) => {
            if (req.params.type == "upVote") {
                for (user of comm.upVotes) {
                    if (user == req.params.userId)
                    {
                        i = true ;
                    }
                    console.log(i);
                }
            }
            else {
                    for (user of comm.downVotes) {
                        if (user == req.params.userId)
                        {
                            i = true ;
                        }
                    }
            }
            res.set('Content-Type', 'text/html');
            res.status(202).send(i);
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

