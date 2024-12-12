import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/" }),
  endpoints: (builder) => ({
    GetCategory: builder.query({
      query: () => `/category`,
    }),
    GetAllBanner: builder.query({
      query: () => `/banner`,
    }),
    GetAllFlashSale: builder.query({
      query: () => "/flashSale",
    }),
    GetAllCategory: builder.query({
      query: () => `/category`,
    }),
    GetAllBestSelling: builder.query({
      query: () => `/bestSelling`,
    }),
    GetAllProducts: builder.query({
      query: () => `/product`,
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetAllBannerQuery,
  useGetAllFlashSaleQuery,
  useGetAllCategoryQuery,
  useGetAllBestSellingQuery,
  useGetAllProductsQuery,
} = exclusiveApi;
