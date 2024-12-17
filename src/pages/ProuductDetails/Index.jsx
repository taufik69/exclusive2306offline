import React from "react";
import { BreadCrumb } from "../../components/CommonCoponents/BreadCrumb";
import ImageGallery from "../../components/CommonCoponents/ProductDetails/ImageGallery";
import { useGetSingleProductQuery } from "../../Features/Api/exclusiveApi";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams()

  const { data, error, isLoading } = useGetSingleProductQuery(params?.id);
  console.log(data?.data);
  

  return (
    <div className="py-20">
      <div className="container">
        <BreadCrumb />

        <div className="grid grid-cols-2 gap-x-5">
          <div className="">
            <ImageGallery image={data?.data?.image} />
          </div>
          <div className="w-full bg-red-400">2</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
