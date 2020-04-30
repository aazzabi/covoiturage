const express = require("express");
const router = express.Router();
const Userr = require('../models/User');
const RequestParcel= require('../models/RequestParcels');
router.put('/:id', async (req, res) => {
    const user = await Userr.findOne({"_id":req.params.id});
    await  RequestParcel.find({"userId._id": user._id,"confirmationSend":true})
        .then(Reqparcel => {
            for (var i = 0, l = Reqparcel.length; i < l; i++) {

                RequestParcel.updateMany({"_id": Reqparcel[i]._id}, {
                    "$set": {
                        "latitude": req.body.Latitude,
                        "longitude": req.body.Longitude
                    }
                }, {multi: true})
                    .then((d) => {
                        res.set('Content-Type', 'application/json');
                        res.status(202).json(d);
                    }).catch(error => {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });
            }
        })
})
router.get('/:id', (req, res) => {
    Location.findById(req.params.id)
        .then(location => {
            if (!location) {
                return res.status(404).json({
                    email: 'This location does not exist'
                });
            } else {
                res.json(location);
            }
        })
})

router.get('/', (req, res) => {
    Location.find()
        .then(payload => {
            if (!payload) {
                return res.status(404).json({
                    email: 'This location does not exist'
                });
            } else {
                let locations = {};
                payload.forEach(location => {
                    locations[location._id] = location;
                });
                res.json(locations);
            }
        })
})

router.patch('/:id', (req, res) => {
    Location.findById(req.params.id)
        .then(location => {
            if (!location) {
                return res.status(404).json({
                    email: 'This location does not exist'
                });
            } else {
                location.name = req.body.name;
                location.save();
            }
        });
})


module.exports = router;
