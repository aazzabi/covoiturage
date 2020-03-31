var mongoose = require('mongoose')
var Schema=mongoose.Schema;
var DiscSchema = mongoose.Schema({
    title:String,
    lastMsg:String,
    created_at:Date,
    type: {type: String, required: true, enum: ["2PersonChat", "ChatRoom"], default: "2PersonChat"},
    owner:{type:Schema.Types.ObjectId,ref:'user'},
    users:[{type:Schema.Types.ObjectId,ref:'user'}],
})
var discussion =mongoose.model('Discussion',DiscSchema);
module.exports=discussion;
