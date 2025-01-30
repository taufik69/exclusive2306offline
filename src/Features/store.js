import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./AllSlice/categorySlice";
import productSlice from "./AllSlice/productSlice";
import { getTotal } from "./AllSlice/productSlice";
import { ProductApi } from "./Api/ProductApi";
import { exclusiveApi } from "./Api/exclusiveApi";
import { totalCartItem } from "./AllSlice/cartSlice";
export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    cartItem : totalCartItem,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProductApi.middleware)
      .concat(exclusiveApi.middleware),
});
store.dispatch(getTotal());
