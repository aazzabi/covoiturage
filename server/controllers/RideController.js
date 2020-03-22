var ride = require('../models/Ride');
var dis = require('google-distance');
dis.apiKey = 'AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg';


var getAll = (req, res, next) => {
    ride.find({}).sort('rideStartTime')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

var getById = (req, res, next) => {
    ride.findOne({"_id": req.params.id})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

var add = (req, res, next) => {

    dis.get(
        {
            origin: req.body.origin,
            destination: req.body.destination,
            metric : 'meter'
        },
        function(err, data) {
            if (err) return console.log(err);
            var x = data['distanceValue']/1000 ;
            console.log(data);
            ride.create({
                status: req.body.status,
                origin: req.body.origin,
                destination: req.body.destination,
                nbrPlaces: req.body.nbrPlaces,
                prixPerPlace: x * 0.06 ,
                decription: req.body.decription,
                total: req.body.total,
                packageAllowed: req.body.packageAllowed,
                distance: x
            })
                .then((data) => {
                    res.set('Content-Type', 'application/json');
                    res.status(202).json(data);

                })
                .catch(error =>
                {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });

        });



};

var deleteRide = (req,res,next) => {
    ride.deleteOne({ "_id": req.params.id })
        .then(() =>
        {
            res.set('Content-Type', 'text/html');
            res.status(202).send("The ride Was Deleted Successfully !");
        })
        .catch(error =>
        {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};





module.exports = {
    getAll,
    getById,
    add,
    deleteRide
};
