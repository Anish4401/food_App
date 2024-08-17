const { getUserIdbyToken } = require("../Config/jwtProvider");
const UserService = require("../Services/User.Service");

const authenticate=async(req,res,next)=>{

    //bearer token : here we give keyword at 0th Index space than value of token at 1th Index
    try{
        const token=req.headers.authorization?.splite(" ")[1];
        if(!token){
            return res.status(405).json({message:"You are not authenticated /Or no token provided"});
        }
        //condition for if we have token 
        const userId=getUserIdbyToken(token);
        //from token we are accessing the userId
        const user=UserService.findUserById(userId);
        //from userId we are returning it to user
        req.user=user;

    }catch(error){
       return  res.status(401).send({error:message})
    }
    next();
}