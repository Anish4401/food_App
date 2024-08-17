const { default: mongoose } = require('mongoose');

const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:['role_customer','role_owner'],
        default:'role_customer'
    },
    order:{
        type:mongoose.Schema.ObjectId,
        ref:"order",

    },
    favorites:{
       name:String,
       description:String,
       Image:[]
    },
    address:{
        //here we wll be using forign key..
        type:mongoose.Schema.ObjectId,
        ref:"address",

    }

});
const user =mongoose.model("user",UserSchema);
module.exports=user;