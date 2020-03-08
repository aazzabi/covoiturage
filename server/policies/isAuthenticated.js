const passport = require('passport');
module.exports = function (req, res, next) {
    passport.authenticate('bearer', function (err, user) {
        if (err || !user) {
            console.log(err);
            res.status(401).send({
                error: 'you do not have access to this resource'
            });
        } else {
            console.log(user);
            req.user = user;
            next()
        }
    })(req, res, next);
};

