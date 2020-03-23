var user = require('../models/User');
var groupModel = require('../models/Group');
var privilege = require('../models/Privilege');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');
var config = require('../config/config');
const {imageHash} = require('image-hash');
const crypto = require('crypto')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload.directory + '\\drivers\\' );
    },
    filename: function (req, file, cb) {
        console.log(file); //log the file object info in console
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('image');

var becomeDriver = async (req, res) => {
    upload(req, res, function (error) {
        if (error) {
            res.status(500).json(error);
        } else {
            var ext = '';
            switch (req.file.mimetype)
            {
                case 'image/png':
                {
                    ext = '.png';
                    break;
                }
                case 'image/jpeg':
                {
                    ext = '.jpeg';
                    break;
                }
                case 'image/bmp':
                {
                    ext = '.bmp';
                    break;
                }
            }
            var hashName = crypto.createHash('md5').update(req.file.originalname).digest("hex");
            fs.rename(config.upload.directory + '\\drivers\\' + req.file.originalname ,
                config.upload.directory + '\\drivers\\' + hashName  + ext ,
                (error) => {
                if (error) {

                    // Show the error
                    console.log(error);
                }
                else {
                    console.log("\nFile Renamed\n");
                }
            });
            res.status(202).json("data");
        }
    });
};

var getAllUsers = (req, res, next) => {
    user.find({}).sort('firstName')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

var getUserById = (req, res, next) => {
    user.findOne({"_id": req.params.id})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

var profile = function (req, res) {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, config.authentification.secret, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        res.status(200).send(decoded);
    });
};


// function uploadFileForObject(obj, req, res) {
//     upload(req, res, function (error) {
//         if (error) {
//             res.status(500).json(error);
//         } else {
//             var ext = '';
//             switch (req.file.mimetype) {
//                 case 'image/png': {
//                     ext = '.png';
//                     break;
//                 }
//                 case 'image/jpeg': {
//                     ext = '.jpeg';
//                     break;
//                 }
//                 case 'image/bmp': {
//                     ext = '.bmp';
//                     break;
//                 }
//             }
//             var fileName = config.upload.directory +'\\driver\\' + req.body.name + ext;
//             fs.rename(config.upload.directory +'\\driver\\' +  req.file.originalname,
//                 fileName, function (err) {
//                     if (err) {
//                         res.status(500).json(err);
//                     } else {
//                         obj.findOne({"_id": req.params.id}, function (e, user) {
//                             user.avatar = req.body.name + ext;
//                             user.save(function (error) {
//                                 if (error) {
//                                     res.status(500).send(error);
//                                 } else {
//                                     res.status(202).send("Image Uploaded !");
//                                 }
//                             })
//                         })
//                     }
//                 });
//             //res.status(200).send(req.file);
//         }
//     });
// }

module.exports = {
    getAllUsers,
    getUserById,
    profile,
    becomeDriver
};
