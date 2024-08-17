const express=require('express')
const router=express.Router()
const authController=require('../Controller/authController')

//decalring the endpoint
router.post('/Signup',authController.register)
router.post('/signin',authController.login)






module.exports=router;
