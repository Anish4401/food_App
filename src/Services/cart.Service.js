const cart = require("../Models/cart.model");
const { populate } = require("../Models/User.model");
const cartItem=require("../Models/cartItem.model")
module.exports={
    //creating cart
    async createCart(user){
        const cart = new cart({customer:user});
        await cart.save();
        return cart;
    },
    //getting cartbyUserId
    async getCartByUserId(userId){
        let cart;
        cart=await cart.findOne({customer:userId}).populate([
            {
                path:"items",
                populate:{
                    path:"food",
                    populate:{path:"vendor",select:"_id"},
            },}
        ]);
        if(!cart){
            throw new Error("cart not found-",userId)
        }
         let cartItems=await cartItem.find({cart:cart._id}).populate("food");
         console.log("cartIems",cartItems);
         //calculating the cartValues

         let totalPrice=0;
         let totalDiscountPrice=0;
         let totalQuantity=0;
         cartItems.forEach((item) => {
            totalPrice += item.food.price * item.quantity;
           totalDiscountPrice += item.food.price * item.quantity * item.food.discount;
           totalQuantity += item.quantity;
         })
         cart.discount=totalPrice-totalDiscountPrice;
         return {cart, totalPrice, totalDiscountPrice, totalQuantity};
        },
        //adding ItemsToCart
        async addItemToCart(req,userId){
            const cart=await cart.findOne({customer:userId});
            const food=await food.findById({req:menuItemId});
            const isPresent=await cartItem.findOne({
                cart:cart._id,
                food:food._id,
                userId,
                //if present then alright!
            })
            if(!isPresent){
                //not present so we need to add this field
                const cartItem=new cartItem({
                    cart:cart._id,
                    food:food._id,
                    quantity:1,
                    userId,
                    totalPrice:food.price
                });
                const createCartItem=await cartItem.save();
                cart.items.push(createCartItem);
                await cart.save();
                return createCartItem;
              
        }
        return isPresent;},
         //Update CartItem Quantity
         async updateCartItemQuantity(cartItemId,quantity){
            const cartItem=await cartItem.findById(cartItemId).populate([
                {
                    path:"food",populate:{
                        path:"vendor",select:"_id"
                    }
                }
            ]);
            if(!cartItem){
                throw new Error(`Cart Item Not Found${cartItemId}`);
            }
            //below first update the quantity & then update the totalPrice
            cartItem.quantity=quantity;
            cartItem.totalPrice=quantity*cartItem.food.price;
            await cartItem.save()
            return cartItem;
        },
        //remove Items from cart
        async removeitemFromCart(cartItemId,user){
            cart.items=cart.items.filter((item)=>!item.equals(cartItemId));
            await cart.save()
            return cart;

        },
        //clearing cart
        async clearCart(user){
            cart.items= [];
            await cart.save()
            return cart;
        },
        //calculate cart Total
        async calculateCartTotal(cart){
            let total=0;
            cart.items.forEach((item)=>{

                total+=cartItem.food.price*cartItem.quantity;})
                return total;
            }


  


}