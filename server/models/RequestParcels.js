var mongoose = require('mongoose');

var RequestParcelsSchema = mongoose.Schema(
    {
        suggestion: {type: Number, unique: false, required: true, default: false},
        confirmationSend: {type: Boolean, unique: false, required: false, default: false},
        confirmationRecive: {type: Boolean, unique: false, required: false, default: false},
        confirmation: {type: Boolean, unique: false, required: false, default: false},
        message: {type: String, unique: false, required: false},
        userId: {type: mongoose.Schema.Types.Object, ref: 'User', required: true},
        parcelId: {type: mongoose.Schema.Types.Object, ref: 'Parcels', required: true},
        latitude: {
            type: Number,
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
        confirmedAt: Date,
        UpdateLocationAt: Date,
        createdAt: Date

    });

var RequestParcels = mongoose.model('RequestParcels', RequestParcelsSchema);

module.exports = RequestParcels;
