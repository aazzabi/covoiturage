var mongoose = require('mongoose');

var packageSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {
            type: String,
            enum: ["DOCUMENT", "CLOTHES", "MONEY", "LIQUID", "GLASS", "MEDICINE", "OTHER"],
            required: true
        },
        size: {type: String, unique: false, required: true},
        weight: {type: Number, unique: false, required: false},
        price: {type: Number, unique: false, required: true},
        receiver: {type: String, unique: false},
        sender: {type: mongoose.Schema.Types.Object, ref: 'User'},
        valide: {type: Boolean, unique: false},
        description: [{type: String,required: false}],
        sendingCode: {type: String, unique: false, required: true},
        receiveingCode: {type: String, unique: false, required: true},
        departure: {type: String, required: false},
        arrival: {type: String, required: false},
        files: [{type: String,required: false}],


    });

var parcels = mongoose.model('Parcels', packageSchema);

module.exports = parcels;
