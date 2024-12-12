import React, { useEffect } from "react";
import ProductCommonLayout from "../../CommonCoponents/ProductCommonLayout";
import ProductCard from "../../CommonCoponents/ProductCard";
import { useGetAllFlashSaleQuery } from "../../../Features/Api/exclusiveApi";
const FlashSale = () => {
  const { data, error, isLoading } = useGetAllFlashSaleQuery();
  const timedate = parseInt(data?.data[0]?.timeOffer?.offerDate);

  const flashSaleProduct = data?.data?.map((item) => {
    return item.productId;
  });

  return (
    <div className="container">
      <div className="flex flex-col items-center border-b-[1px] border-b-black_363738 mb-10">
        <ProductCommonLayout
          ProductCard={ProductCard}
          timeStamp={true}
          timeofOffer={timedate || 1}
          isArrowsTrue={true}
          heading="Today's"
          description="Flash Sales"
          partialItemShow={6}
          componentData={flashSaleProduct}
          isLoading={isLoading}
        />
        <div className="pb-20 ">
          <button className="px-[48px] py-4 bg-redDB4444 rounded text-md font-popins font-medium text-white_FFFFFF hover:opacity-75 cursor-pointer ">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
