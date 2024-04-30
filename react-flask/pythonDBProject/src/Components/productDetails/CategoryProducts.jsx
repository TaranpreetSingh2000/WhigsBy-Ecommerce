import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const CategoryProducts = ({ categoryDetails }) => {
  return (
    <div className="container mx-auto p-10">
      <h3 className="text-xl font-semibold font-[Arial] mb-4">
        Similar Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categoryDetails?.data?.data &&
          categoryDetails?.data?.data.map((product) => (
            <Link
              key={product.id}
              to={`/productDetails/${product.id}`}
              className="flex justify-center"
            >
              <div className="bg-white border border-gray-300 w-[100%] rounded-lg h-[100%] cursor-pointer">
                <div>
                  <img
                    src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                    alt={product?.attributes?.title}
                    className="rounded-md h-[250px] object-fill w-[100%]"
                    style={{ mixBlendMode: "darken" }}
                  />
                </div>

                <div className="p-3">
                  <h2 className="text-lg text-[#54a0ad] font-semibold min-h-[110px] hover:text-orange-500 hover:underline">
                    {product.attributes.title.slice(0, 100)}...
                  </h2>

                  <div className=" flex gap-3 gap-y-[5px]">
                    <span className="text-white font-[Arial] font-bold bg-red-700 mb-2 text-sm px-2 py-1 tracking-wide">
                      (
                      {(
                        (product?.attributes.mrp - product?.attributes.price) /
                        product?.attributes.mrp
                      ).toFixed(1) * 100}
                      % off)
                    </span>
                    <button className="text-red-700 text-left py-0.5 rounded-[4px] font-bold mb-2 text-sm">
                      {product?.attributes.offer}
                    </button>
                  </div>
                  <p className="text-black mb-2 text-2xl">
                    ₹{product?.attributes.price}
                    <span>
                      <sup className="text-sm px-0.2 font-sans">00</sup>
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 mb-2 text-md">
                      List: ₹
                      <span className="line-through">
                        {product?.attributes.mrp}.00
                      </span>
                    </span>
                  </div>

                  <div className="categorySign flex items-center">
                    <TiTick className="text-yellow-500 text-xl" />
                    <span className="text-sm text-blue-700 font-semibold font-[Amazon Ember]">
                      whigsBy
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
