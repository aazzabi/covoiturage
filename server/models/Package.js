var mongoose = require('mongoose');

var packageSchema = mongoose.Schema(
    {

        type: { type: String, enum: ["DOCUMENT", "CLOTHES", "MONEY","LIQUID","GLASS","MEDICINE"], required: true },
        size: { type: Number, unique: false, required: true },
        receiver: { type: String, unique: false, required: true },
        sender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],

        sendingCode: { type: String, unique: false, required: true },
        receiveingCode: { type: String, unique: false, required: true },

    });

var package = mongoose.model('Package', packageSchema);

module.exports = package;
