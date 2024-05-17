import React, { useState, useEffect, useContext } from "react";
import {
  getAllProducts,
  getCategories,
  getProductsPriceFilter,
  getProductsRatingFilter,
} from "../../../_utils/GlobalApi";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import {
  PRICE_RANGE_MIN,
  PRICE_RANGE_MAX,
  RATING_FILTER,
} from "../../../_utils/select.constants";
import { CartContext } from "../../_context/CartContext";

const FilterProducts = ({ fetchCategory }) => {
  const [data, setData] = useState({});
  const [checkedQuery, setCheckedQuery] = useState("");
  const [minPrice, setMinPice] = useState(100);
  const [maxPrice, setMaxPice] = useState(30000);
  const [rating, setRating] = useState(1);
  const { setPriceFilter, setInitialData } = useContext(CartContext);

  useEffect(() => {
    getCategories().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (minPrice && maxPrice) {
      getProductsPriceFilter(minPrice, maxPrice).then((res) => {
        setInitialData("");
        setPriceFilter(res);
      });
    }

    if (rating > 1) {
      setCheckedQuery((prevQueries) => {
        if (!prevQueries.includes(rating)) {
          return [...prevQueries, rating];
        }
        return prevQueries;
      });
      getProductsRatingFilter(parseInt(rating)).then((res) => {
        setPriceFilter("");
        setInitialData(res);
      });
    }
  }, [minPrice, maxPrice, rating]);

  const handleQuery = (query) => {
    fetchCategory(query);
    setCheckedQuery((prevQueries) => {
      if (!prevQueries.includes(query)) {
        return [...prevQueries, query];
      }
      return prevQueries;
    });
  };

  const handleClearAll = () => {
    setCheckedQuery([]);
    fetchCategory("");
    setPriceFilter("");
    setMinPice("");
    setMaxPice("");
    setRating("");
    getAllProducts().then((res) => {
      setInitialData(res);
    });
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
        <div className="flex flex-wrap gap-1">
          {checkedQuery.map((item, index) => (
            <div className="checkedFilter my-[0.8px]">
              <ul
                className="bg-gray-200 px-2 text-sm rounded-md flex items-center py-1 gap-2"
                key={index}
              >
                <li className="text-sm">{item}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-md mb-2">Categories</h3>
        {data.data &&
          data.data.data.map((item, index) => (
            <div className="flex gap-2 leading-8" key={item.id}>
              <input
                type="checkbox"
                className="border border-gray-300 "
                name="filterCheck"
                onChange={() => handleQuery(item?.attributes?.Name)}
                checked={checkedQuery.includes(item?.attributes?.Name)}
              />
              <span className="text-md text-gray-600">
                {item?.attributes?.Name[0].toUpperCase() +
                  item?.attributes?.Name.slice(1)}
              </span>
            </div>
          ))}
      </div>
      <div className="mb-4">
        <h3 className="text-md mb-2">Price </h3>
        <div className="flex items-center">
          <Select
            name="rangeFilter"
            placeholder="min"
            className="flex-grow text-md"
            options={PRICE_RANGE_MIN}
            onChange={(selectedOption) => setMinPice(selectedOption.value)}
          />
          <span className="mx-2 text-gray-500">to</span>
          <Select
            name="rangeFilter"
            placeholder="₹25000"
            className="flex-grow text-md"
            options={PRICE_RANGE_MAX}
            onChange={(selectedOption) => setMaxPice(selectedOption.value)}
          />
        </div>
      </div>
      <div>
        <h3 className="text-md mb-2">Rating</h3>
        <div className="">
          {RATING_FILTER.map((rating, index) => (
            <div className="flex gap-1" key={index}>
              <input
                type="radio"
                className="border border-gray-300 "
                name="filterCheck"
                value={rating}
                id=""
                onChange={() => setRating(rating.value)}
                // checked={checkedQuery.includes(rating.value)}
              />
              <label htmlFor="">{rating.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
