import React, { useState, useEffect } from "react";
import { getCategories } from "../../../_utils/GlobalApi";
import { RxCross1 } from "react-icons/rx";

const FilterProducts = ({ fetchCategory }) => {
  const [data, setData] = useState({});
  const [checkedQuery, setCheckedQuery] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
      setData(res);
    });
  }, []);

  const handleQuery = (query) => {
    fetchCategory(query);
    setCheckedQuery((prevQueries) => {
      if (!prevQueries.includes(query)) {
        return [...prevQueries, query];
      }
      return prevQueries;
    });
  };

  const handleRemoveFilter = (item) => {
    debugger;
    const newFilters = checkedQuery.filter((q) => q !== item);
    setCheckedQuery(newFilters);
  };

  const handleClearAll = () => {
    setCheckedQuery([]);
  };
  return (
    <div className=" p-4">
      <div className="filters flex justify-between items-center mb-4">
        <h2 className="text-lg font-[Arial]">Filters</h2>
        <span
          className="text-sm text-blue-500 font-sans cursor-pointer font-semibold uppercase hover:underline"
          onClick={handleClearAll}
        >
          Clear all
        </span>
      </div>

      {checkedQuery.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {checkedQuery.map((item, index) => (
            <div className="checkedFilter my-1">
              <ul
                className="bg-gray-200 px-2 text-sm rounded-md flex items-center py-1 gap-2"
                key={index}
              >
                <li className="text-sm">{item}</li>
                <RxCross1
                  className="cursor-pointer text-xs hover:text-gray-800"
                  onClick={() => handleRemoveFilter(item)}
                />
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-md mb-2">Categories</h3>
        {data.data &&
          data.data.data.map((item, index) => (
            <div className="flex gap-2 leading-8" key={index}>
              <input
                type="radio"
                className="border border-gray-300 "
                name="filterCheck"
                id=""
                onChange={() => handleQuery(item?.attributes?.Name)}
              />
              <span className="text-md text-gray-600">
                {item?.attributes?.Name[0].toUpperCase() +
                  item?.attributes?.Name.slice(1)}
              </span>
            </div>
          ))}
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Price</h3>
        {/* Add your price filter options here */}
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">By Rating</h3>
        {/* Add your rating filter options here */}
      </div>
    </div>
  );
};

export default FilterProducts;
