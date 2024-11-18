import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
const appStore = configureStore(
    {
        // app reducer--->contain each slice reducer
        reducer:{
            cart:cartReducer,
        
        },
    }
    

)


export default appStore;


/*conifgureStore is a standard method for creating a Redux Store. It uses the low level Redux Core createStore method internally

*/