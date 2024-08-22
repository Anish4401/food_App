const express=require('express');
const vendorController=require("../Controller/vendor.controller")
const router=express.Router();
router.get('/',vendorController.getAllVendor);
router.get('/name',vendorController.findVendorByName);
router.get("/:id",vendorController.getVendorById);
router.get("/:id/add-fav",vendorController.addToFav);
module.exports=router;