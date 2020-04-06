var express = require('express');
var router = express.Router();
var UserSender = require('../models/User');
var UserReceiver = require('../models/User');
var msg = require('../models/Message');
var discussion = require('../models/Discussion');
var user = require('../models/User');
var app = express();

ObjectId = require('mongodb').ObjectID;
//add new disc + msg
exports.addDiscussion =  (sender ,text ,receiver)  => {
    var now = new Date();
        var m = new discussion({
            users: ObjectId(receiver.id),
            lastMsg: text,
            created_at: now,
            owner: ObjectId(sender.id)
        });


    m.save().then (()=> {

        var message = new msg({
            sender: ObjectId(sender.id),
            created_at: now,
            discussion: ObjectId(m.id),
            text: text,
        })

        message.save(function (err, todo) {
            console.log('Your msg has been saved')
        })
    } )
    console.log(m)

}
exports.addDisc =  (req, res )  => {
    var now = new Date();
    var m = new discussion({
        titre : req.body.titre,
        type: req.body.type,
        created_at: now,
        owner: ObjectId(req.params.id)
    });
    m.save().then (()=> {
        res.status(202).send("discussion has been added ");
    })
    .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

//add  msg in an existing disc or   add new disc + msg
exports.addMsg =   (req,res ) => {

    var date = Date.now();


     discussion.findOneAndUpdate({$or:[{owner:ObjectId(req.body.sender.id) , users : ObjectId(req.body.receiver.id) , type: "2PersonChat" }, {owner:ObjectId(req.body.receiver.id) , users : ObjectId(req.body.sender.id) , type: "2PersonChat" }]} , {$set:{lastMsg:req.body.text}}).then((data) => {
        if(data == null) {
            console.log("discuss added")
            this.addDiscussion(req.body.sender, req.body.text , req.body.receiver);
            res.set('Content-Type', 'text/html');
            res.status(202).send("discuss added successfully ");

        }
        else
        {
            console.log(data);
            console.log("discussion updated");
            var message = new msg({
                sender: ObjectId(req.body.sender.id),
                created_at: date,
                discussion: ObjectId(data._id),
                text: req.body.text,
            })

            message.save(function (err, todo) {
                console.log('Your msg has been saved')
                res.set('Content-Type', 'text/html');
                res.status(202).send("msg added successfully ");
            })
        }

    })


};
//list disc  user
exports.listDiscussionsUser = async (req, res) => {
    discussion.find({$or:[{owner:ObjectId(req.params.id)} , {users : ObjectId(req.params.id)  }]}, function(err, discussions) {
        console.log(discussions);
        res.send(discussions);
    });
};
//seen msg "2PersonChat "
exports.seenMsg = async (req, res) => {

     req.body.forEach(function (msgg)
    {
        console.log(req.params.id +'/'+ msgg);
        if (msgg.seen === false && req.params.id !== msgg.sender)
        {
            console.log("dkhal" + msgg._id);
            const chat =  msg.findOneAndUpdate(
                { _id: msgg._id },
                { $set: { seen: true } }
            );
        }
    })
};


// list all msg  disc
exports.listMsgsDisc = async (req, res) => {
    var msggg;
    msg.find({discussion: req.params.id}, function(err, msgs) {
        msggg =msgs ;

        console.log(msgs);
        res.send(msgs);
    })


};
// delete  disc

exports.deleteDiscussion = async (req, res)  => {
    const msgs = await msg.find({ discussion : req.params.id });
    for (msgg of msgs) {
        await msg.findByIdAndDelete(msgg._id);
    }

    console.log("DeleteMsgsOnDiscussion: " );
    discussion.findByIdAndDelete(req.params.id )
        .then(() =>
        {
            res.set('Content-Type', 'text/html');
            res.status(202).send("discussion has been deleted ");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });

};
//-------------------------------------chatroom------------------------------------
// list users in chatroom
exports.listChatRoomUsers = async (req, res)  => {
    var disc = await discussion.find({ _id : req.params.id })
        .then(() =>
        {

            res.send(disc.users);
            res.status(202).send("users has been sent ");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });


};
//add user to chatroom
exports.addUserInChatRoom = async (req, res)  => {

    var disc = await discussion.findOne({_id: req.params.id});
    console.log(disc);
    var userr = await user.findOne({_id: req.params.userId});
    disc.users.push(userr);
    disc.save().then(() => {
        res.status(202).send("user has been added ");
    })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });

};
//Remove user from chatRoom
exports.RemoveUserInChatRoom = async  (req, res)  => {
    var disc = await discussion.findOne({ _id : req.params.discId });
            var i = 0 ;

            for ( userr of disc.users)
            {
                if (userr  == req.params.userId ) {
                    disc.users.splice(i, 1);
                    console.log(i);
                    i++;
                }
            }
            disc.save().then(()=> {
                res.status(202).send("user has been deleted ");
            })
                .catch(error =>
                {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });
};
//send msg (input c2PersonChat or ChatRoom )
exports.sendMsgChat =  (req, res)  => {
    var date = Date.now();
    var message = new msg({
        sender: ObjectId(req.params.idSender),
        created_at: date,
        discussion: ObjectId(req.params.idDisc),
        text: req.body.text,
    });

    message.save().then(()=> {
        res.status(202).send("msg has been saved ");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};
