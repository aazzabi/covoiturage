var mongoose = require('mongoose');

var driverRequestSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
        requestedAt: { type: Date, default: Date.now() },
        confirmedAt: { type: Date },
        confirmation: { type: Boolean, default : false },
    });

var driverRequest = mongoose.model('DriverRequest', driverRequestSchema);

module.exports = driverRequest;
