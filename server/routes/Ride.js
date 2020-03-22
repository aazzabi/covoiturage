var express = require('express');
var router = express.Router();
var rideController = require('../controllers/RideController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');

router.post('/add', rideController.add);
//router.get('/edit/:id', rideController.edit);
router.get('/getById/:id', rideController.getById);
router.get('/delete/:id', rideController.deleteRide);
router.get('/getAll', rideController.getAll);

//router.get('/allTravelersByRide/:idRide', rideController.getAllTravelers);
//router.post('/addTravelerById/:idUser/:idRide', rideController.addTravelerRide);
//router.get('/removeTravelerById/:idUser/:idRide', rideController.removeTravelerRide);

//router.get('/getTraveler/:idUser', rideController.getTraveler);
//router.get('/confirmTraveler/:idUser/:idRide', rideController.confrimTraveler);


module.exports = router;
