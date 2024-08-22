const  express=require('express');
const userController = require('../Controller/user.controller');
const router=express.Router();
const authenticate=require("../Middleware/authenticate")

//making endpoints for APi
// router.get('/profile',authenticate,async(req,res)=>{
//    try{
//     const user=await userController.userAccess(req,res);
// //     userController.userAccess(req,res);
//    }
//    catch(error){
//     console.log(error);
    
//     res.status(400).json({message:error.message})
//    }
// });
// const handleProfileRoute = async (req, res) => {
//     try {
//       await userController.userAccess(req, res);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };
  
  //router.get('/profile', authenticate, handleProfileRoute);
//   const UserController=new userController()
  router.get("/profile", authenticate, userController.userAccess);
module.exports=router;


