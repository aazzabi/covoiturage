var Group = require('../models/Group');
var driverRequest = require('../models/DriverRequest');
var user = require('../models/User');
var car = require('../models/Car');
var claim = require('../models/Claim');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// import { v1 as uuidv1 } from 'uuid';
var uuid = require('uuid');


// idha admin => getAll
// idha user => getAll + CreatedBy
// sinon (Agent) => getByResponsible
var getAll = async (req, res, next) => {
    const u = await user.findOne({"_id": req.params.idUser});
    if (u.role === "ADMIN") {
        claim.find({}).then((data) => {
            console.log(data, 'data use');
            res.set('Content-Type', 'application/json');
            res.status(200).send(data);
        }, error => {
            res.set('Content-Type', 'application/json');
            res.status(400).send(error);
        });
    } else if (u.role === 'USER') {
        claim.find({'createdBy': u}).then((data) => {
            res.status(200).send(data);
        }, error => {
            res.status(400).send(error);
        });
    } else {
        // console.log('other', u)
        claim.find({'responsible': u}).then((data) => {
            console.log('other', data)
            res.set('Content-Type', 'application/json');
            res.status(200).send(data);
        }, error => {
            res.set('Content-Type', 'application/json');
            res.status(400).send(error);
        });
    }
};

// http://localhost:3000/claims/getById/:idClaim/:idUser
//
// je teste avant sur le user qui va ouvrir cette réclamation:
// idha admin => getById
// idha user => getById + CreatedBy
// sinon getById
//      + idha awel mara y7elha, nbadel l status mta3ha 'IN_PROGRESS'
//      + na7seblou guedeh b9aa bech 7allhaa  + increment de 1 fel nombre des reclamationOuverts
var getById = async (req, res, next) => {
    const u = await user.findOne({"_id": req.params.idUser});
    console.log('USER');
    const cla = await claim.findOne({"_id": req.params.idClaim})
        .populate('createdBy').populate('responsible');
    if (u.role === "ADMIN") {
        console.log(u.role);
        claim.findOne({"_id": req.params.idClaim}).populate('responsible').populate('createdBy').then((data) => {
            console.log(data, 'data use');
            res.set('Content-Type', 'application/json');
            res.status(200).send(data);
        }, error => {
            res.set('Content-Type', 'application/json');
            res.status(400).send(error);
        });
    } else if (u.role === 'USER') {
        console.log('USER');
        claim.findOne({"_id": req.params.idClaim}).populate('responsible').populate('createdBy').then((data) => {
            console.log(req.params.idUser);
            console.log(req.params.idClaim);
            console.log(data);
            res.status(200).send(data);
        }, error => {
            res.status(400).send(error);
        });
    } else {
        if (cla.status === "WAITING") {
            console.log(u.role);
            claim.findOneAndUpdate({"_id": req.params.idClaim}, {
                $set: {
                    'status': 'IN_PROGRESS',
                    'openedAt': new Date()
                }
            })
                .then(async (data) => {
                    const cdAfterUpdate = await claim.find({"_id": req.params.idClaim})
                        .populate('createdBy')
                        .populate( 'comments');
                    // nzid l wa9t li b9aah bech y7el l réclaamtion , w le nombre de réclamation ouverts
                    var dateDiff = (new Date() - cla.createdAt.getTime()) / (60 * 1000);
                    await user.findOneAndUpdate({'_id': req.params.idUser}, {
                        '$inc': {
                            'moyAssiduite': dateDiff,
                            'nbrClaimsOpened': 1
                        }
                    });
                    res.set('Content-Type', 'application/json');
                    res.status(200).send(cdAfterUpdate);
                }, error => {
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(error);
                });
        } else {
            res.set('Content-Type', 'application/json');
            res.status(200).send(cla);
        }
    }
};


