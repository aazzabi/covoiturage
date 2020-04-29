var mongoose = require('mongoose');

var RequestParcelsSchema = mongoose.Schema(
    {
        suggestion: {type: String, unique: false, required: true, default: false},
        confirmationSend: {type: Boolean, unique: false, required: false, default: false},
        confirmationRecive: {type: Boolean, unique: false, required: false, default: false},
        message: {type: String, unique: false, required: false},
        userId: {type: mongoose.Schema.Types.Object, ref: 'User', required: true},
        parcelId: {type: mongoose.Schema.Types.Object, ref: 'Parcels', required: true},
        confirmedAt: Date,
        createdAt: Date

    });

var RequestParcels = mongoose.model('RequestParcels', RequestParcelsSchema);

module.exports = RequestParcels;
