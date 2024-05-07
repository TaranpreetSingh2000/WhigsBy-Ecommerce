import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../../_utils/GlobalApi";
import { ClipLoader } from "react-spinners";

const ManageProducts = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex mx-auto justify-center my-auto">
        <ClipLoader color="#36d7b7" size={120} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600">
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
  return (
    <div className="container mx-auto p-4 overflow-y-auto">
      {data.data ? (
        data.data.data.map((product, index) => (
          <div
            className="flex leading-7 gap-4 border border-gray-300 m-2 rounded-md p-3 bg-white"
            key={index}
          >
            <img
              src={`${product.attributes.image.data[0].attributes.url}`}
              alt={product?.attributes?.title}
              className="w-1/5"
              style={{ mixBlendMode: "darken" }}
            />
            <div className="ml-4">
              <h1 className="text-xl font-sans">
                {product?.attributes?.title}
              </h1>
              <p className="text-gray-600">
                Category: {product?.attributes?.category}
              </p>
              <p className="text-gray-600">
                Price: ₹{product.attributes.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                Original M.R.P: ₹{product.attributes.mrp.toFixed(2)}
              </p>
              <div className="flex items-center">
                <p className="text-gray-600 flex items-center">
                  Rating:
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
                  <span className=" text-gray-500">
                    {product.attributes.rating.toFixed(1)}
                  </span>
                </p>
              </div>
              <p className="text-gray-600">
                Discount:
                <span className="text-red-600 mb-2 px-2 text-md font-[sans-serif] tracking-wide">
                  (
                  {(
                    (product?.attributes.mrp - product?.attributes.price) /
                    product?.attributes.mrp
                  ).toFixed(1) * 100}
                  % off)
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <img
          src="https://cdn.igp.com/raw/upload/assets/images/no_product_5.png"
          alt="No products Found"
        />
      )}
    </div>
  );
};

export default ManageProducts;
