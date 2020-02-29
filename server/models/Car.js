var mongoose = require('mongoose');

var carSchema = mongoose.Schema(
    {
        brand: { type: String, unique: false, required: true },
        model: { type: String, unique: true, required: true },
        year: { type: String, unique: false, required: false },
        color: { type: String, unique: false, required: true },
        boxCapacity: { type: Number, unique: false, required: true },
        documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false }],
        owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    });

var car = mongoose.model('Car', carSchema);

module.exports = car;
