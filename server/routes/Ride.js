var express = require('express');
var router = express.Router();
var rideController = require('../controllers/RideController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');

router.post('/add', rideController.add);
router.put('/edit/:id', rideController.editRide);
router.get('/getById/:id', rideController.getById);
router.delete('/delete/:id', rideController.deleteRide);
router.get('/getAll', rideController.getAll);

//router.get('/allTravelersByRide/:idRide', rideController.getAllTravelers);
router.post('/addTravelerById/:idUser/:idRide', rideController.addTravelerRide);
//router.get('/removeTravelerById/:idUser/:idRide', rideController.removeTravelerRide);

//router.get('/getTraveler/:idUser', rideController.getTraveler);
//router.get('/confirmTraveler/:idUser/:idRide', rideController.confrimTraveler);


module.exports = router;
