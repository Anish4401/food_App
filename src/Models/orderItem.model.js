const mongoose=require('mongoose');
//const ingredients = require('./ingredients.model');
const orderItemSchema=new mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food',
    },
    quantity:Number,
    totalprice:Number,
    ingredients:[String],
});
const orderItem=mongoose.model('orderItem',orderItemSchema);
module.exports=orderItem;