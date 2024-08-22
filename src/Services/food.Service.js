const food = require("../Models/food.model");
const food=require("../Models/food.model")

module.exports={
   async createFood(req,vendor){
     try{
        const food=new food({
            foodCategory:req.category,
            foodName:req.name,
            foodPrice:req.price,
            foodDescription:req.description,
            foodImage:req.image,
            vendorId:vendor._id,
            userId:req.user._id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ingrediants:req.ingrediants,
            isVegan:req.vegan,
            isSeasonal:req.seasonal,
            isNonVeg:req.nonVeg,

        })
        await food.save();  //here we save all the above data on food
        vendor.food.push(food._id); // pushed it all on foodId
        await vendor.save();// here saved all changes
     }catch(error){
           console.log(`Failed to create Food,${error.message}`);
     }
   },
   async deleteFood(foodId){
    try{
        const food=await food.findByIdAndDelete(foodId);
        if(!food){
            return {message:"Food not found"};
        }
        return food;
        }catch(error){
            console.log(`Failed to delete Food,${error.message}`)}
    },
    async getVendorsFood({
        vendorId,
        vegan,
        nonVeg,         
        seasonal,
        ingrediants,
        foodCategory
   //above all are the category so customer can filter accordingly
    }){try{
        let query={vendor:vendorId};
        console.log(nonVeg);
        if(vegan){
            query.isVegan=true;
        }
        if(nonVeg=='true')query.vegan=false;
        if(seasonal=='true')query.isSeasonal=true;
        if(foodCategory)query.foodCategory=foodCategory;
        if(ingrediants)query.ingrediants=true;
        const foods=await food.find(query).populate([
            {path:"ingredients",populate:{path:"category",select:"name"}},
            "foodCategory",
            {path:"vendor",select:"name _id"},

    ]);
    return foods;

    }catch(error){
        console.log(`Failed to get Food,${error.message}`)
    }

   
},
async searchFood(keyword){
    try{
        let query={}
        if(keyword){
            query.$or=[{
                name:{$regex:keyword,$options:"i"},
                "foodCategory.name":{$regex:keyword,$options:"i"},

         } ];
        }
        const foods =await food.find(query);   //now after stroing user can search
        return foods;

    }catch(error){
        console.log(`Failed to search Food,${error.message}`)
    }
},
//Update Availabilty
async updateAvailabilityStatus(foodId){
    try{
        const food=await food.findById(foodId).populate([
            {path:"ingredients",populate:{path:"category",select:"name"}},
            "foodCategory",
            {path:"vendor",select:"name _id"},

        ]);
        if(!food){
            throw new Error(`food not found with ID${foodId}`)
        }
        food.isAvailable=!food.isAvailable;    //checking and changing the status of food
        await food.save();
        return food;

}catch(error){
    console.log(`Failed to update availability status,${error.message}`);
}},
//find foodbyID
async findFoodById(foodId){
    try{
        const food=await food.findById(foodId);
        if(!food){
            throw new Error(`food not found with ID${foodId}`)
            }
            return food;
 
    }catch(error){
        console.log(`Failed to find food by ID,${error.message}`);
    }
}}