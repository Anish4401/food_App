const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    custome:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    cartItems:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'cartItem'
    }],
    total:Number
})
const cart=mongoose.model("cart",cartSchema);
module.exports=cart;
