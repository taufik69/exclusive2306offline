import React from "react";
import ProductCommonLayout from "../../CommonCoponents/ProductCommonLayout";
import ProductCard from "../../CommonCoponents/ProductCard";
import { useGetAllBestSellingQuery } from "../../../Features/Api/exclusiveApi";
const BestSellilng = () => {
  const { data, error, isLoading } = useGetAllBestSellingQuery();
  const bestSelinngitem = data?.data?.map((bestSelinng) => {
    return bestSelinng.product;
  });

  return (
    <div className="container border-t-[1.5px] border-gray-300">
      <ProductCommonLayout
        heading="This Month's"
        description="Best Selling Products"
        ProductCard={ProductCard}
        partialItemShow={6}
        componentData={bestSelinngitem}
        isLoading={isLoading}
        viewButton={true}
      />
    </div>
  );
};

export default BestSellilng;
