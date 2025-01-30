import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/CommonCoponents/BreadCrumb.jsx";
import productOne from "../../../src/assets/cart/p1.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import {
  useGetAllCartQuery,
  useDeleteCartItemMutation,
} from "../../Features/Api/exclusiveApi.js";
import { totalCartItem } from "../../Features/AllSlice/cartSlice.js";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllCartQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(totalCartItem(data)); 
      console.log("data", data);
    }
  }, [data, dispatch]); // Ensure dispatch is in the dependency array
  

  const handleRemove = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      const updatedData = data?.data?.cart.filter((item) => item._id !== itemId);
      dispatch(totalCartItem(updatedData));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="my-20">
      <div className="container">
        <BreadCrumb />
        <div className="flex justify-between shadow-lg rounded mb-10">
          <div className="flex-1 py-6 flex justify-start">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pl-10">
              Product
            </h1>
          </div>
          <div className="flex-1 py-6 flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Price
            </h1>
          </div>
          <div className="flex-1 py-6 flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Quantity
            </h1>
          </div>
          <div className="flex-1 flex justify-end py-6">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pr-10">
              Subtotal
            </h1>
          </div>
        </div>
        <div className="custom_scrollbar w-full h-[500px] overflow-y-scroll">
          {data?.data?.cart?.map((item) => (
            <div className="mb-10" key={item._id}>
              <div className="flex justify-between shadow-lg rounded">
                <div className="flex-1 py-6 flex justify-start">
                  <div className="flex pl-10 items-center gap-x-5 relative">
                    <img
                      src={item.product.image[0]}
                      alt={productOne}
                      className="w-[54px] h-[54px] object-contain"
                    />
                    <span
                      className="w-[20px] h-[20px] rounded-full bg-redDB4444 absolute text-white_FFFFFF flex justify-center items-center top-[-2%] left-[15%] font-semibold cursor-pointer hover:opacity-70"
                      onClick={() => handleRemove(item._id)}
                    >
                      X
                    </span>
                    <h1 className="text-[16px] font-popins font-normal text-text_black000000">
                      {item.product.name}
                    </h1>
                  </div>
                </div>
                <div className="flex-1 py-6 flex justify-center">
                  <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                    ${item.product.price}
                  </h1>
                </div>
                <div className="flex-1 py-6 flex justify-center">
                  <div className="flex items-center justify-center gap-x-3 w-[100px] rounded border border-gray-400">
                    <input
                      type="text"
                      value={item.quantity}
                      className="w-[25px] text-[20px] font-popins font-normal text-text_black000000"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex-1 flex justify-end py-6">
                  <h1 className="text-[20px] font-popins font-normal text-text_black000000 pr-10">
                    ${+item.product.price.replace(/,/g, "") * +item.quantity}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
