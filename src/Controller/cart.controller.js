const cartService = require("../Services/cart.Service");
const { addItemToCart } = require("../Services/cart.Service");

module.exports={
    //Adding items to cart
    addItemToCart:async(req,res)=>{
        try{
            const user=req.user;
            const cart=await cartService.addItemToCart(req.body,user._id);
            res.status(200).json({message:"Item added to cart",cart:cart});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
    //Update items to cart
    updateItemInCart:async(req,res)=>{
        try{
            const{cartItemId,quantity}=req.body;
            const cart=await cartService.updateCartItemQuantity(cartItemId,quantity);
        
        res.status(200).json({message:"Item quantity updated",cart:cart});
        }
        catch(error){
            res.status(500).json({message:error.message});
        }
},

//remove items to cart
    removeItemFromCart:async(req,res)=>{
        try{
        const {id}=req.params;
        const user=req.user;
        const cart=await cartService.removeItemFromCart(id,user);
        res.status(200).json({message:"Item removed from cart",cart:cart});

        }catch(error){
        res.status(501).json({message:error.message});
    }
    },
 
    //finding user Cart
    findUserCart:async(req,res)=>{
        try{
            const user=req.user;
            console.log("reqUser",user._id);
            const catr=await cartService.findUserCart(user._id.toString());
            res.status(200).json({message:"User cart found",cart:cart});

            

        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
    //clear cart 
    clearCart:async(req,res)=>{
        try{
            const user=req.user;
            const cart=await cartService.clearCart(user);
            res.status(200).json({message:"Cart cleared",cart:cart});
        }catch(error){
            res.status(500).json({message:error.message});
        }
}}