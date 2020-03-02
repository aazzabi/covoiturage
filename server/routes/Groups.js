var express = require('express');
var router = express.Router();
var groupController = require('../controllers/GroupsController');

router.get('/getAllGroups', groupController.getAllGroups);
router.post('/addGroup', groupController.addGroup);
router.get('/getGroupById/:id', groupController.getGroupById);


module.exports = router;
