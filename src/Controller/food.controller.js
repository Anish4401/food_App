const foodService = require("../Services/food.Service");
const { searchFood } = require("../Services/food.Service");
const vendorService = require("../Services/vendor.Service");

module.exports={
    //customer 
    searchFood:async(req,res)=>{
        try{
            const {name}=req.query;
            const menuItem=await foodService.searchFood(name);
            res.status(201).json(menuItem);
        }catch(error){
            res.status(500).json({message:error.message});
        }

    },
    //getting menuItemBy VendorId
    getMenuItemByVendorId:async(req,res)=>{
        try{
            const {vendorId}=req.params;
            const { 
                vegan,
                nonVeg,
                seasonal,
                foodCategory}=req.query;
            const menuItem=await foodService.getVendorsFood({
                vendorId,
                vegan,
                nonVeg,
                seasonal,
                foodCategory
            });
            res.status(201).json(menuItem);
        }catch(error){
            res.status(500).json({message:error.message});
        }

},
//Admin Controller
//creating Items
async createItem(req,res){
    try{
        const item=req.body;
        const user=req.user;
         const vendor=await vendorService.findVendorById(item.vendorId);
        const menuItem=await vendorService.createFood(item,vendor);
            res.status(200).json(menuItem);
    
    }catch(error){
        res.status(500).json({message:error.message});
    }
},
//delete Items
async deleteItem(req,res){
    try{
        const {id}=req.params;
        const user=req.user;
        await foodService.deleteFood(id);
        res.status(201).json({message:'menu items deleted'});
        }catch(error){
            res.status(500).json({message:error.message});
    }


},
//Update AvailabiltyStatus
async updateAvailabilityStatus(req,res){
    try{
        const {id}=req.params;
        const menuItem=await foodService.updateAvailabilityStatus(id);
        res.status(200).json(menuItem);
        }catch(error){
            res.status(500).json({message:error.message});
    }}}

