import React from "react";
import { BsSmartwatch } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
import { FaCameraRetro } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiConsoleController } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import ProductCommonLayout from "../../CommonCoponents/ProductCommonLayout";
import CategoryItem from "../../CommonCoponents/CategoryItem";

import { useGetAllCategoryQuery } from "../../../Features/Api/exclusiveApi";
const Category = () => {
  const { data, isLoading, error } = useGetAllCategoryQuery();

  let newArr = [];
  data?.data.map((item) => {
    newArr.push({
      id: item?._id,
      name: item?.title,
      image: <BsSmartwatch />,
    });
  });

  console.log(newArr);
  return (
    <div>
      <ProductCommonLayout
        heading={"Categories"}
        description={"Browse By Category"}
        isArrowsTrue={true}
        ProductCard={CategoryItem}
        partialItemShow={6}
        componentData={newArr}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Category;
