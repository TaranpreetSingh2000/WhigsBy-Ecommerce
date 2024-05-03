import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const ShopByCategories = ({ category }) => {
  const uniqueCategories = [
    ...new Set(
      category &&
        category.data.map((cat) => cat.attributes.category.toLowerCase())
    ),
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {uniqueCategories.map((category, index) => (
        <Link key={index} to={`/categoryDetails/${category}`}>
          <div
            key={index}
            className="bg-white rounded-lg p-3 flex items-center justify-center border border-blue-950 cursor-pointer"
          >
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm font-medium font-[Arial]  duration-100 ease-in-out uppercase">
                {category}
              </p>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopByCategories;
