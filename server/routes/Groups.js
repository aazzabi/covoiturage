var express = require('express');
var router = express.Router();
var groupController = require('../controllers/GroupsController');

router.get('/', groupController.getAllGroups);
router.post('/', groupController.addGroup);
router.get('/:id', groupController.getGroupById);
router.get('/delete/:id', groupController.deleteGroup);


module.exports = router;
