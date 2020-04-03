var express = require('express');
var router = express.Router();
var feedBackController = require('../controllers/FeedBackController');

router.get('/comments/:profileOwnerId', feedBackController.allComments);
router.post('/comments/:idOwner/:profileOwnerId', feedBackController.addComment);
router.put('/comments/:userId/:commId/:type', feedBackController.addUpDownVoteComment);
router.delete('/comments/:id', feedBackController.deleteComment);
router.get('/comments/getUpDownVotes/:commId/:type', feedBackController.countUpDownVoteComment);
router.get('/comments/getUpDownVotes/verif/:commId/:userId/:type', feedBackController.verifIfUserUpDownVoteComment);
module.exports=router;


