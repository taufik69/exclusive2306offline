import React, { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import image from "../../assets/products/p1.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import useCalculateDiscount from "../../hooks/useCalculateDiscount";
import Star from "./Star";
import { ErrorToast, SuessToast } from "../../utils/Toast";
import { useAddtoCartMutation } from "../../Features/Api/exclusiveApi";
const ProductCard = ({ itemData }) => {
 
  const [quantity, setquantity] = useState(1);
  const [ AddtoCart, {isLoading , isError , data}] = useAddtoCartMutation()

  const handleAddtoCart = async (productItem) => {
    try {
  
      const response = await AddtoCart({
        product: productItem._id,
        quantity: quantity,
      });
      if (response) {
        SuessToast("Add to Cart Sucessfully");
      }
    
    } catch (error) {
      ErrorToast("Error form Addto Cart");
      console.error("error from add to cart", error);
    } finally {
      setquantity(1);
    }
  };

  return (
    <div className="mt-10">
      <div className="w-full">
        <div className="bg-white_F5F5F5 pb-[55px] px-3 pt-4 rounded relative group cursor-pointer">
          <div className="flex items-center justify-between">
            {itemData?.discountPrice && (
              <span className="px-3 py-2 rounded bg-redDB4444 inline-block font-popins text-sm text-white_FFFFFF font-normal">
                - {itemData ? itemData?.discountPrice : 0} Tk
              </span>
            )}
            <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white_FFFFFF cursor-pointer hover:bg-redDB4444 hover:text-white_FFFFFF  text-xl">
              <IoHeartOutline />
            </span>
          </div>
          <div className="flex justify-between cursor-pointer">
            <Link to={`/productdetails/${itemData._id}`}>
              <div className="w-[172] h-[152px] flex-1 ">
                <img
                  src={itemData ? itemData?.image[0] : image}
                  alt={image}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
            <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white_FFFFFF cursor-pointer hover:bg-redDB4444 hover:text-white_FFFFFF  text-xl mt-2">
              <MdOutlineRemoveRedEye />
            </span>
          </div>
          <div
            className="opacity-0 absolute left-0 bottom-0 font-popins font-medium text-lg cursor-pointer  flex justify-center items-center w-full h-12 bg-text_black000000 text-white_FFFFFF group-hover:opacity-100"
            onClick={() => handleAddtoCart(itemData)}
          >
            <h3>{isLoading? "loading .." :'Add To Cart'} </h3>
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-2 mt-4">
          <h2 className="text-lg font-popins font-medium cursor-pointer w-full truncate ">
            {itemData ? itemData.name : "HAVIT HV-G92 Gamepad"}
          </h2>
          <div className="flex items-center gap-x-3 cursor-pointer">
            <span className="text-redDB4444 font-medium text-lg font-popins inline-block">
              $
              {/* {useCalculateDiscount(
                itemData?.price,
                itemData?.discountPercentage
              )?.toFixed(2)} */}
              {parseFloat(itemData.price.replace(/,/g, "")) -
                parseFloat(itemData.discountPrice.replace(/,/g, ""))}
            </span>
            <span className="text-text_black000000 opacity-50 font-medium text-lg font-popins inline-block line-through">
              $
              {itemData
                ? parseFloat(itemData.price.replace(/,/g, ""))?.toFixed(2)
                : 0}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-x-1 cursor-pointer">
              <Star rating={itemData && itemData.rating} />

              <h3 className="text-text_black000000 opacity-50 font-medium text-lg font-popins ">{`(${itemData.rating})`}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
