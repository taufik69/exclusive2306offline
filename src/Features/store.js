import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./AllSlice/categorySlice";
import { ProductApi } from "./Api/ProductApi";
import { exclusiveApi } from "./Api/exclusiveApi";
export const store = configureStore({
  reducer: {
    category: categorySlice,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProductApi.middleware)
      .concat(exclusiveApi.middleware),
});
