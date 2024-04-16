import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BallTriangle } from "react-loader-spinner";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = useState({});
  const [showCards, setShowCards] = useState(false);
  const { response, loading, error } = useFetch(
    `http://localhost:1337/api/products/${productId}?populate=*`
  );

  useEffect(() => {
    setData(response);
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

  console.log(data);

  return (
    <div className="flex justify-center p-6 mb-6">
      <div className="w-1/2 flex flex-col items-center justify-center gap-5">
        <div>
          <img
            src={`http://localhost:1337${data.data.data.attributes.image.data[0].attributes.url}`}
            alt={data.data.data.attributes.title}
            className="h-[100%] bg-inherit w-full object-contain"
            style={{ mixBlendMode: "darken" }}
          />
        </div>
        <div className="flex justify-between w-full">
          <button className="bg-yellow-400 uppercase w-full text-lg text-black py-2 mr-2 rounded flex justify-center items-center gap-2">
            <span>
              <BsCart2 className="text-xl" />
            </span>
            Add to Cart
          </button>
          <button className="bg-gray-600 uppercase text-lg w-full text-white py-2 rounded flex justify-center items-center gap-2">
            <span>
              <AiOutlineHeart className="text-xl" />
            </span>
            Add to Wishlist
          </button>
        </div>
      </div>
      <div className="w-1/2 flex flex-col pt-5">
        <h2 className="text-3xl font-bold mb-2">
          {data.data.data.attributes.title}
        </h2>

        <div className="flex items-center gap-1">
          <span className="text-red-500 mb-2 text-2xl">
            {data.data.data.attributes.discount}%
          </span>
          <p className="text-black mb-2 text-3xl">
            <sup className="text-xl mt-[20px] leading-0">₹</sup>
            {data.data.data.attributes.price.toFixed(0)}
          </p>
        </div>

        <div className="flex">
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
          <p className="text-gray-600 mb-2 text-xl">
            {data.data.data.attributes.rating.toFixed(1)}
          </p>
        </div>
        <p className="text-gray-600 mb-4 text-xl">
          {data.data.data.attributes.category}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
