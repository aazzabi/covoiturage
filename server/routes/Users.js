var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');
var isAuthenticated = require('../policies/isAuthenticated');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var config = require('../config/config');
var authorize = require('../policies/Permition');
const crypto = require('crypto');
const document = require('../models/Document');
const user = require('../models/User');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directoryDrivers);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadDocs = multer({storage: storage}).single('doc');

router.get('/profile', userController.profile);
router.get('/getAll', userController.getAll);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllDrivers', userController.getAllDrivers);




router.put('/searchUser',  userController.searchUser);
router.get('/getAllTechnicals', userController.getAllTechnicals);
router.get('/getAllFinancials', userController.getAllFinancials);
router.get('/getAllRelationals', userController.getAllRelationals);
router.post('/updateUser/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/getUserById/:id', userController.getUserById);
router.delete('/refuseDriverRequest/:idRequest', userController.refuseDriverRequest);
router.post('/acceptDriverRequest/:idRequest', userController.acceptDriverRequest);

router.get('/getAllDriverRequest', userController.getAllDriverRequest);
/*
POST
http://localhost:3000/users/becomeDriver/:idUser
{
    "marque": "DACIA",
    "model": "Dacia Dokker",
    "year": 1990,
    "color": "red"
}
*/
router.post('/becomeDriver/:id', userController.becomeDriverRequest);

// l'upload des document ysir l appel mta3ou ba3d l becomeDriverRequest
// l'ordre mta3 les append c'est :
// 1- CIN
// 2- PERMIS
// 3- CARTE_GRISE
// 4- ASSURANCE
// 5- VIGNETTE
// lkolhom bech yet7aatou fel entité du user sous forme d'objet
router.post('/uploadDocumentForDriver/:idUser', async (req, res, next) => {
    uploadDocs(req, res, async function (error) {
        console.log(req.files, 'req. files');
        console.log(req.params.idUser, 'idUser');
        req.files.doc.forEach((fi, index) => {
            var hashName = crypto.createHash('md5').update(fi.name + new Date()).digest("hex");
            let ext;
            let typeDoc;
            ext = detExtension(fi.mimetype);
            typeDoc = detType(index);
            fi.mv(config.upload.directoryDrivers + hashName + ext);
            user.findOneAndUpdate({'_id': req.params.idUser}, {
                '$addToSet': {
                    'documents': {
                        name: hashName + ext,
                        type: typeDoc,
                        createdAt: new Date()
                    }
                }
            }).then((data) => {
                console.log(data);
            }, error1 => {
                console.log(error1);
            });
        });
    });
    res.status(200).send({"status": 200, "message": "Upload finished"});

});

function detType(name) {
    switch (name) {
        case 0: {
            return 'CIN';
        }
        case 1: {
            return 'PERMIS';
        }
        case 2: {
            return 'CARTE_GRISE';
        }
        case 3: {
            return 'ASSURANCE';
        }
        case 4: {
            return 'VIGNETTE';
        }
    }
}

function detExtension(name) {
    switch (name) {
        case 'image/png': {
            return '.png';
        }
        case 'image/jpeg': {
            return '.jpeg';
        }
        case 'image/bmp': {
            return '.bmp';
        }
        case 'application/pdf': {
            return '.pdf';
        }
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
            return '.pptx';
        }
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
            return '.docx';
        }
        case 'application/vnd.ms-excel': {
            return '.csv';
        }
    }
}

module.exports = router;
