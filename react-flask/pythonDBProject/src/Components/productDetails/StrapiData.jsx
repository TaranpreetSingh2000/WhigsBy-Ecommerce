import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../_utils/GlobalApi";
import ShopByCategories from "./ShopByCategories";

const StrapiData = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

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
    <>
      <div className="container mx-auto mb-6">
        <h1 className="uppercase my-[40px] text-[1.8em] text-zinc-700 font-medium tracking-[0.3em] tracking-normal-[2.5em] mb-[40px] px-[50px] max-[500px]:px-0 max-[500px]:text-2xl max-[500px]:text-center">
          SHOP BY CATEGORIES
        </h1>

        {data.data ? (
          <ShopByCategories category={data.data} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-[50px] w-[240px] bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
        )}
      </div>
      <div className="container mx-auto mb-6">
        <h1 className="uppercase my-[40px] text-[1.8em] text-zinc-700 font-medium tracking-[0.3em] tracking-normal-[2.5em] mb-[40px] px-[45px] max-[500px]:px-0 max-[500px]:text-2xl max-[500px]:text-center">
          GRAND GLOBAL BRANDS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer p-3">
          {data.data ? (
            data.data.data.map((product) => (
              <Link key={product.id} to={`/productDetails/${product.id}`}>
                <div className="bg-white border border-gray-100 rounded-lg h-[100%] w-[100%] cursor-pointer">
                  <img
                    src={`${product.attributes.image.data[0].attributes.url}`}
                    alt={product?.attributes?.title}
                    className="w-full rounded-md"
                  />

                  <div className="flex flex-col justify-center items-center mt-2 p-2">
                    <p className="text-lg font-semibold">
                      {product?.attributes?.title.split(" ")[0]}
                    </p>
                    <h2 className="text-md font-[Arial] hover:text-orange-500 hover:underline max-[500px]:min-h-0">
                      {product.attributes.title.slice(0, 50)}...
                    </h2>
                  </div>
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
                    <span className="ml-1 text-gray-500">
                      {product.attributes.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-1 p-2 flex items-baseline gap-2">
                    <p className="text-black text-xl py-0.5">
                      ₹{product.attributes.price.toFixed(2)}
                    </p>

                    <span className="text-gray-500 mb-2 text-sm">
                      M.R.P: ₹
                      <span className="line-through">
                        {product?.attributes.mrp}
                      </span>
                    </span>
                    <span className="text-black mb-2 text-md font-[sans-serif] tracking-wide">
                      (
                      {(
                        (product?.attributes.mrp - product?.attributes.price) /
                        product?.attributes.mrp
                      ).toFixed(1) * 100}
                      % off)
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              <div className="bg-white border border-gray-100 rounded-lg h-[100%] w-[290px] cursor-pointer mt-5 p-2">
                <div className="h-[300px] w-[270px] bg-slate-200 animate-pulse rounded-lg"></div>
                <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg h-[100%] w-[290px] cursor-pointer mt-5 p-2">
                <div className="h-[300px] w-[270px] bg-slate-200 animate-pulse rounded-lg"></div>
                <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg h-[100%] w-[290px] cursor-pointer mt-5 p-2">
                <div className="h-[300px] w-[270px] bg-slate-200 animate-pulse rounded-lg"></div>
                <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg h-[100%] w-[290px] cursor-pointer mt-5 p-2">
                <div className="h-[300px] w-[270px] bg-slate-200 animate-pulse rounded-lg"></div>
                <div className="h-[30px] w-[100px] bg-slate-200 animate-pulse flex justify-center mx-auto mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[80px] bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-[30px] w-[260px] bg-slate-200 animate-pulse mt-2"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StrapiData;
