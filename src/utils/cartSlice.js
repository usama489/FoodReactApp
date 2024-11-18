import {createSlice} from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[]
     
    },
   
    reducers:{
        addItem:(state,action)=>{
            //mutating the state here
            
            state.items.push(action.payload);
        

        },
        removeItem:(state)=>{
            state.items.pop();
        },
        clearCart:(state)=>{
            state.items.length = 0;
        }
    }
}
)
export const {addItem,removeItem,clearCart} = cartSlice.actions;
// IN APP STORE reducer wehich contain all slice reducer and in cartSlice reducers bcoz have multiple reducer
// and here we are exporting reducer of AppStore which contains all reducer
export default cartSlice.reducer;

