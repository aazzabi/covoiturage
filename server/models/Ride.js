var mongoose = require('mongoose');

var rideSchema = mongoose.Schema(
    {
        status: { type: String, required: true, enum: ["aaa"] , default: "aaa" },
        startTime: { type: Date },
        duration: { type: String },
        distance: { type: String, required: true },
        origin: { type: String, required: false },
        destination: { type: String, unique: false, required: true },
        nbrPlaces: {type:Number, required: true, maximum: 4, minimum : 1 },
        prixPerPlace: {type:Number, required: true},
        description: {type: String, required: false},
        total: { type: Number, unique: false, required: true },
        packageAllowed: { type: Boolean, default: true, required: true },
        driver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        travelers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Traveler', required: true }],
        package: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }],
    });

var ride = mongoose.model('Ride', rideSchema);

module.exports = ride;
