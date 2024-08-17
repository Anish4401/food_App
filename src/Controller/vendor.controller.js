const vendor = require("../Models/vendor.model");
const vendorService = require("../Services/vendor.Service");

module.exports={
      createVendor:async(req,res)=>{
         try{
            const user=req.user; //for accessing this we need middleware
            const vendor=await vendorService.createVendor(
                req.body,
                user
            );
         }catch(error){
            res.status(400).json({message:error.message});
         }
      },
      async deleteVendorById(){
         try{
            const{id}=req.params;
            const user=req.user;
            await vendorService.deleteVendor(id);
            res.status(200).json({
               message:"Vendor deleted successfully",
               success:true
            })
         }catch(error){
            if(error instanceof Error){
               res.status(400).json({error:error.message});
            }
         }
      },
     async getAllVendor(){
      try{
         const vendors=await vendorService.getAllVendors();
         res.status(200).json(vendors);
         return vendors;
      }catch(error){
         res.status(400).json({message:"Error in fetching vendors"});
      }
      },
      async getVendorById(){
         try{
            const {id}=req.params;
            const vendor=await vendorService.findVendorById(id);
            res.status(200).json(vendor);
            }catch(error){
               res.status(400).json({message:"Error in fetching vendor"});
            }
         },
          addToFav:async(req,res)=>{
            try{
              
               const {id}= req.params;
               const user=req.user
               const vendor=await vendorService.addtoFavrite(id,user)
               res.status(200).json({vendor,message:"Vendor added to favourite"});

            }catch(error){
               if(error instanceof Error){
               res.status(400).json({error:error.message});
            }else{
               res.status(500).json({error:"Internal Server Down"})
            }
         }


     }}
   
   
   

