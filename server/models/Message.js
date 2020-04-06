var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var messageSchema = mongoose.Schema({
    text:String,
    created_at:Date,
    discussion:{type:Schema.Types.ObjectId,ref:'Discussion'},
    sender:String,
    seen:{type:Boolean , default: false }
})
var message =mongoose.model('Message',messageSchema);
module.exports=message;
