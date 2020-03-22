const passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var Privileges = require('../models/Privilege');
var Users = require('../models/User');

module.exports = async (req, res, next) => {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    jwt.verify(token, config.authentification.secret, async function (err, decoded) {
        adminPriv = await Privileges.find({"name": "aaa"});
        console.log(adminPriv);
        var u = await Users.find({"_id": decoded._id } , {privileges: 1 , _id : 0} )
            .then(
                (data) => {
                    if (data.find(adminPriv)) {
                        console.log('yes');
                    } else {
                        console.log('noo');
                    }
                }, (err) => console.log(err, 'err')
            );

        console.log(u);

        // if (true) {
        next()
        // } else {
        //     res.status(401).send({
        //         error: 'you do not have access to this resource'
        //     });
        // }
    });
};

