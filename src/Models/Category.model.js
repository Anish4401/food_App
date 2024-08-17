const { default: mongoose } = require("mongoose")

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    vendor:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    }
});
const category=mongoose.model("category",categorySchema);
module.exports=category;