
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    userProfile : { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true },
    upVotes:[{type:Schema.Types.ObjectId,ref:'User'}] ,
    downVotes:[{type:Schema.Types.ObjectId,ref:'User'}] ,
    createdAt: { type: Date, default: Date.now() },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

