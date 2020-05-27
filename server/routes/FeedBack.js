var express = require('express');
var router = express.Router();
var feedBackController = require('../controllers/FeedBackController');
//-------------------------------------------------------------------Comments--------------------------------------------------------------------
router.get('/comments/:profileOwnerId', feedBackController.allComments);
router.get('/', feedBackController.allCommentsInDaWebSite);
router.post('/comments/:idOwner/:profileOwnerId', feedBackController.addComment);
router.put('/comments/:userId/:commId/:type', feedBackController.addUpDownVoteComment);
router.delete('/comments/:id', feedBackController.deleteComment);
router.get('/comments/UpDownVotes/:commId/:type', feedBackController.countUpDownVoteComment);
router.get('/comments/UpDownVotes/verif/:commId/:userId/:type', feedBackController.verifIfUserUpDownVoteComment);
router.put('/comments/UpDownVotes/:commId/:userId/:type', feedBackController.RemoveUserUpDownVoteComment);
//--------------------------------------------------------------------Rating---------------------------------------------------------------------
router.post('/ratings/:idOwner/:profileOwnerId', feedBackController.addRating);
router.get('/ratings/verif/:idOwner/:profileOwnerId', feedBackController.verifIfUserRateOtherUser);
router.get('/ratings/:profileOwnerId', feedBackController.allRatings);
router.get('/ratings/count/:type/:profileOwnerId', feedBackController.countRating);
router.get('/ratings/countpeople/:type/:profileOwnerId', feedBackController.countPeopleRating);
module.exports=router;


