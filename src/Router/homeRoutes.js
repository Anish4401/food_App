const {Router} =require('express');
const router=Router();
router.get("",async(req,res)=>{
res.status(200).send({message:"Welcome to Food Delivering App by Anish"});
})
module.exports=router;

