var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ratingSchema = mongoose.Schema({
    punctuality:Number,
    companionship:Number,
    honesty:Number,
    overall_rating:Number,
    Safe_Driving:Number,
    confort:Number,
    createdAt:Date,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    userProfile : { type: Schema.Types.ObjectId, ref: 'User' },
})
var rating =mongoose.model('Rating',ratingSchema);
module.exports=rating;
