const mongoose=require("mongoose");
const ingredientCategorySchema=new mongoose.Schema({
    name:String,
    vendor:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },
    ingredients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ingredients",
    }]
});

//here i just define the model and exported it. 
module.exports=mongoose.model("ingredientCategory",ingredientCategorySchema);
