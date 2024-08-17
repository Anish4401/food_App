const mongoose=require("mongoose");
const cartItemSchema=new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
    },
    quantity:Number,
    ingredient:[String],
    totalPrice:Number
});
const cartItem=mongoose.model("cartItem",cartItemSchema);
module.exports=cartItem;