var mongoose = require('mongoose');

var packageSchema = mongoose.Schema(
    {

        type: { type: String, required: true },
        size: { type: Number, unique: false, required: true },
        owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],

    });

var package = mongoose.model('Package', packageSchema);

module.exports = package;
