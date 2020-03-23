var express = require('express');
var router = express.Router();
var packageController = require('../controllers/PackageController');

router.post('/add', packageController.add);
router.put('/edit/:id', packageController.editPackage);
router.get('/All', packageController.getAllPackage);
router.get('/:id', packageController.getByIdPackage);
router.delete('/delete/:id', packageController.deletePackage);
router.post('/addPackageToRide/:idUser/:idRide', packageController.addPackageToRide);
module.exports = router;
