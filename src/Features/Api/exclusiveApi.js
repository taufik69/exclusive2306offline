import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/" }),
  endpoints: (builder) => ({
    GetCategory: builder.query({
      query: () => `/category`,
    }),
    GetAllCategory: builder.query({
      query: () => `/category`,
    }),
    GetSingleCategory : builder.query({
      query:(id)=> `/singlecategory/${id}`
    }),
    GetAllBanner: builder.query({
      query: () => `/banner`,
    }),
    GetAllFlashSale: builder.query({
      query: () => "/flashSale",
    }),
   
    GetAllBestSelling: builder.query({
      query: () => `/bestSelling`,
    }),
    GetAllProducts: builder.query({
      query: () => `/product`,
    }),

    GetSingleProduct : builder.query({
      query: (id)=> `/product/${id}`
    })
    
  }),
});

export const {
  useGetCategoryQuery,
  useGetAllBannerQuery,
  useGetAllFlashSaleQuery,
  useGetAllCategoryQuery,
  useGetAllBestSellingQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetSingleCategoryQuery,
} = exclusiveApi;
