var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var BearerStrategy = require('passport-http-bearer').Strategy;
var user = require('../models/User');
var config = require('./config'); // get db config file
var jwt = require('jwt-simple');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

var GooglePlusTokenStrategy = require('passport-google-plus-token');


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.authentification.secret;
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
                var decoded = jwt.decode(token, config.authentification.secret);
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

    passport.use(new GoogleStrategy({
            consumerKey: config.google.clientId,
            consumerSecret: config.google.clientSecret,
            callbackURL: config.google.callbackUrl
        },
        function(accessToken, refreshToken, profile, done) {
            user.findOrCreate({ googleId: profile.id }, function (err, u) {
                console.log(u);
                return done(err, u);
            });
        }
    ));

    passport.use('googleToken', new GooglePlusTokenStrategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
    },async (accesToken, refreshToken, profile, done) =>{
        try {
            console.log('accesToken', accesToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);

            //check if this current user exists in our DB
            const existingUser = await user.findOne({'google.id': profile.id});
            if (existingUser) {
                console.log('user already exist');
                return done(null, existingUser);
            }

            //if new Account
            const newUser = new user({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value,
                },
                email: profile.emails[0].value,
            });

            await newUser.save();
            done(null, newUser);
        } catch (e) {
            done(e, false, e.message)
        }
    }))

};
