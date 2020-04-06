var ride = require('../models/Ride');
var user = require('../models/User');
var traveler = require('../models/Traveler');
var dis = require('google-distance');
dis.apiKey = 'AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg';
var SendEmail = require('./SendEmailController');


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function calculeTotal(pl, np) {

    //mazalet 5edmet package
    return pl * np

}

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

            user.findOne({"_id": req.params.idDriver})
                .then((dr) => {

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
                        duration: data['duration'],
                        driver: dr
                    })
                        .then((data) => {
                            res.set('Content-Type', 'application/json');
                            res.status(202).json(data);

                        })
                        .catch(error => {
                            res.set('Content-Type', 'text/html');
                            res.status(500).send(error);
                        });
                    console.log(dr);
                })
                .catch(error => {
                    console.log(error);
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

    confirmed = false;
    var i;
    for (i = 0; i < rideToUpdate.travelers.length; i++) {
        if (rideToUpdate.travelers[i].valide) {
            confirmed = true;
        }
    }

    if (confirmed){

        res.set('Content-Type', 'application/json');
        res.status(202).json('you cant update ride after you validate a traveler ');

    }
    else {
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

                    rideToUpdate.total = 0;


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
    }


};

var addTravelerRide = async (req, res, next) => {

    rideId = await ride.findById(req.params.idRide);
    userid = await user.findById(req.params.idUser);
    var i;
    exist = false;
    for (i = 0; i < rideId.travelers.length; i++) {
        if (userid.id.toString() === rideId.travelers[i].user._id.toString()) {
            exist = true;
        }
    }
    if (rideId['nbrPlaces'] > rideId.travelers.length) {
        if (rideId.driver.toString() === userid.id.toString()) {
            res.set('Content-Type', 'application/json');
            res.status(301).send('it s your own carpool dude');
        } else {
            if (exist) {
                res.set('Content-Type', 'application/json');
                res.status(301).send('user alredy in this ride');
            } else {
                traveler.create({
                    user: userid,
                    confirmationCode: makeid(7),
                }).then((data) => {
                        ride.updateOne({'_id': req.params.idRide}, {"$addToSet": {"travelers": data}})
                            .then((d) => {
                                // sendemail lel d.driver , w data.user !!!
                                res.set('Content-Type', 'application/json');
                                res.status(202).json(d);
                            })
                            .catch(error => {
                                res.set('Content-Type', 'application/json');
                                res.status(500).send(error);
                            });
                    },
                    (err) => console.log(err));
            }
        }
    } else {
        res.set('Content-Type', 'application/json');
        res.status(301).send('full');
    }
};

var getAllTravelers = (req, res, next) => {

    ride.find({"_id": req.params.idRide}, {"travelers": 1, "_id": 0})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data[0]);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

var removeTravelerRide = async (req, res, next) => {

    rideId = await ride.findById(req.params.idRide);
    userid = await user.findById(req.params.idUser);
    var i;
    exist = false;
    for (i = 0; i < rideId.travelers.length; i++) {

        if (userid.id.toString() === rideId.travelers[i].user._id.toString()) {

            exist = true;

            if (rideId.travelers[i].valide){

                res.set('Content-Type', 'application/json');
                res.status(202).send("cant delete a valid user");
            }
            else {
                ride.update({'_id': req.params.idRide}, {"$pull": {"travelers": rideId.travelers[i]}})
                    .then((d) => {
                        // sendemail lel d.driver , w data.user !!!
                        res.set('Content-Type', 'application/json');
                        res.status(202).json(d);
                    })
                    .catch(error => {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(error);
                    });

                traveler.deleteOne({"_id": rideId.travelers[i]._id})
                    .then(() => {
                        res.set('Content-Type', 'application/json');
                        res.status(202).send("traveler deleted");
                    })
                    .catch(error => {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(error);
                    });
            }

        }
    }
    if (!exist) {
        res.set('Content-Type', 'application/json');
        res.status(404).send("traveler not found");
    }
};

var getRidesByDriver = (req, res, next) => {

    ride.find({"driver": req.params.idUser})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json(data);
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};

var confrimTraveler = async (req, res, next) => {

    let rideToUpdate;
    rideToUpdate = await ride.findById(req.params.idRide);
    var i;
    exist = false;
    for (i = 0; i < rideToUpdate.travelers.length; i++) {
        if (rideToUpdate.travelers[i].confirmationCode === req.params.validationCode) {
            exist = true;
            co = i;
            traveler.updateOne({'_id': rideToUpdate.travelers[i]._id}, {"$set": {"valide": true}})
                .then(() => {
                    traveler.findById(rideToUpdate.travelers[co]._id).then((da) => {

                        if (rideToUpdate.travelers[co].valide) {
                            res.set('Content-Type', 'application/json');
                            res.status(301).json('already valid');
                        } else {
                            rideToUpdate.travelers.splice(co, 1);
                            rideToUpdate.travelers.push(da);
                            rideToUpdate.placeConfirmed = rideToUpdate['placeConfirmed'] + 1;
                            rideToUpdate.total = calculeTotal(rideToUpdate.prixPerPlace, rideToUpdate.placeConfirmed);
                            rideToUpdate.save();
                            res.set('Content-Type', 'application/json');
                            res.status(202).json(rideToUpdate);
                        }
                    })
                })
                .catch(error => {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(error);
                });
        }
    }
    if (!exist) {
        res.set('Content-Type', 'application/json');
        res.status(301).send('no traveler exist with this code')
    }

};

var getTraveler = (req, res, next) => {

    traveler.findOne({"_id": req.params.idTraveler})
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
    addTravelerRide,
    getAllTravelers,
    removeTravelerRide,
    getRidesByDriver,
    confrimTraveler,
    getTraveler
};
