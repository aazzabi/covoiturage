var mongoose = require('mongoose');

var claimSchema = mongoose.Schema(
    {
        title: {type: String, unique: false, required: true, index: true, text: true},
        description: {type: String, unique: false, required: true, index: true, text: true},
        status: {type: String, unique: false, enum: ["WAITING", "IN_PROGRESS", "RESOLVED", "CONFIRMED"], default: "WAITING" , required: true},
        priority: {type: String, unique: false, enum: ["LOW", "NORMAL", "IMPORTANT", "CRITICAL"],  required: true},
        type: {type: String, unique: false, enum: ["TECHNICAL", "FINANCIAL", "RELATIONAL"],  required: true},
        createdAt: {type: Date, unique: false, required: false},
        openedAt: {type: Date, unique: false, required: false},
        resolvedAt: {type: Date, unique: false, required: false},
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false},
        responsible: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false},
        comments: [{type: mongoose.Schema.Types.Object, ref: 'comments'}],
    });
var claim = mongoose.model('Claim', claimSchema);
module.exports = claim;
