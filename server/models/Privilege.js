var mongoose = require('mongoose');

var privilegeSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: false}
    });

var privilege = mongoose.model('Privilege', privilegeSchema);

module.exports = privilege;
