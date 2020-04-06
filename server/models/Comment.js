var mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    published: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}
);

module.exports = mongoose.model('comments', commentSchema);
