import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { RotatingLines } from "react-loader-spinner";

const StrapiData = () => {
  const [data, setData] = useState({});
  const [showCards, setShowCards] = useState(false);
  const { response, loading, error } = useFetch(
    "http://localhost:1337/api/products?populate=*"
  );

  useEffect(() => {
    setData(response);
  }, [response]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCards(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading || !showCards) {
    return (
      <div className="flex justify-center p-5">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#00008B"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600">
        <div className="flex flex-col items-center font-serif opacity-[0.9]">
          <p className="text-center">Oh, something went wrong!!</p>
          <div className="text-center">
            <p>
              We couldn't fetch the data due to some technical error. It
              happens, just try again after a couple of minutes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log(data);
  return (
    <div className="container mx-auto px-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer ">
        {data.data &&
          data.data.data.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-xl rounded-lg p-2 hover:translate-y-[-9px] transition-all duration-500 ease-in-out"
            >
              <img
                src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                alt={product.attributes.title}
                className="w-full h-[200px] object-contains rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">
                  {product.attributes.title}
                </h2>
                <p className="text-gray-500 py-0.5">
                  ₹{product.attributes.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 0 1 .784.385l2.647 3.414 4.093.595a1 1 0 0 1 .554 1.705l-2.96 2.88.7 4.274a1 1 0 0 1-1.451 1.054L10 14.254l-3.67 1.93a1 1 0 0 1-1.45-1.054l.7-4.274-2.96-2.88a1 1 0 0 1 .554-1.705l4.093-.595L9.216 2.385A1 1 0 0 1 10 2z"
                    />
                  </svg>
                  <p className="ml-1 text-gray-500">
                    {product.attributes.rating.toFixed(1)}
                  </p>
                </div>
                <p className="text-gray-500 mt-2">
                  {product.attributes.category}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StrapiData;
