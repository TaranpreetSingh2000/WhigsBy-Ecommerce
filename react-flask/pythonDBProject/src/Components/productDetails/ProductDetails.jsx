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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../_context/CartContext";
import CategoryProducts from "./CategoryProducts";
import { IoHeartSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeartCircleCheck } from "react-icons/fa6";
import StarRating from "../ratings/StarRating";

const ProductDetails = () => {
  const pathname = window.location.pathname;
  const { productId } = useParams();
  const fetchCart = useCart();
  const fetchWishlist = useWishlist();
  const [filterdata, setFilterData] = useState({});
  const [showCards, setShowCards] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState("");
  const email = localStorage.getItem("Email");
  const WishlistItems = JSON.parse(localStorage.getItem("Wishlist"));
  const CartItems = JSON.parse(localStorage.getItem("CartItems"));
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
    let isWishlistItem = false;
    let isCartItem = false;

    if (WishlistItems.some((item) => item.products.id === Number(productId))) {
      isWishlistItem = true;
    }

    if (CartItems.some((item) => item.products.id === Number(productId))) {
      isCartItem = true;
    }

    setIsAddedToWishlist(isWishlistItem);
    setIsAddedToCart(isCartItem);

    if (isWishlistItem && isCartItem) {
      setIsAddedToWishlist(true);
      setIsAddedToCart(true);
    }
  }, [CartItems, WishlistItems, productId]);

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
    setIsAddedToCart(true);
  };

  const onAddToWhishlistClick = () => {
    fetchWishlist(data, {
      productData: filterdata?.data?.data,
    });
    setIsAddedToWishlist(true);
  };

  return (
    <>
      <div className="pt-4 px-6">
        <Breadcrumb pathname={pathname} />
        <div className="flex justify-center p-4 mb-6 max-[500px]:flex-col">
          <div className="w-1/2 flex flex-col items-center justify-center gap-5 max-[500px]:w-full">
            <div className=" hover:translate-y-[-9px] transition-all duration-500 ease-in-out">
              <img
                src={`${filterdata?.data?.data?.attributes?.image.data[0].attributes.url}`}
                alt={filterdata?.data?.data?.attributes?.title}
                style={{ mixBlendMode: "darken" }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col pt-5 max-[500px]:w-full">
            <h2 className="text-3xl font-semibold mb-2 max-[500px]:text-xl">
              {filterdata?.data?.data?.attributes?.title}
            </h2>

            <div className="flex items-baseline gap-3">
              <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold mb-2 text-sm">
                {filterdata?.data?.data?.attributes?.offer}
              </button>

              <span className=" bg-green-600 text-white px-2 py-1 text-sm rounded-tl-lg">
                Instant Delivery
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-red-500 mb-2 text-2xl">
                {filterdata?.data?.data?.attributes.discount}% off
              </span>
              <p className="text-black mb-2 text-3xl">
                <sup className="text-xl mt-[20px] leading-0">₹</sup>
                {filterdata?.data?.data?.attributes.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 mb-2 text-md font-serif">
                M.R.P: ₹
                <span className="line-through">
                  {filterdata?.data?.data?.attributes?.mrp}
                </span>
              </span>
            </div>

            <div className="flex gap-1">
              <StarRating rating={filterdata?.data?.data?.attributes?.rating} />
            </div>
            <p className="text-gray-600 mb-4 text-md">
              {filterdata?.data?.data?.attributes?.category}
            </p>

            <div className="flex items-center">
              {isAddedToCart ? (
                <button
                  className="bg-white  text-md text-blue-700 border border-blue-600 px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  disabled
                >
                  <span>
                    <BsCartCheckFill className="text-xl max-[430px]:text-sm" />
                  </span>
                  Added to Cart
                </button>
              ) : (
                <button
                  className="bg-blue-600  text-md text-white px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  onClick={onAddToCartClick}
                >
                  <span>
                    <BsCart2 className="text-xl max-[430px]:text-sm" />
                  </span>
                  Add to Cart
                </button>
              )}

              {isAddedToWishlist ? (
                <button
                  className="bg-white  text-md text-blue-700 border border-blue-600 px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9] max-[430px]:text-sm max-[430px]:px-2"
                  disabled
                >
                  <span>
                    <FaHeartCircleCheck className=" text-xl max-[430px]:text-sm" />
                  </span>
                  Added to Wishlist
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
