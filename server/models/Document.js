var mongoose = require('mongoose');

var documentSchema = mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        type: { type: String, unique: true, required: true ,enum: ["CIN", "PERMIS", "CARTE_GRISE", "ASSURANCE", "VIGNETTE"] },
        createdAt: { type: Date, default: Date.now() },
    });

var document = mongoose.model('Document', documentSchema);

module.exports = document;
