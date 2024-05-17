import React, { useEffect, useState } from "react";
import StrapiData from "../productDetails/StrapiData";
import FilterProducts from "../filter/FilterProducts";
import { getProductsSearchCategory } from "../../../_utils/GlobalApi";

const ProductsListing = () => {
  const [data, setData] = useState({});
  const [category, setCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div className="flex bg-gray-100 border border-gray-100 max-[700px]:flex-col">
        <div className="bg-white m-2 w-[22%] border-r border-gray-100 min-h-screen max-[800px]:w-full">
          <FilterProducts fetchCategory={(query) => setCategory(query)} />
        </div>

        <div className="bg-white m-2 w-[78%] max-[800px]:w-full">
          {/* <Carousel /> */}
          <StrapiData fetchedQuery={category} />
        </div>
      </div>
    </>
  );
};

export default ProductsListing;
