import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategories } from "../../../_utils/GlobalApi";
import { BallTriangle } from "react-loader-spinner";
import { BsCart2 } from "react-icons/bs";
import useCart from "../hooks/useCart";

const ShopCategoriesDetails = () => {
  const fetchCart = useCart();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryname } = useParams();
  const email = localStorage.getItem("Email");

  useEffect(() => {
    debugger;
    setLoading(true);
    getCateogoryProducts(categoryname);
  }, [categoryname]);

  const getCateogoryProducts = (categoryname) => {
    getProductsByCategories(categoryname).then((res) => {
      window.scrollTo(0, 0);
      setCategoryDetails(res.data.data);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] p-5">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#00008B"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  const onAddToCartClick = (id, item) => {
    const data = {
      data: {
        email: email,
        products: id,
      },
    };
    fetchCart(data, {
      // format in for access the data in cart
      productData: item,
    });
  };

  return (
    <>
      {categoryDetails &&
        categoryDetails.map((item, index) => (
          <div className="border p-4 flex m-5" key={index}>
            <div className="flex w-40">
              <img
                src={item?.attributes?.image?.data[0]?.attributes?.url}
                alt={item?.attributes?.title}
                className=" w-full object-contain"
              />
            </div>

            <div className="flex flex-col px-4">
              <h2 className="text-md font-semibold">
                {item?.attributes?.title}
              </h2>
              <div className="w-[130px]">
                <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold mb-2 text-sm">
                  {item?.attributes?.offer}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-500 mb-2 text-2xl">
                  {(
                    (item?.attributes?.mrp - item?.attributes?.price) /
                    item?.attributes?.mrp
                  ).toFixed(1) * 100}
                  %
                </span>
                <p className="text-black mb-2 text-3xl">
                  <sup className="text-xl mt-[20px] leading-0">₹</sup>
                  {item?.attributes?.price.toFixed(0)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 mb-2 text-md font-serif">
                  M.R.P: ₹
                  <span className="line-through">{item?.attributes?.mrp}</span>
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span>
                <BsCart2
                  className="text-2xl cursor-pointer"
                  onClick={() => onAddToCartClick(item?.id, item)}
                />
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShopCategoriesDetails;
