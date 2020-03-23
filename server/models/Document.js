var mongoose = require('mongoose');

var documentSchema = mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
        createdAt: { type: Date, default: Date.now() },
    });

var document = mongoose.model('Document', documentSchema);

module.exports = document;
