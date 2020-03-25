var mongoose = require('mongoose');

var packageSchema = mongoose.Schema(
    {
        type: {type: String, enum: ["DOCUMENT", "CLOTHES", "MONEY", "LIQUID", "GLASS", "MEDICINE","OTHER"], required: true},
        size: {type: Number, unique: false, required: true},
        weight: {type: Number, unique: false, required: false},
        price: {type: Number, unique: false, required: true},
        receiver: {type: String, unique: false, required: true},
        sender: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
        valide: {type: Boolean, unique: false, required: true},
        sendingCode: {type: String, unique: false, required: true},
        receiveingCode: {type: String, unique: false, required: true},
        departure: {type: String, required: false},
        arrival: {type: String, required: false},

    });

var package = mongoose.model('Package', packageSchema);

module.exports = package;
