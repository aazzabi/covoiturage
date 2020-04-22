var mongoose = require('mongoose');

var RequestParcelsSchema = mongoose.Schema(
    {
        suggestion: { type: Number, unique: false, required: true, default: false },
        confirmation: { type: Boolean, unique: false, required: false },
        message: { type: String, unique: false, required: false },
        userId: { type: mongoose.Schema.Types.Object, ref: 'User', required: true },
        parcelId: { type: mongoose.Schema.Types.Object, ref: 'Parcels', required: true }

    });

var RequestParcels = mongoose.model('RequestParcels', RequestParcelsSchema);

module.exports = RequestParcels;
