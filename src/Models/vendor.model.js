const {mongoose}=require('mongoose');
const VendorSchema=new mongoose.model({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phno:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    cuisineType:String,
    description:String,
    
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",

    },
    favorites:{
       name:String,
       description:String,
       Image:[]
    },
    numRating:Number,
        image:[String],
        registrationDate:{
            type:Date,
            default:Date.now
        },
        open:Boolean,
        Food:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Food"
        },
    
    address:{
        //here we wll be using forign key..
        type:mongoose.Schema.Types.ObjectId,
        ref:"address",

    }

})

const vendor=mongoose.model("vendor" ,VendorSchema);
module.exports=vendor;