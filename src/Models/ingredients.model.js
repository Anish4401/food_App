const mongoose=require("mongoose");
const category = require("./Category.model");
const ingredientsSchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor",
    },
    inStoke:{
        type:Boolean,
        default:true,
    }

});
const ingredients=mongoose.model("ingredients",ingredientsSchema);
module.exports=ingredients;