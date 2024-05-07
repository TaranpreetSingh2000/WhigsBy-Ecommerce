import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../_context/CartContext";
const AdminCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4 overflow-y-auto">
      {cart.length > 0 &&
        cart.map((item, index) => (
          <div
            className="flex leading-7 gap-4 border border-gray-300 m-2 rounded-md p-3 bg-white"
            key={index}
          >
            <img
              src={`${item?.products?.attributes?.image?.data[0]?.attributes?.url}`}
              alt={item?.products?.attributes?.title}
              className="w-1/5"
              style={{ mixBlendMode: "darken" }}
            />
            <div className="ml-4">
              <h1 className="text-xl font-sans">
                {item?.products?.attributes?.title}
              </h1>
              <p className="text-gray-600">
                Category: {item?.products?.attributes?.category}
              </p>
              <p className="text-gray-600">
                Price: ₹{item?.products.attributes.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                Original M.R.P: ₹{item?.products?.attributes.mrp.toFixed(2)}
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
                    {item?.products?.attributes.rating.toFixed(1)}
                  </span>
                </p>
              </div>
              <p className="text-gray-600">
                Discount:
                <span className="text-red-600 mb-2 px-2 text-md font-[sans-serif] tracking-wide">
                  (
                  {(
                    (item?.products?.attributes.mrp -
                      item?.products?.attributes.price) /
                    item?.products?.attributes.mrp
                  ).toFixed(1) * 100}
                  % off)
                </span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminCart;
