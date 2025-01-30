import { createSlice } from "@reduxjs/toolkit";
import { SuessToast, InfoToast, ErrorToast } from "../../utils/Toast";

const initialState = {
  cart:localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []

};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
   totalCartItem :(state , action)=> {
        state.cart = action.payload.data.cart;
        localStorage.setItem("cart", JSON.stringify(action.payload.data.cart));
        console.log("from cartSlice", action.payload.data.cart);
        
   }

  },
});

// Action creators are generated for each case reducer function
export const { totalCartItem} =
cartSlice.actions;

export default cartSlice.reducer;
