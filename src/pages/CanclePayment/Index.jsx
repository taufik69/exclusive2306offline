import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
const Cancle = () => {
  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <div className=" flex items-center justify-center py-10">
          <MdOutlineCancel className=" text-white rounded-full w-20 h-20 bg-red-500" />
        </div>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Cancle!
          </h3>
          <p class="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div class="py-10 text-center">
            <Link
              to="/product"
              class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancle;
