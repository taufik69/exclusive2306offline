import React, { useEffect, useRef } from "react";
import { BsSmartwatch } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
import { FaCameraRetro } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiConsoleController } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import ProductCommonLayout from "../../CommonCoponents/ProductCommonLayout";
import CategoryItem from "../../CommonCoponents/CategoryItem";
import { getCategory } from "../../../Features/AllSlice/categorySlice";
import { useDispatch } from "react-redux";
import { useGetAllCategoryQuery } from "../../../Features/Api/exclusiveApi";
const Category = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllCategoryQuery();
  const isDataDispatched = useRef(false);

  let newArr = [];
  data?.data.map((item) => {
    newArr.push({
      id: item?._id,
      name: item?.title,
      image: <BsSmartwatch />,
    });
  });
  // store category data in redux
  useEffect(() => {
    if (isLoading == false && isDataDispatched.current === false) {
      dispatch(getCategory(data?.data));
      isDataDispatched.current = true;
    }
  }, [isLoading, dispatch, data]);

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
