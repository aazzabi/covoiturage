var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, required: true, enum: ["Homme", "Femme", "Autre"]  },
        avatar: { type: String, required: false },
        createdAt: { type: Date, default: Date.now() },
        lastLogin: { type: Date },
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: false },
        privileges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Privilege', required: false }],
        documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false }],
    });

var user = mongoose.model('User', userSchema);

module.exports = user;
