import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : null,
};

export const counterSlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getCategory: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("category", JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCategory } = counterSlice.actions;

export default counterSlice.reducer;
