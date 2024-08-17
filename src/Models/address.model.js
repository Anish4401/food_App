const {mongoose}=require("mongoose");

const addressSchema=new mongoose.Schema({
    name:String,
    street:String,
    city:String,
    state:String,
    zip:String,
    country:String

})
const address=mongoose.model("address",addressSchema);
module.exports=address;