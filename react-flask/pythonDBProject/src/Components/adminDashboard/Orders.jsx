import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import { TiTick } from "react-icons/ti";

const Orders = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container p-4 overflow-y-auto">
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div
            className="flex leading-7 gap-4 border border-gray-300 m-2 rounded-md p-4 px-auto bg-white"
            key={index}
          >
            <div className="flex gap-10">
              <img
                src={`${item?.products?.attributes?.image?.data[0]?.attributes?.url}`}
                alt={item?.products?.attributes?.title}
                className="w-20 h-20"
                style={{ mixBlendMode: "darken" }}
              />
              <div className="ml-4">
                <h1 className="text-md font-semibold">
                  {item?.products?.attributes?.title.slice(0, 70)}
                </h1>

                <span className="text-white mb-2 py-0.5 px-3 text-sm font-bold bg-[#8c1111]">
                  {(
                    (item?.products?.attributes?.mrp -
                      item?.products?.attributes?.price) /
                    item?.products?.attributes?.mrp
                  ).toFixed(1) * 100}
                  % off
                </span>
                <button className="text-red-600 text-left px-2 py-0.5 rounded-[4px] font-bold mb-2 text-sm">
                  {item?.products?.attributes?.offer}
                </button>

                <div className="flex items-baseline gap-2">
                  <p className="text-red-600 text-lg py-0.5">
                    ₹{item?.products?.attributes?.price}
                    <sup className="font-semibold">00</sup>
                  </p>
                  <span className="text-gray-800 mb-2 text-sm">
                    <span className="line-through">
                      {item?.products?.attributes?.mrp.toFixed(2)}
                    </span>
                  </span>

                  <div className="categorySign flex items-center">
                    <TiTick className="text-yellow-500 text-xl" />
                    <span className="text-sm text-blue-700 font-semibold font-[Amazon Ember]">
                      whigsBy
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <button className="text-md text-green-600 font-semibold mb-2 px-2">
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    color="green"
                    style={{ paddingRight: "5px" }}
                  ></i>
                  Order Verified
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700 text-xl mx-auto">
          No orders placed
        </p>
      )}
    </div>
  );
};

export default Orders;
