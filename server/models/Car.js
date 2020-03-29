var mongoose = require('mongoose');

var carSchema = mongoose.Schema(
    {
        marque: {type: String, unique: false, required: true},
        model: {type: String, unique: false, required: true},
        year: {type: String, unique: false, required: false},
        color: {type: String, unique: false, required: true},
        capacite: {type: Number, unique: false, required: true},
        documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false}],
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    });

var car = mongoose.model('Car', carSchema);
module.exports = car;
