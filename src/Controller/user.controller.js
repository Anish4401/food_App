const UserService = require("../Services/User.Service");

module.exports={
    //user access
    userAccess: async(req,res)=>{
        try{
            const user=req.user;

            // const jwt=req.headers.authorization?.split(" ")[1];//here we ask for token
            // const user=await UserService.findUserProfilebyJwt(jwt);
            user.password=null;
            res.status(200).json(user);
        }catch(error){
            res.status(400).json({message:error.message});
        }
    }

}