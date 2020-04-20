var express = require('express');
var router = express.Router();
var rideController = require('../controllers/RideController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');


router.post('/add/:idDriver', rideController.add);
router.put('/edit/:id', rideController.editRide);
router.get('/getById/:id', rideController.getById);
router.delete('/delete/:id', rideController.deleteRide);
router.get('/getAll', rideController.getAll);
router.get('/price/:ori/:des', rideController.getPrice);
router.get('/allTravelersByRide/:idRide', rideController.getAllTravelers);
router.post('/addTravelerById/:idUser/:idRide', rideController.addTravelerRide);
router.delete('/removeTravelerById/:idUser/:idRide', rideController.removeTravelerRide);
router.get('/getRidesByDiver/:idUser', rideController.getRidesByDriver);
router.get('/getTraveler/:idTraveler', rideController.getTraveler);
router.put('/confirmTraveler/:idRide/:validationCode', rideController.confrimTraveler);


module.exports = router;
