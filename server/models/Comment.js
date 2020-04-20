const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    postId: String,
    time: Date,
});

const ModelClass = mongoose.model('comment', commentSchema);

module.exports = ModelClass;
