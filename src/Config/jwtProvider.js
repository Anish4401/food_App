require('dotenv').config()
const jwt=require('jsonwebtoken');
const secret_Key=process.env.secret_Key
//now we generating the web token 
let generateToken=(userId)=>{
    const token=jwt.sign({userId},secret_Key,
        {expiresIn:'50h'}
    )
    return token;
}
//now how we access userId from token
let getUserIdbyToken=(token)=>{
    const decodedToken=jwt.verify(token,secret_Key);
    return decodedToken.userId;
}
module.exports={
    generateToken,
    getUserIdbyToken
}