var add = async (req, res, next) => {
    const cr = await user.findOne({"_id": req.params.idUser});
    const responsible = await user.findOne({"role": req.body.type});

    claim.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        priority: req.body.priority,
        createdBy: cr,
        responsible: responsible,
        createdAt: new Date(),
    }).then((data) => {
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);

    })
        .catch(error => {
            console.log(error);
            res.set('Content-Type', 'application/json');
            res.status(500).send(error);
        });
};
var deleteClaim = (req, res, next) => {
    claim.deleteOne({"_id": req.params.id})
        .then(() => {
            res.set('Content-Type', 'application/json');
            res.status(202).send({"status": "success", "message": "The claim Was Deleted Successfully !"});
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            console.log(error);
            res.status(500).send(error);
        });
};
var updateClaim = (req, res, next) => {
    const updateData = req.body;
    if (!updateData) {
        res.status(422).send({"message": "please provide what you want to update"})
    }
    claim.findOne({"_id": req.params.id}).populate('createdBy').populate('responsible').then(function (cl) {
        console.log(req.params.id, 'id');
        console.log(updateData, 'updateData');
        if (!cl) {
            return res.sendStatus(401);
        }
        //NOTE  only update fields that were actually passed...
        if (typeof updateData.title !== 'undefined') {
            cl.title = updateData.title;
        }
        if (typeof updateData.description !== 'undefined') {
            cl.description = updateData.description;
        }
        if (typeof updateData.priority !== 'undefined') {
            cl.priority = updateData.priority;
        }
        if (typeof updateData.type !== 'undefined') {
            cl.type = updateData.type;
        }
        return claim.findOneAndUpdate({'_id': req.params.id},
            {$set: {'title': cl.title, 'description': cl.description, 'priority': cl.priority, 'type': cl.type}})
            .then(function () {
                res.set('Content-Type', 'application/json');
                return res.json({claim: cl});
            });
    }).catch(() => {
            res.set('Content-Type', 'application/json');
            res.status(422).send({"message": "couldn't update claim"})
        }
    );
};

// http://localhost:3000/claims/resolve/:idClaim
var resolveClaim = async (req, res, next) => {
    const cr = await claim.findOne({"_id": req.params.id});
    if (cr) {
        if ((cr.status === 'IN_PROGRESS') || (cr.status === 'WAITING')) {
            claim.findOneAndUpdate(
                {'_id': req.params.id, 'status': 'IN_PROGRESS'},
                {$set: {'status': 'RESOLVED', 'resolvedAt': new Date()}}
            ).then(async (data) => {
                const cr = await claim.findOne({"_id": req.params.id}).populate('createdBy').populate('responsible');

                // nzid l wa9t li b9aah bech y7el l réclaamtion , w le nombre de réclamation ouverts
                var dateDiff = (cr.openedAt.getTime() - cr.createdAt.getTime()) / (60 * 1000);
                await user.findOneAndUpdate({'_id': cr.responsible._id}, {
                    '$inc': {
                        'moyReponse': dateDiff,
                        'nbrClaimsResolved': 1
                    }
                });
                res.set('Content-Type', 'application/json');
                res.status(200).send(cr);
            }, error => {
                console.log(error);
                res.set('Content-Type', 'application/json');
                res.status(500).send(error);
            })
        } else {
            console.log('cr');
            res.set('Content-Type', 'application/json');
            res.status(500).send({'status': 'error', 'message': 'the claim isnt in progress'});

        }
    } else {
        res.set('Content-Type', 'application/json');
        res.status(500).send({'status': 'error', 'message': 'the claim doesnt exist'});

    }
};

// http://localhost:3000/claims/changeStatus/:idClaim/:status
var changeStatus = async (req, res, next) => {
    claim.findOneAndUpdate({'_id': req.params.id}, {$set: {'status': req.params.status}}).then(async (data) => {
        const cr = await claim.findOne({"_id": req.params.id}).populate('createdBy').populate('responsible');
        res.set('Content-Type', 'application/json');
        res.status(200).send(cr);
    }, error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.status(500).send(error);
    })
};

