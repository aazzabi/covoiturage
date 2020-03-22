var express = require('express');
var router = express.Router();
var privilegesController = require('../controllers/PrivilegesController');
var isAuthenticated = require('../policies/isAuthenticated');
var isAdmin = require('../policies/isAdmin');
var authorize = require('../policies/Permition');
var passport = require('passport');

// EXAMPLE authorize with array of roles ['ADMIN','USER', 'DRIVER']
// router.get('/', authorize(['ADMIN']), privilegesController.getAll);

router.get('/', privilegesController.getAll);
router.post('/add', isAuthenticated, privilegesController.addPrivilege);
router.get('/:id',isAuthenticated, privilegesController.getById);
router.post('/addToUser/:idPriv/:idUser',isAuthenticated, privilegesController.addToUser);
router.post('/addToGroup/:idPriv/:idGroup',isAuthenticated, privilegesController.addToGroup);
router.get('/delete/:id',isAuthenticated, privilegesController.deletePrivilege);
router.get('/getByUser/:id', privilegesController.getByUser);
router.get('/getByGroup/:id', privilegesController.getByGroup);

module.exports = router;
