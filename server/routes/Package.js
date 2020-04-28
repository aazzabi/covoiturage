var express = require('express');
var router = express.Router();
var packageController = require('../controllers/PackageController');
const multer = require('multer');
const cors = require('cors');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var sanitize = require("sanitize-filename");
const upload = multer({dest: '/uploads'});

router.use(cors());
router.post('/add', packageController.add);
router.post('/addrequest', packageController.addRequest);
router.get('/myparcels/:id', packageController.getMyPackage);
router.get('/myrequests/:id', packageController.getMyRequest);
router.post('/myrequests/:id/accept', packageController.acceptRequest);
router.delete('/RequestRefuse/:id', packageController.refuseRequest);


router.put('/edit/:id', packageController.editPackage);
router.get('/All', packageController.getAllPackage);
router.get('/:id', packageController.getByIdPackage);
router.delete('/delete/:id', packageController.deletePackage);
router.post("/multiple-upload", upload.any(), process_upload);

function process_upload(req, res) {
    if(req.files) {
        console.log("req.files.length = ", req.files.length);
        var upload_dir='uploads';
        Promise.resolve(req.files)
            .each(function(file_incoming, idx) {
                console.log("  Writing POSTed data :", file_incoming.originalname);
                var sanitized_filename = sanitize(file_incoming.originalname);
                var file_to_save = path.join( upload_dir, sanitized_filename );

                return fs
                    .writeFileAsync(file_to_save, file_incoming.buffer)
            })
            .then( _ => {
                console.log("Added files : Success");
                return res.sendStatus(200);
            });
    }

}

module.exports = router;
