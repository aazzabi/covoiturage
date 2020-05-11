var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ratingSchema = mongoose.Schema({
    punctuality:{type: Number, default: -1 },
    companionship:{type: Number,default: -1 },
    honesty:{type: Number,default: -1 },
    overall_rating:{type: Number,default: -1 },
    Safe_Driving:{type: Number,default: -1 },
    confort:{type: Number,default: -1 },
    createdAt:Date,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    userProfile : { type: Schema.Types.ObjectId, ref: 'User' },
})
var rating =mongoose.model('Rating',ratingSchema);
module.exports=rating;
