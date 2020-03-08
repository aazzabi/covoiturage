var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        phone: {type: String, required: true},
        gender: {type: String, required: true, enum: ["Homme", "Femme", "Autre"]},
        avatar: {type: String, required: false},
        createdAt: {type: Date, default: Date.now()},
        lastLogin: {type: Date},
        group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false},
        car: {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: false},
        privileges: [{type: mongoose.Schema.Types.ObjectId, ref: 'Privilege', required: false}],
        documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false}],
    });


userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var user = mongoose.model('User', userSchema);

module.exports = user;
