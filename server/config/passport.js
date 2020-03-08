var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var BearerStrategy = require('passport-http-bearer').Strategy;
var user = require('../models/User');
var config = require('../config/database'); // get db config file
var jwt = require('jwt-simple');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(
        opts,
        function (jwt_payload, done) {
            user.findOne({id: jwt_payload.id}, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        })
    );

    passport.use(new BearerStrategy(
        function (token, done) {
            console.log(token);
            try {
                var decoded = jwt.decode(token, config.secret);
                user.findOne({_id: decoded._id}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false); //no such user
                    } else {
                        return done(null, user); //allows the call chain to continue to the intented route
                    }
                });
            } catch (err) {
                return done(null, false); //returns a 401 to the caller
            }
        }));
};
