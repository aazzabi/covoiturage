var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Car = require('./Car');
var userSchema = mongoose.Schema(
    {
        username: {type: String, unique: true, required: false},
        password: {type: String, required: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        email: {type: String, required: true},
        role: {
            type: String,
            required: true,
            enum: ["DRIVER", "ADMIN", "USER", "TECHNICAL", "FINANCIAL", "RELATIONAL"],
            default: "USER"
        },
        phone: {type: String, required: false},
        gender: {type: String, required: false, enum: ["HOMME", "FEMME", "AUTRE"]},
        avatar: {type: String, required: false},
        createdAt: {type: Date, default: Date.now()},
        lastLogin: {type: Date},
        status: {type: String,default: ""},
        group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false},
        car: {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: false},
        privileges: [{type: mongoose.Schema.Types.ObjectId, ref: 'Privilege', required: false}],
        documents: [{type: mongoose.Schema.Types.Object, ref: 'Document', required: false}],
        moyAssiduite: {type: Number, unique: false, required: false, default: 0},
        moyReponse: {type: Number, unique: false, required: false, default: 0},
        nbrClaimsOpened: {type: Number, unique: false, required: false, default: 0},
        nbrClaimsResolved: {type: Number, unique: false, required: false, default: 0},
        subscription: {
            type: String
        },
        //OAuth google , facebook
        method: {type: String, required: true, enum: ["local", "facebook", "google"], default: 'local'},
        google: {
            id: {type: String},
            email: {type: String, lowercase: true}
        },
        facebook: {
            id: {type: String},
            email: {type: String, lowercase: true}
        }
    }
);


userSchema.pre('save', function (next) {
    if (this.method !== 'local') {
        next();
    }
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
