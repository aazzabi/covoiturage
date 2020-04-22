var Package = require('../models/Parcels');
var RequestParcels = require('../models/RequestParcels');
var User = require('../models/User');

exports.add = function (req, res, next) {

    Package.create(
        {
        title: req.body.title,
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        sender: req.body.sender,
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
    const parcelId = await Package.findOne({"_id": req.body.parcelId});
    const user = await User.findOne({"_id": req.body.userId});
    console.log(req.body)
    RequestParcels.create(
        {
            suggestion: req.body.suggestion,
            message: req.body.message,
            confirmation: false,
            userId: user,
            parcelId: parcelId,

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

exports.getByIdPackage = async (req, res, next) => {
    const packages = await Package.findOne({_id: req.params.id});
    res.json(packages);

};
exports.editPackage = async function (req, res, next) {
    PackageToEdit = await Package.findById(req.params.id);
    var parcels = {
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        sender: req.body.sender,
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

