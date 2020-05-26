var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var DiscSchema = mongoose.Schema({
    title:{type: String, required: true},
    lastMsg:String,
    created_at:Date,
    type: {type: String, required: true, enum: ["2PersonChat", "ChatRoom"], default: "2PersonChat"},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    users:[{type:Schema.Types.ObjectId,ref:'User'}],
});
var discussion =mongoose.model('Discussion',DiscSchema);
module.exports=discussion;
