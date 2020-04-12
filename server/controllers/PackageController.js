var Package = require('../models/Parcels');

exports.add = function (req, res, next) {
    Package.create({
        title: req.body.type,
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        sender: req.body.sender,
        receiver: req.body.receiver,
        departure: req.body.departure,
        weight: req.body.weight,
        arrival: req.body.arrival,
        valide: req.body.valide,
        files: req.body.files,
        description: req.body.description,
        sendingCode: makeid(5),
        receiveingCode: makeid(5)
    }).then((data) => {
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

exports.addPackageToRide = async (req, res, next) => {

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
