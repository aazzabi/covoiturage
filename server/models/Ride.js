var mongoose = require('mongoose');

var rideSchema = mongoose.Schema(
    {
        rideStartTime: { type: Date },
        rideStatus: { type: String, required: true },
        distance: { type: String, required: true },
        origin: { type: String, required: false },
        destination: { type: String, unique: false, required: true },
        total: { type: Number, unique: false, required: true },
        owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        costumers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        package: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }],

    });

var ride = mongoose.model('Ride', rideSchema);

module.exports = ride;
