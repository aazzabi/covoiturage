const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
        title: String,
        categories: [String],
        content: String,  // html
        user: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'User',
        },
        files:{type: String},
        time: Date,
});

const ModelClass = mongoose.model('posts', postSchema);
module.exports = ModelClass;

