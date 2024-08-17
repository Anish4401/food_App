const { getUserIdbyToken } = require('../Config/jwtProvider');
const user = require('../Models/User.model');
const User=require('../Models/User.model')
const bcrypt = require('bcrypt');
module.exports={
    async createUser(userData){
        try{
            let {name,emailValue,password,role}=userData;
            //basically it check whether the find value type exists or not is user Schema
            console.log(userData);
            let isUserExists=await User.findOne({email:emailValue})
            console.log(isUserExists,"kundan");
         if(isUserExists){
            console.log(" user already created ");
            
            throw new error("user is already exists email");
            
          }
          //here we declaring the password as 10 the length of it more length more secure.
          password= await bcrypt.hash(password,10);

        const user=await User.create({
            name:name,
            email:emailValue,
            password:password,
            role
        })

        return user;
        }catch(err){
           throw new Error(err.message,"anish");
        }
        
    },
    async getUserbyEmail(email){
        try{
           const user =await User.findOne({email:email});
           
           if(!user){
            throw new Error("user not found");
           }
     return user;
        }catch(err){
          throw new Error(err.message);
        }
    },
    async findUserById(userId){
        try{
            const user=await user.findUserById(userId).populate('address');
          //so here we storing address which is present in user in form of object here it is being called .
          //is not a string it is an object so we can access it like user.address
        if(!user){
            throw new Error("user not found->",userId);
        }
        return user;
        
        }
     catch{
        throw new Error(err.message);
     }},
     async findUserProfilebyJwt(jwt){
        try{
     //so we have accessed the userid by token simply we call it here.
     const userId=getUserIdbyToken(jwt);
     const user=await this.findUserById(userId);
     
     return user;
        }
        catch(err){
            throw new Error(err.message);
        }
    },
     async getAllUser(){
        try{
         const users=await  user.find();
         return users;
        }
        catch(err){
            throw new err('err.massage',err);
        }
     }
    }

