var mongoose = require('mongoose');

var groupSchema = mongoose.Schema(
    {
        groupName: { type: String, unique: true, required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
        privileges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Privilege', required: false }],
        createdAt: { type: Date, default: Date.now() },
    });

var group = mongoose.model('Group', groupSchema);

module.exports = group;
