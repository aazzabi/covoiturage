var mongoose = require('mongoose');

var travalerSchema = mongoose.Schema(
    {
        valide: { type: Boolean, unique: false, required: true, default: false },
        confirmationCode: { type: String, unique: false, required: true },
        user: { type: mongoose.Schema.Types.Object, ref: 'User', required: true }
    });

var traveler = mongoose.model('Traveler', travalerSchema);

module.exports = traveler;
