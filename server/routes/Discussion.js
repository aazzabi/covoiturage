var express = require('express');
var router = express.Router();
var msg = require('../models/Message');
var discussion = require('../models/Discussion');
var discussionController = require('../controllers/DiscussionController');

router.post('/add/:id', discussionController.addDisc);
router.post('/addMsg', discussionController.addMsg);
router.post('/add/:idCurrentUser/:idUser', discussionController.addEmptyDisc);
router.post('/addMsgIntoDisc', discussionController.addMsgIntoDisc);
router.get('/channelId/:idCurrentUser/:idUser', discussionController.getChannelId);
router.get('/user/:id', discussionController.listDiscussionsUser);
router.get('/user/disc/:id', discussionController.listOwnChatroomUser);
router.get('/disc/:id', discussionController.listMsgsDisc);
router.put('/seen/:id/', discussionController.seenMsg);
router.delete('/disc/:id', discussionController.deleteDiscussion);
//chatRoom
router.get('/user/list/:id', discussionController.listChatRoomUsers);

router.put('/user/add/:id/:userId', discussionController.addUserInChatRoom);
router.delete('/user/:discId/:userId', discussionController.RemoveUserInChatRoom);
router.post('/addMsgChat/:idDisc/:idSender', discussionController.sendMsgChat);
module.exports=router;
