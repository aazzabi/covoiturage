var mongoose = require('mongoose');
// delete mongoose.connection.models['Posts'];

var BlogsSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        watchCount: {type: Number, default: 0},
        likeCount: {type: Number, default: 0},
        publishAt: {type: Date, default: Date.now},
        modifyAt: {type: Date},
        tags: {
                type: [String],
                required: true
        },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],

        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    });

module.exports = mongoose.model('Blogs', BlogsSchema);
