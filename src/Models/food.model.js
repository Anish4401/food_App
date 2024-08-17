const mongoose=require("mongoose");
const foodSchema=new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String,
    quantity:Number,
    foodcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
    },
    available:Boolean,
    vendor:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor",
    },
    isVegan:Boolean,
    isNonVeg:Boolean,
    isSeasonal:Boolean,
    ingredients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ingredients",
    }],
    creationDate:{
        type:Date,
        default:Date.now
    }

});
//define and exports the food model
const food=mongoose.model("food",foodSchema);
module.exports=food;