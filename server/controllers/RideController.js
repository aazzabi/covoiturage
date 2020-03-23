var ride = require('../models/Ride');
var user = require('../models/User');
var traveler = require('../models/Traveler');
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
            metric: 'meter'
        },
        function (err, data) {
            if (err) return console.log(err);
            var x = data['distanceValue'] / 1000;
            var y = data['duration'];
            console.log(data);
            console.log(new Date(req.body.startTime));
            console.log(new Date('02/9/2016').getTime()+data['durationValue']);
            console.log();
            console.log((new Date(new Date('02/9/2016').getTime()+data['durationValue'])));
            console.log((new Date(1335205561117)));

            ride.create({
                status: req.body.status,
                startTime: req.body.startTime,
                origin: req.body.origin,
                destination: req.body.destination,
                nbrPlaces: req.body.nbrPlaces,
                prixPerPlace: x * 0.06,
                decription: req.body.decription,
                total: 0,
                packageAllowed: req.body.packageAllowed,
                distance: x,
                estimatedArriveTime :(new Date((new Date(req.body.startTime).getTime())+data['durationValue'])),
                duration : data['duration']
            })
                .then((data) => {
                    res.set('Content-Type', 'application/json');
                    res.status(202).json(data);

                })
                .catch(error => {
                    res.set('Content-Type', 'text/html');
                    res.status(500).send(error);
                });

        });


};

var deleteRide = (req, res, next) => {
    ride.deleteOne({"_id": req.params.id})
        .then(() => {
            res.set('Content-Type', 'text/html');
            res.status(202).send("The ride Was Deleted Successfully !");
        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });
};

var editRide = async (req, res, next) => {
    let rideToUpdate;
    let or;
    let di;
    rideToUpdate = await ride.findById(req.params.id);

    if (req.body.origin == null)
        or = rideToUpdate["origin"];
    else
        or = req.body.origin;

    if (req.body.destination == null)
        di = rideToUpdate["destination"];
    else
        di = req.body.destination;
    console.log(rideToUpdate["origin"]);
    try {

        dis.get(
            {
                origin: or,
                destination: di,
                metric: 'meter'
            },
            async function (err, data) {
                rideToUpdate = await ride.findById(req.params.id);

                if (err) return console.log(err);
                var x = data['distanceValue'] / 1000;

                if (req.body.status == null)
                    rideToUpdate.status = rideToUpdate["status"];
                else
                    rideToUpdate.status = req.body.status;


                if (req.body.startTime == null)
                    rideToUpdate.startTime = rideToUpdate["startTime"];
                else
                    rideToUpdate.startTime = req.body.startTime;



                if (req.body.origin == null)
                    rideToUpdate.origin = rideToUpdate["origin"];
                else
                    rideToUpdate.origin = req.body.origin;



                if (req.body.destination == null)
                    rideToUpdate.destination = rideToUpdate["destination"];
                else
                rideToUpdate.destination = req.body.destination;



                if (req.body.nbrPlaces == null)
                    rideToUpdate.nbrPlaces = rideToUpdate["nbrPlaces"];
                else
                rideToUpdate.nbrPlaces = req.body.nbrPlaces;


                if (req.body.description == null)
                    rideToUpdate.description = rideToUpdate["description"];
                else
                rideToUpdate.description = req.body.description;



                if (req.body.packageAllowed == null)
                    rideToUpdate.packageAllowed = rideToUpdate["packageAllowed"];
                else
                rideToUpdate.packageAllowed = req.body.packageAllowed;


                rideToUpdate.duration = data['duration'];

                rideToUpdate.distance = x;

                rideToUpdate.prixPerPlace = x * 0.06;

                rideToUpdate.total = req.body.total;


                await rideToUpdate.save()
                    .then((data) => {
                        res.set('Content-Type', 'application/json');
                        res.status(202).json(data);

                    })
                    .catch(error => {
                        res.set('Content-Type', 'text/html');
                        res.status(500).send(error);
                    });
            });

    } catch (e) {

        res.status(500).send(e);

    }

};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

}

var addTravelerRide = async (req, res, next) => {

    rideid = await ride.findById(req.params.idRide);
    userid = await user.findById(req.params.idUser);

    trav = traveler.create({
        user: req.body.status,
        confimationCode: makeid(5),
        valide: false,

    });

    rideid.travelers = trav;


    await rideid.save()
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);

        })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
        });

};

module.exports = {
    getAll,
    getById,
    add,
    deleteRide,
    editRide,
    addTravelerRide
};