var addCommentToClaim = async (req, res, next) => {
    const u = await user.findOne({'_id': req.params.idUser});
    console.log(u);
    console.log(req.body.content);
    const newIdWithSep = uuid.v1();
    const newId = newIdWithSep.replace(/-/g, '');
    console.log(newId, 'newId');
    claim.updateOne({'_id': req.params.idClaim}, {
        $push: {
            'comments':
                {
                    '_id': newId,
                    'published': new Date(),
                    'content': req.body.content,
                    'user': u
                }
        }
    }).then(async (data) => {
        const cla = await claim.findOne({'_id': req.params.idClaim}).populate('createdBy').populate('responsible');
        res.set('Content-Type', 'application/json');
        res.status(200).send(cla);
    }, error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.status(500).send(error);
    })
};
var deleteComment = async (req, res, next) => {
    const comm = await claim.findOne({"_id": req.params.idClaim}, {"comments": 1, "_id": 0});
    if (comm.comments.length > 0) {
        let cm;
        comm.comments.forEach(c => {
            if (c._id === req.params.idComment) {
                cm = c;
            }
        });

        claim.updateOne({'_id': req.params.idClaim}, {$pull: {'comments': cm}})
            .then(async (data) => {
                console.log(data);
                const cla = await claim.findOne({'_id': req.params.idClaim}).populate('createdBy').populate('responsible');
                res.set('Content-Type', 'application/json');
                res.status(200).send(cla);
            }, error => {
                console.log(error);
                res.set('Content-Type', 'application/json');
                res.status(500).send(error);
            });
    } else {
        res.set('Content-Type', 'application/json');
        res.status(500).send({status: 'error', 'message': 'There is no comments'});
    }
};

// {
//     '$text': {'$search': req.params.keyword}
// }

//        'or':[ {title: new RegExp('^'+req.params.keyword+'$', "i")} , {description:new RegExp('^'+req.params.keyword+'$', "i")} ]

var searchClaim = async (req, res, next) => {
    const u = await user.findOne({"_id": req.params.idUser});
    if (u.role === "ADMIN") {
        claim.find(
            {
                '$or': [
                    {title: new RegExp(req.params.keyword, "i")},
                    {description: new RegExp(req.params.keyword, "i")},
                    {priority: new RegExp(req.params.keyword, "i")},
                    {status: new RegExp(req.params.keyword, "i")},
                    {type: new RegExp(req.params.keyword, "i")},
                ]
            }
        ).populate('createdBy').populate('responsible')
            .then((data) => {
                console.log(req.params.keyword, 'keyword');
                res.set('Content-Type', 'application/json');
                res.status(200).send(data);
            }, error => {
                console.log(error, 'error**********');
                res.set('Content-Type', 'application/json');
                res.status(400).send(error);
            });
    } else if (u.role === 'USER') {
        claim.find(
            {
                '$or': [
                    {title: new RegExp(req.params.keyword, "i")},
                    {description: new RegExp(req.params.keyword, "i")},
                    {priority: new RegExp(req.params.keyword, "i")},
                    {status: new RegExp(req.params.keyword, "i")},
                    {type: new RegExp(req.params.keyword, "i")},
                ]
            }
        ).populate('createdBy').populate('responsible').then((data) => {
            res.status(200).send(data);
        }, error => {
            res.status(400).send(error);
        });
    } else {
        // console.log('other', u)
        claim.find(
            {
                '$or': [
                    {title: new RegExp(req.params.keyword, "i")},
                    {description: new RegExp(req.params.keyword, "i")},
                    {priority: new RegExp(req.params.keyword, "i")},
                    {status: new RegExp(req.params.keyword, "i")},
                    {type: new RegExp(req.params.keyword, "i")},
                ]
            }
        ).populate('createdBy').populate('responsible').then((data) => {
            console.log('other', data)
            res.set('Content-Type', 'application/json');
            res.status(200).send(data);
        }, error => {
            res.set('Content-Type', 'application/json');
            res.status(400).send(error);
        });
    }
};

module.exports = {
    getAll,
    getById,
    deleteClaim,
    add,
    updateClaim,
    resolveClaim,
    changeStatus,
    addCommentToClaim,
    deleteComment,
    searchClaim,
};

