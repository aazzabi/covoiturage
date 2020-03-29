var mongoose = require('mongoose');

var allCarsModelCapcitySchema = mongoose.Schema(
    {
        marque: {type: String, unique: false, required: true},
        model: {type: String, unique: false, required: true},
        capacite: {type: Number, unique: false, required: true},
    });
var allCarsModelCapacity = mongoose.model('allCarsModelsCapacity', allCarsModelCapcitySchema);

module.exports = allCarsModelCapacity;
