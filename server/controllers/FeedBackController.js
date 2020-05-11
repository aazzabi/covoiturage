var express = require('express');
var comment = require('../models/Commentt');
var rating = require('../models/Rating');
var mongoose = require('mongoose');
var useeer = require('../models/User');
ObjectId = require('mongodb').ObjectID;
//--------------------------------------------------------------------Comments-------------------------------------------------------------------
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
    console.log(req.params.commId);
    console.log(req.params.userId);
    var comm = await comment.findOne({_id: req.params.commId}).catch(err => console.log(err));
    var userr = await useeer.findOne({_id: req.params.userId}).catch(err => console.log(err));

    console.log(req.user);
    if (req.params.type == "upVote") {
        console.log(comm);
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
            res.status(202).send("downVotes has been updated ");
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
                for (userr of comm.upVotes) {
                    i++;
                    console.log(i);
                }
            }
            else {
                if (req.params.type == "downVote") {
                    for (userr of comm.downVotes) {
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
exports.RemoveUserUpDownVoteComment = async  (req, res)  => {


    await comment.findOne({_id: req.params.commId})
        .then((comm) => {
            var i = 0;
            if (req.params.type == "upVote") {
                for (userr of comm.upVotes) {
                    if (userr == req.params.userId)
                    {
                        comm.upVotes.splice(i, 1);
                        console.log("upVote "+i);
                        i++;
                    }
                }
            }
            if (req.params.type == "downVote") {
                for (userr of comm.downVotes) {
                    if (userr == req.params.userId)
                    {
                        comm.downVotes.splice(i, 1);
                        console.log(i);
                        i++;
                    }
                }
            }
            console.log(comm);
            comm.save().then(()=> {
                res.status(202).send("UpDownVote has been deleted ");
            })
                .catch(error =>
                {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

//--------------------------------------------------------------------Rating-------------------------------------------------------------------
exports.addRating = (req,res) => {
    rating.findOne({"owner": req.params.idOwner,"userProfile":req.params.profileOwnerId}).then((ratee) => {
        if (!ratee)
        {
            var now = new Date();
            var rate = new rating({
                owner : ObjectId(req.params.idOwner),
                userProfile :  ObjectId(req.params.profileOwnerId),
                punctuality : req.body.punctuality,
                created_at: now,
                companionship : req.body.companionship,
                honesty : req.body.honesty,
                overall_rating : req.body.overall_rating,
                Safe_Driving : req.body.Safe_Driving,
                confort : req.body.confort,
            });
            rate.save().then (()=> {
                res.status(202).send("rating has been added ");
            })
                .catch(error =>
                {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });
        }
        else
        {
            if (typeof req.body.punctuality !== 'undefined') {
                ratee.punctuality = req.body.punctuality;
            }
            if (typeof req.body.companionship !== 'undefined') {
                ratee.companionship = req.body.companionship;

            }
            if (typeof req.body.honesty !== 'undefined') {
                ratee.honesty = req.body.honesty;
            }
            if (typeof req.body.overall_rating !== 'undefined') {
                ratee.overall_rating = req.body.overall_rating;
            }
            if (typeof req.body.Safe_Driving !== 'undefined') {
                ratee.Safe_Driving = req.body.Safe_Driving;
            }
            if (typeof req.body.confort !== 'undefined') {
                ratee.confort = req.body.confort;
            }
            ratee.save().then (()=> {
                res.status(202).send("rating has been added ");
            })
                .catch(error =>
                {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });
        }
    })

};

exports.verifIfUserRateOtherUser = async (req,res) => {
    var i = false;
    console.log(i);
    await rating.findOne({userProfile: req.params.profileOwnerId,owner : req.params.idOwner})
        .then((rate) => {

            if (rate != null)
            {
                i = true ;
            }
            console.log(i);
            res.set('Content-Type', 'text/html');
            res.status(202).send(i);
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

exports.allRatings = (req,res) => {
    rating.find({userProfile: req.params.profileOwnerId})
        .then(ratings => res.send(ratings))
        .catch(err => res.status(500).send('Error' + err));
};
exports.countRating = async (req,res) => {
    var count = 0;
    var i=0;

        rating.find({userProfile: req.params.profileOwnerId})
            .then(ratings => {
                if (req.params.type == "punctuality")
                {
                for (ratee of ratings)
                {
                    if  (ratee.punctuality !== -1)
                    {
                        count= count + ratee.punctuality;
                        i++;
                    }
                }
                console.log(count);
                }
                else if (req.params.type == "companionship")
                {
                    for (ratee of ratings)
                    {
                        if  (ratee.companionship !== -1)
                        {
                            count= count + ratee.companionship;
                            i++;
                        }
                    }
                }
                else if (req.params.type == "honesty")
                {
                    for (ratee of ratings)
                    {
                        if  (ratee.honesty !== -1)
                        {
                            count= count + ratee.honesty;
                            i++;
                        }
                    }
                }
                else if (req.params.type == "overall_rating")
                {
                    for (ratee of  ratings)
                    {
                        if  (ratee.overall_rating !== -1)
                        {
                            count= count + ratee.overall_rating;
                            i++;
                        }
                    }
                }
                else if (req.params.type == "confort")
                {
                    for (ratee of  ratings)
                    {
                        if  (ratee.confort !== -1)
                        {
                            count= count + ratee.confort;
                            i++;
                        }
                    }
                }
                if (req.params.type == "Safe_Driving")
                {
                    for (ratee of ratings)
                    {
                        if  (ratee.Safe_Driving !== -1)
                        {
                            count= count + ratee.Safe_Driving;
                            i++;
                        }
                    }
                }
                var overallRate;
                if (i>=1)
                {
                    overallRate =count/i;
                }
                else if (count ==0)
                {
                    overallRate =-1;
                }

                console.log(overallRate);
                res.set('Content-Type', 'text/html');
                res.status(202).send(overallRate.toString());
            });

};
exports.countPeopleRating = async (req,res) => {
    var i=0;

    rating.find({userProfile: req.params.profileOwnerId})
        .then(ratings => {
            if (req.params.type == "punctuality")
            {
                for (ratee of ratings)
                {
                    if  (ratee.punctuality !== -1)
                    {
                        i++;
                    }
                }

            }
            else if (req.params.type == "companionship")
            {
                for (ratee of ratings)
                {
                    if  (ratee.companionship !== -1)
                    {

                        i++;
                    }
                }
            }
            else if (req.params.type == "honesty")
            {
                for (ratee of ratings)
                {
                    if  (ratee.honesty !== -1)
                    {

                        i++;
                    }
                }
            }
            else if (req.params.type == "overall_rating")
            {
                for (ratee of  ratings)
                {
                    if  (ratee.overall_rating !== -1)
                    {

                        i++;
                    }
                }
            }
            else if (req.params.type == "confort")
            {
                for (ratee of  ratings)
                {
                    if  (ratee.confort !== -1)
                    {
                        i++;
                    }
                }
            }
            if (req.params.type == "Safe_Driving")
            {
                for (ratee of ratings)
                {
                    if  (ratee.Safe_Driving !== -1)
                    {

                        i++;
                    }
                }
            }



            res.set('Content-Type', 'text/html');
            res.status(202).send(i.toString());
        });

};
