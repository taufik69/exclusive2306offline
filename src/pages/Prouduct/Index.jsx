import React, { useState } from "react";
import ProductLeft from "../../components/ProductPageComponent/ProductLeft";
import { BreadCrumb } from "../../components/CommonCoponents/BreadCrumb";
import ProductRight from "../../components/ProductPageComponent/productRight";
import { useSelector } from "react-redux";
const ProductPage = () => {
  // const { data, error, isLoading } = useGetAllProductCategoryListQuery();
  const category = useSelector((state) => state?.category?.value);
 const [categoryId ,setcategoryId] = useState('')
  // handlecategory 

  const handleCategory = (id)=> {
    setcategoryId(id);
    
  }
  return (
    <div className="container py-20">
      <BreadCrumb />
      <div className="flex justify-between">
        <ProductLeft
          categoryData={category}
          // isLoading={isLoading}
          // error={error}
          handleCategory = {handleCategory}
        />
        <ProductRight  categoryid = {categoryId} />
      </div>
    </div>
  );
};

export default ProductPage;
