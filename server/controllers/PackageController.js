var Package = require('../models/Parcels');
var ReqParcels = require('../models/RequestParcels');
var User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findOne({"_id": req.body.sender});
    console.log(user)
    console.log("dd",req.body.sender)
    Package.create(
        {
            title: req.body.title,
            type: req.body.type,
            size: req.body.size,
            price: req.body.price,
            sender: user,
            departure: req.body.departure,
            weight: req.body.weight,
            arrival: req.body.arrival,
            valide: req.body.valide,
            files: req.body.files,
            description: req.body.description,
            sendingCode: makeid(5),
            receiveingCode: makeid(5)
        }
    ).then((data) => {
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);

    })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
            console.log(error)
        });
}

exports.addRequest = async (req, res, next) => {
    const user = await User.findOne({"_id": req.body.user});
    const parcelId = await Package.findOne({"_id": req.body.parcelId});
    userid = await User.findById(req.body.user);
    console.log(req.body);

    ReqParcels.create(
        {
            suggestion: req.body.Suggestion,
            message: req.body.message,
            confirmation: false,
            userId: user,
            parcelId: parcelId,
            createdAt: new Date(),
        }
    ).then((data) => {
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);

    })
        .catch(error => {
            res.set('Content-Type', 'text/html');
            res.status(500).send(error);
            console.log(error)
        });
}

exports.getAllPackage = async (req, res, next) => {
    const packages = await Package.find();
    res.json(packages);

}
exports.refuseRequest = (req, res) => {
    console.log(req.params.id)
    ReqParcels.deleteOne({"_id": req.params.id})
        .then((data) => console.log(data), (error) => console.log(error));
};
exports.acceptRequest = async (req, res) => {
    console.log('idRequest', req.params.id);

    ReqParcels.updateOne({'_id': req.params.id},
        {
            '$set': {
                confirmedAt: new Date(),
                confirmation: true
            }
        })
        .then(async (data) => {
            res.status(202).json({'status': 200, 'message': 'Driver request accepted, and user accepted as a Driver'});
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
exports.getByIdPackage = async (req, res, next) => {
    const packages = await Package.findOne({_id: req.params.id});
    res.json(packages);

};
exports.getMyPackage = async (req, res, next) => {
    const user = await User.findOne({"_id": req.params.id});
    const packages = await Package.find({sender: user});
    res.json(packages);

};
exports.getMyRequest = async (req, res, next) => {
    const RequestParcels = await Package.findOne({"_id": req.params.id});
    const requests = await ReqParcels.find({parcelId: RequestParcels});
    console.log(requests)

    res.json(requests);

};
exports.editPackage = async function (req, res, next) {
    PackageToEdit = await Package.findById(req.params.id);
    var parcels = {
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        receiver: req.body.receiver,
        valide: req.body.valide,
        departure: req.body.departure,
        arrival: req.body.arrival,
        weight: req.body.weight,
        sendingCode: PackageToEdit.sendingCode,
        receiveingCode: PackageToEdit.receiveingCode

    }
    Package.update({_id: req.params.id}, parcels, function (err, parcels) {
        if (err) {
            const err = new Error('Blog post not found');
            err.name = 'NotFoundError';
            res.json({
                error: err
            })
        }
        res.json({
            message: "package updated successfully"
        })
    })
}

exports.getDriverRequest = async (req, res, next) => {
    const RequestParcels = await User.findOne({"_id": req.params.id});
    const requests = await ReqParcels.find({userId: RequestParcels});
    console.log(requests)

    res.json(requests);

};


exports.confrimSendingParcel = async (req, res, next) => {

    let parcelToUpdate;
    parcelToUpdate = await ReqParcels.findById(req.params.idReq);
    const parcel =  parcelToUpdate.parcelId;

   const p = await ReqParcels.findById(parcel._id);

    if (parcel.sendingCode === req.params.sendingCode) {
        parcel.valideSend = true;
        await ReqParcels.updateOne({'_id': parcelToUpdate._id}, {"$set": {"confirmationSend": true,"parcelId":parcel}})
            .then(() => {

                Package.updateOne({'_id': parcel._id}, {"$set": {"valideSend": true}})
                    .then(() => {

                        res.set('Content-Type', 'application/json');
                        res.status(301).json('done');

                    })
                    .catch(error => {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(error);
                    });

            })
            .catch(error => {
                res.set('Content-Type', 'application/json');
                res.status(500).send(error);
            });


    }
    else {
        res.set('Content-Type', 'application/json');
        res.status(301).json('wrong code');

    }



};

exports.confrimRecivingParcel = async (req, res, next) => {

    let parcelToUpdate;
    parcelToUpdate = await ReqParcels.findById(req.params.idReq);
    const parcel =  parcelToUpdate.parcelId;

    const p = await ReqParcels.findById(parcel._id);

    if (parcel.receiveingCode === req.params.receiveingCode) {
        parcel.valideReceive = true;
        await ReqParcels.updateOne({'_id': parcelToUpdate._id}, {"$set": {"confirmationRecive": true,"parcelId":parcel}})
            .then(() => {

                Package.updateOne({'_id': parcel._id}, {"$set": {"valideReceive": true}})
                    .then(() => {

                        res.set('Content-Type', 'application/json');
                        res.status(301).json('done');

                    })
                    .catch(error => {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(error);
                    });

            })
            .catch(error => {
                res.set('Content-Type', 'application/json');
                res.status(500).send(error);
            });


    }
    else {
        res.set('Content-Type', 'application/json');
        res.status(301).json('wrong code');

    }



};





exports.deletePackage = function (req, res, next) {
    Package.delete({_id: req.params.id}, function (err, parcels) {
        if (err) {
            const err = new Error('Package not found');
            err.name = 'NotFoundError';

            res.json({
                error: err
            })
        }
        res.json({
            message: "package deleted successfully"
        })
    })
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

