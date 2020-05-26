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
    var vide = "null";
        var m = new discussion({
            title: vide,
            users: ObjectId(receiver),
            lastMsg: text,
            created_at: now,
            owner: ObjectId(sender),

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
        title: req.body.title,
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
//add empty 2personDisc
exports.addEmptyDisc =  (req, res )  => {
    var now = new Date();
    var vide = "null";
    var m = new discussion({
        title : vide,
        type: req.body.type,
        users: ObjectId(req.params.idUser),
        created_at: now,
        owner: ObjectId(req.params.idCurrentUser)
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


     discussion.findOneAndUpdate({$or:[{owner:ObjectId(req.body.sender) , users : ObjectId(req.body.receiver) , type: "2PersonChat" }, {owner:ObjectId(req.body.receiver) , users : ObjectId(req.body.sender) , type: "2PersonChat" }]} , {$set:{lastMsg:req.body.text}}).then((data) => {
        if(data == null) {
            console.log(req.body.sender);
            console.log(req.body.text);
            console.log(req.body.receiver);
            console.log("discuss added");
            this.addDiscussion(req.body.sender, req.body.text , req.body.receiver);
            res.set('Content-Type', 'text/html');
            res.status(202).send("discuss added successfully ");

        }
        else
        {
            console.log(data);
            console.log("discussion updated");
            var message = new msg({
                sender: ObjectId(req.body.sender),
                created_at: date,
                discussion: ObjectId(data._id),
                text: req.body.text,
            });

            message.save(function (err, todo) {
                console.log('Your msg has been saved');
                res.set('Content-Type', 'text/html');
                res.status(202).send("msg added successfully ");
            })
        }

    })
};
//add  msg into a existing disc
exports.addMsgIntoDisc =  async (req,res ) => {

    var date = Date.now();
    var disc = await discussion.findOne({_id: req.body.discussion});
    console.log(disc);
    var message = new msg({
        sender: req.body.sender,
        created_at: date,
        discussion: disc.id,
        text: req.body.text,
    });
    console.log(message);
    message.save(function (err, todo) {
        console.log('Your msg has been saved');
        res.status(202).send("msg added successfully ");
    })

}

exports.getChannelId =   (req,res ) => {

    var date = Date.now();


    discussion.findOne({$or:[{owner:ObjectId(req.params.idCurrentUser) , users : ObjectId(req.params.idUser) , type: "2PersonChat" }, {owner:ObjectId(req.params.idUser) , users : ObjectId(req.params.idCurrentUser)  , type: "2PersonChat" }]}).then((data) => {
        if(data == null) {
            console.log("discuss not found")
            res.set('Content-Type', 'text/html');
            res.status(404).send(" discuss not found  ");

        }
        else
        {
            console.log(data._id.toString());
                res.set('Content-Type', 'text/html');
                res.status(202).send(data._id.toString());

        }

    }).catch(error => {
        res.set('Content-Type', 'text/html');
        res.status(500).send(error);
    });



};
//list disc  user
exports.listDiscussionsUser = async (req, res) => {
    discussion.find({$or:[{owner:ObjectId(req.params.id)} , {users : ObjectId(req.params.id)  }]}, function(err, discussions) {
        console.log(discussions);
        res.send(discussions);
    }).populate('users').populate('owner');
};
//list own user chatroom
exports.listOwnChatroomUser = async (req, res) => {
    discussion.find({owner:ObjectId(req.params.id) , type : "ChatRoom"} , function(err, discussions) {
        console.log(discussions);
        res.send(discussions);
    }).populate('users').populate('owner');
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
    console.log("aaaaaaaaa");
    var disc = await discussion.find({ _id : req.params.id }).populate('users').populate('owner')
        .then((discc) =>
        {
            console.log("okkk");
            res.send(discc);
            //res.status(202).send("users has been sent ");
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
