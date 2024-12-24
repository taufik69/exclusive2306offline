import { createSlice } from "@reduxjs/toolkit";
import { SuessToast, InfoToast, ErrorToast } from "../../utils/Toast";
import { act } from "react";
const initialState = {
  value: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const searchCartItem = state.value.findIndex((item) => {
        return item._id == action.payload._id;
      });

      if (searchCartItem >= 0) {
        state.value[searchCartItem].cartQuantity += 1;
        InfoToast(`${action.payload.name} Again Add to Cart`);
        localStorage.setItem("cartItem", JSON.stringify(state.value));
      } else {
        state.value.push({ ...action.payload, cartQuantity: 1 });
        SuessToast(`${action.payload.name}  Add to Cart`);
        localStorage.setItem("cartItem", JSON.stringify(state.value));
      }
    },
    removeCart: (state, action) => {
      const findItem = state.value.filter((item) => {
        return item._id !== action.payload._id;
      });
      state.value = findItem;
      ErrorToast(`${action.payload.name} is Remove from the cart`);
      localStorage.setItem("cartItem", JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtoCart, removeCart } = productSlice.actions;

export default productSlice.reducer;
