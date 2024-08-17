const { register } = require("../Controller/authController");
const vendor=require("../Models/vendor.model");

module.exports={
   async createVendor(req,user){
    try{
        //below here we are callling all the datails of user
        const address=new address({
        city:req.address.city,
        state:req.address.state,
         country:req.address.country,
         zip:req.address.zip,
         street:req.address.street,
         name:req.address.name
        })

        const savedAddress=await address.save();
        const vendor=new vendor({
            address:savedAddress,
            name:req.vendor.name,
            email:req.vendor.email,
            phone:req.vendor.phone,
            cuisineType:req.vendor.cuisineType,
            description:req.vendor.description,
            images:req.images,
            name:req.name,
            openingHours:req.openingHours,
            registrationDate:req.registrationDate,
            owner:user

        })
        const savedVendor=await vendor.save();
        return savedVendor;
    }catch(error){
        console.log(error.message);

    }
   },
//Find the vendor by id
async findVendorById(vendorId){
    try{
        const vendor=await vendor.findById(vendorId);
        if(!vendor)throw new Error("vendor not found");
        return vendor;
    }
    catch(error){
        console.log(error.message);
    }

},
//delete vendor
async deleteVendor(vendorId){
    try{
      this.findVendorById(vendorId);
      //so above will help to find the vendor if not then return errror.
        const vendor=await vendor.deleteById(vendorId);
        return vendor;

    }catch(error){
        console.log(error.message);
    }},
//Get all the vendors
async getAllVendors(){
    try{
        const vendors=await vendor.find();
        return vendors;
    }
    catch(error){
        console.log(error.message);
    }},

//get vendor by userId
async getVendorByUserId(userId){
    try{
        const vendor=await vendor.findOne({owner:userid})
        .populate("owner").populate('address');
        if(!vendor){
            throw new Error("vendor not found");
        }
        return vendor;
    }catch(error){
        console.log(error.message);
    }
},
//Searching vendorby Any keyword so here we use regex
async searchVendor(keyword){
    try{
        const vendor=await vendor.find({
            //here below i am searching for any single condtion to be true than return result
            $or:[{
                name:{$regex:keyword,$options:'i'},
                description:{$regex:keyword,$options:"i"},
                cuisineType:{$regex:keyword,$options:"i"},
            }]
        })
       return vendor;
    }catch(error){
        console.log(error.message);
    }
},
//Add favoriteItem
async addtoFavrite(vendorId,user){
    try{
        const vendor=this.findVendorById(vendorId);
        const favto={
            _id:vendor._id,
            title:vendor.name,
            description:vendor.description,
            images:vendor.images,
        }
   //now we check & add the items into favroite
   const fav=user.fav || [];
   const index=fav.findIndex(fav=>fav._id===vendorId);
   if(index!==-1){    //if it not present then add
    fav.splice(index,1);}
    else{     // if thier than push it & response to the call
   
    fav.push(favto);
     
   }
   user.fav=fav;
   await user.save();
   return favto;
    }catch(error){
        console.log(error.message);
    }

},
//update vendorStatus
async updateVendorStatus(id){
    try{
        const vendor=await vendor.findById(id)
        .populate("owner").populate("address");
        if(!vendor){
            return {message:"Vendor not found"};
        }

        vendor.open=!vendor.open;//so here it will update that if open than close vice-verssa
        await vendor.save();
        return vendor;
    }
    catch(err){
        console.log(err.message);
        
    }},






}