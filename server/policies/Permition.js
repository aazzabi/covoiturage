var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = authorize;

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        (req, res, next) => {
            var token = req.headers['authorization'].replace(/^Bearer\s/, '');
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });


            jwt.verify(token, config.authentification.secret, function(err, decoded) {
                if (roles.length && !roles.includes(decoded.role)) {
                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                next();
            });
        }
    ];
}
