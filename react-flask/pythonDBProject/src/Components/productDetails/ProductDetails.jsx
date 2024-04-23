import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BallTriangle } from "react-loader-spinner";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { addtoCart } from "../../../_utils/GlobalApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../_context/CartContext";

const ProductDetails = () => {
  const pathname = window.location.pathname;
  const { productId } = useParams();
  let [filterdata, setFilterData] = useState({});
  const { cart, setCart } = useContext(CartContext);
  const [showCards, setShowCards] = useState(false);
  const { response, loading, error } = useFetch(
    `http://localhost:1337/api/products/${productId}?populate=*`
  );

  const email = localStorage.getItem("Email");
  useEffect(() => {
    setFilterData(response);
  }, [response]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCards(true);
      window.scrollTo(0, 0);
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
      products: filterdata.data.data.id,
    },
  };

  const onAddToCartClick = () => {
    addtoCart(data).then(
      (res) => {
        console.log(res);
        if (res) {
          setCart((cart) => [
            ...cart,
            {
              id: res?.data?.data?.id,
              products: filterdata?.data?.data,
            },
          ]);
        }
        toast.success("Product Added successfully ", {
          containerId: "cartContainer",
        });
      },
      (error) => {
        toast.warning("Something went wrong", error, {
          containerId: "cartContainer",
        });
      }
    );
  };

  return (
    <>
      <ToastContainer autoClose={1000} containerId="cartContainer" />
      <div className="pt-4 px-7">
        <Breadcrumb pathname={pathname} />
        <div className="flex justify-center p-4  mb-6">
          <div className="w-1/2 flex flex-col items-center justify-center gap-5">
            <div className=" hover:translate-y-[-9px] transition-all duration-500 ease-in-out">
              <img
                src={`http://localhost:1337${filterdata?.data?.data?.attributes.image.data[0].attributes.url}`}
                alt={filterdata.data.data.attributes.title}
                className="h-[100%] w-11/12"
                style={{ mixBlendMode: "darken" }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col pt-5">
            <h2 className="text-3xl font-semibold mb-2">
              {filterdata?.data?.data?.attributes.title}
            </h2>

            <div className="w-[130px]">
              <button className="text-white bg-red-700 text-left px-2 py-0.5 rounded-[4px] font-semibold mb-2 text-sm">
                {filterdata?.data?.data?.attributes.offer}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-red-500 mb-2 text-2xl">
                {filterdata?.data?.data?.attributes.discount}%
              </span>
              <p className="text-black mb-2 text-3xl">
                <sup className="text-xl mt-[20px] leading-0">₹</sup>
                {filterdata?.data?.data?.attributes.price.toFixed(0)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 mb-2 text-md font-serif">
                M.R.P: ₹{" "}
                <span className="line-through">
                  {filterdata?.data?.data?.attributes.mrp}
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
                {filterdata?.data?.data?.attributes.rating.toFixed(1)}
              </p>
            </div>
            <p className="text-gray-600 mb-4 text-md">
              {filterdata?.data?.data?.attributes.category}
            </p>

            <div className="flex items-center">
              <button
                className="bg-blue-600  text-md text-white px-5 py-2 mr-2 rounded-md flex items-center gap-2 hover:opacity-[0.9]"
                onClick={onAddToCartClick}
              >
                <span>
                  <BsCart2 className="text-xl" />
                </span>
                Add to Cart
              </button>
              <button className="bg-blue-600  text-md text-white px-5 py-2 rounded-md flex justify-center items-center gap-2 hover:opacity-[0.9]">
                <span>
                  <AiOutlineHeart className="text-xl" />
                </span>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
