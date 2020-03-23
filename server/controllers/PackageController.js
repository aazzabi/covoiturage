var Package = require('../models/Package');

exports.add = function (req, res, next) {
    var pack = {
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        sender: req.body.sender,
        receiver: req.body.receiver,
        valide: req.body.valide,
        sendingCode: makeid(5),
        receiveingCode: makeid(5)
    };

    Package.create(pack, function(err, pack) {
        if(err) {
            const err = new Error('Package not found');
            err.name = 'NotFoundError';

            res.json({
                error : err
            })
        }
        res.json({
            message : "package created successfully"
        })
    })
}

exports.getAllPackage = function(req, res, next) {
    Package.find({}, function(err, packs) {
        if(err) {
            const err = new Error('Package not found');
            err.name = 'NotFoundError';
            res.json({

                error: err
            })
        }
        res.json({
            packs: packs
        })
    })
}

exports.getByIdPackage = function(req, res, next) {
    Package.findOne({"_id": req.params.id}, function(err, packs) {
        if(err) {
            const err = new Error('Package not found');
            err.name = 'NotFoundError';

            res.json({
                error: err
            })
        }
        res.json({
            packs: packs
        })
    })
}

exports.editPackage = async function (req, res, next) {

    PackageToEdit = await Package.findById(req.params.id);

    var packs = {
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        sender: req.body.sender,
        receiver: req.body.receiver,
        valide: req.body.valide,
        sendingCode: PackageToEdit.sendingCode,
        receiveingCode: PackageToEdit.receiveingCode

    }
    Package.update({_id: req.params.id}, packs, function (err, packs) {
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

exports.deletePackage = function(req, res, next) {
    Package.delete({_id: req.params.id}, function(err, packs) {
        if(err) {
            const err = new Error('Package not found');
            err.name = 'NotFoundError';

            res.json({
                error : err
            })
        }
        res.json({
            message : "package deleted successfully"
        })
    })
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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
