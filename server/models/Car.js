var mongoose = require('mongoose');

var carSchema = mongoose.Schema(
    {
        model: {type: String, unique: true, required: true},
        subModel: {type: String, unique: false, required: true},
        year: {type: String, unique: false, required: false},
        color: {type: String, unique: false, required: true},
        boxCapacity: {type: Number, unique: false, required: true},
        documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false}],
        owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    });


var carModelSchema = mongoose.Schema(
    {
        _id: {type: String, unique: true, required: true},
        subModel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubModel', required: false }],
    });

var carSubModelSchema = mongoose.Schema(
    {
        _id: {type: String, unique: true, required: true},
        subModel: {type: String, unique: true, required: true},
        capacity: {type: Number, unique: false, required: true},
    });

var carSubModels = mongoose.model('carSubModel', carSubModelSchema);
var carModels = mongoose.model('CarModels', carModelSchema);
var car = mongoose.model('Car', carSchema);

module.exports = {car, carModels, carSubModels};
