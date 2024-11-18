import {useSelector} from "react-redux";
import "./Cart.css";
import {clearCart} from "../../utils/cartSlice";
import { useDispatch } from "react-redux";


const Cart = ()=>{
    const cartItems = useSelector((store)=>store.cart.items);
    //subscribing to the store
    const dispatch = useDispatch();
    const handleClear = ()=>{
      dispatch(clearCart());

    }
   
    return cartItems.length === 0 ? (<><h1 className="cartHeader">Cart</h1><h2 className="cartHeader">Cart is empty, please Do more shopping...</h2></>):(
      <>
      <div className="cartHeader">
          <h1 className="cartHeading">Cart</h1>
          <button className="clearBtn" onClick={handleClear}>Clear Cart</button>
      

      </div>

      <div>
      

        {cartItems.map(itemCard=>(
            
            <div className="cartDetails1">
            
    
                <div className="itemInfo1">
                
                    <h3 className="itemName1">{itemCard.card.info.name}</h3>
                          <p className="itemPrice1">
                            ₹
                            {itemCard.card.info.defaultPrice / 100 ||
                              itemCard.card.info.price / 100}
                          </p>
                          <p className="itemRating1">
                            {typeof itemCard.card.info.ratings.aggregatedRating
                              .rating === "string"
                              ? "⭐" +
                                itemCard.card.info.ratings.aggregatedRating.rating
                              : ""}
                          </p>
                          <p className="itemDescription1">
                            {itemCard.card.info.description}
                          </p>
                </div>
    
                <div className="imageContainer1">
                          <img
                            className="itemImage"
                            alt={itemCard.card.info.name}
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemCard.card.info.imageId}`}
                          />
                      
                          
                </div>
            </div>))}
      </div>
      </>

    )
                          
                          
                        
                
     
    
      
}
export default Cart;


