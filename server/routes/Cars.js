var express = require('express');
var router = express.Router();
var carController = require('../controllers/CarsController');

router.get('/', carController.getAll);
router.get('/getAllCarsModelCapacity', carController.getAllCarsModelCapacity);
router.get('/getById/:id', carController.getCarById);

router.get('/getAllMarques', carController.getAllMarques);
router.get('/getAllModelByMarque/:marque', carController.getAllModelByMarque);
// router.post('/addCarToUser/:id', carController.addCarToUser);


module.exports = router;
