const mongoose =require("mongoose");
const vendor = require("./vendor.model");
const orderSchema=new mongoose.Schema({
    customer:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    vendor:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"vendor"
    },
    totalAmount:Number,
    orderStatus:String,
    createdAt:
    {
        type:Date,
        default:Date.now
    },
    deliveryAdd:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
    },
    // paymentMethod:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"payment"
    // },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItem",
    }],
    totalItem:Number,
    totalPrice:Number,


});
//definig & exporting
const order=mongoose.model("order",orderSchema);
module.exports=order;