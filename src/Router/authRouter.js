const express=require('express')
const router=express.Router()
const authController=require('../Controller/authController')
//const vendorController = require('../Controller/vendor.controller')

//decalring the endpoint
router.post('/Signup',authController.register)
router.post('/signin',authController.login)
// router.post("./creation",vendorController.createVendor)






module.exports=router;
