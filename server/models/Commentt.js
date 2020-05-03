
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const CommentSchema = new Schema(
    {

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userProfile : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true },
    upVotes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}] ,
    downVotes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}] ,
    createdAt: { type: Date, default: Date.now() },
});



module.exports = mongoose.model('comments', CommentSchema);

