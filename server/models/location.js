const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
    userId: {type: mongoose.Schema.Types.Object, ref: 'User', required: true},
    parcelId: {type: mongoose.Schema.Types.Object, ref: 'Parcels', required: true},

})

module.exports = Location = mongoose.model('locations', LocationSchema);
