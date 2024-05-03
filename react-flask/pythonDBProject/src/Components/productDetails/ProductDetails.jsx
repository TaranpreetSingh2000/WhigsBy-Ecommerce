import React, { useState, useEffect, useContext } from "react";
import { json, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BallTriangle } from "react-loader-spinner";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {
  addtoCart,
  getProductsByCategories,
  addtoWhistlist,
} from "../../../_utils/GlobalApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../_context/CartContext";
import CategoryProducts from "./CategoryProducts";
import { IoHeartSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";

const ProductDetails = () => {
  debugger;
  const pathname = window.location.pathname;
  const { productId } = useParams();
  const fetchCart = useCart();
  const [filterdata, setFilterData] = useState({});
  const { cart, setCart, wishlist, setWistlist } = useContext(CartContext);
  const [showCards, setShowCards] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState("");
  const email = localStorage.getItem("Email");
  const WishlistItems = JSON.parse(localStorage.getItem("Wishlist"));
  const { response, loading, error } = useFetch(
    `https://whigsby-live-server.onrender.com/api/products/${productId}?populate=*`
  );

  const getCateogoryProducts = (category) => {
    getProductsByCategories(category).then((res) => {
      window.scrollTo(0, 0);
      setCategoryDetails(res);
    });
  };

  useEffect(() => {
    if (WishlistItems.some((item) => item.products.id === Number(productId))) {
      setIsAddedToWishlist(true);
    } else {
      setIsAddedToWishlist(false);
    }
  }, []);

  useEffect(() => {
    setFilterData(response);
    getCateogoryProducts(response?.data?.data?.attributes?.category);
  }, [response]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      setShowCards(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading || !showCards) {
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
  } else if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600 my-6 ">
        <div className="flex flex-col items-center font-serif opacity-[0.9]">
          <p className="text-center">Oh, something went wrong!!</p>
          <p>
            We couldn't fetch the data due to some technical error. It happens,
            just try again after a couple of minutes.
          </p>
        </div>
      </div>
    );
  }

  const data = {
    data: {
      email: email,
      products: filterdata?.data?.data?.id,
    },
  };

  const onAddToCartClick = () => {
    fetchCart(data, {
      productData: filterdata?.data?.data,
    });
  };

  const onAddToWhishlistClick = () => {
    addtoWhistlist(data).then((res) => {
      if (res) {
        setIsAddedToWishlist(true);
        setWistlist((whishlist) => [
          ...whishlist,
          {
            id: res?.data?.data?.id,
            products: filterdata?.data?.data,
          },
        ]);
      }
      toast.success("Product Added to Whishlist ", {
        containerId: "cartContainer",
      });
    });
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="pt-4 px-6">
        <Breadcrumb pathname={pathname} />
        <div className="flex justify-center p-4 mb-6 max-[500px]:flex-col">
          <div className="w-1/2 flex flex-col items-center justify-center gap-5 max-[500px]:w-full">
            <div className=" hover:translate-y-[-9px] transition-all duration-500 ease-in-out">
              <img
                src={`${filterdata?.data?.data?.attributes?.image.data[0].attributes.url}`}
                alt={filterdata?.data?.data?.attributes?.title}
                className="h-[100%]"
                style={{ mixBlendMode: "darken" }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col pt-5 max-[500px]:w-full">
            <h2 className="text-3xl font-semibold mb-2 max-[500px]:text-xl">
              {filterdata?.data?.data?.attributes?.title}
            </h2>

            <div className="w-[130px]">
              <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold mb-2 text-sm">
                {filterdata?.data?.data?.attributes?.offer}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-red-500 mb-2 text-2xl">
                {(
                  (filterdata?.data?.data?.attributes?.mrp -
                    filterdata?.data?.data?.attributes?.price) /
                  filterdata?.data?.data?.attributes?.mrp
                ).toFixed(1) * 100}
                %
              </span>
              <p className="text-black mb-2 text-3xl">
                <sup className="text-xl mt-[20px] leading-0">₹</sup>
                {filterdata?.data?.data?.attributes?.price.toFixed(0)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 mb-2 text-md font-serif">
                M.R.P: ₹{" "}
                <span className="line-through">
                  {filterdata?.data?.data?.attributes?.mrp}
                </span>
              </span>
            </div>

            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 0 1 .784.385l2.647 3.414 4.093.595a1 1 0 0 1 .554 1.705l-2.96 2.88.7 4.274a1 1 0 0 1-1.451 1.054L10 14.254l-3.67 1.93a1 1 0 0 1-1.45-1.054l.7-4.274-2.96-2.88a1 1 0 0 1 .554-1.705l4.093-.595L9.216 2.385A1 1 0 0 1 10 2z"
                />
              </svg>
              <p className="text-gray-600 mb-2 text-lg">
                {filterdata?.data?.data?.attributes?.rating.toFixed(1)}
              </p>
            </div>
            <p className="text-gray-600 mb-4 text-md">
              {filterdata?.data?.data?.attributes?.category}
            </p>

            <div className="flex items-center">
              <button
                className="bg-blue-600  text-md text-white px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                onClick={onAddToCartClick}
              >
                <span>
                  <BsCart2 className="text-xl max-[430px]:text-sm" />
                </span>
                Add to Cart
              </button>

              {isAddedToWishlist ? (
                <button
                  className="bg-gray-700  text-md text-white px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  onClick={onAddToWhishlistClick}
                  disabled
                >
                  <span>
                    <IoHeartSharp className=" text-xl text-pink-600 max-[430px]:text-sm" />
                  </span>
                  Add to Wishlist
                </button>
              ) : (
                <button
                  className="bg-blue-600  text-md text-white px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  onClick={onAddToWhishlistClick}
                >
                  <span>
                    <AiOutlineHeart className="text-xl max-[430px]:text-sm" />
                  </span>
                  Add to Wishlist
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="categories">
          <CategoryProducts categoryDetails={categoryDetails} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
