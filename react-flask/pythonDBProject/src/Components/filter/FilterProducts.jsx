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
  const [minPrice, setMinPice] = useState(null);
  const [maxPrice, setMaxPice] = useState(null);
  const [rating, setRating] = useState(1);
  const { setPriceFilter, setInitialData } = useContext(CartContext);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (
      (category && minPrice !== null && maxPrice !== null && rating === 1) ||
      (category && minPrice !== null && maxPrice !== null && rating > 1)
    ) {
      getProductsPriceFilter(minPrice, maxPrice, category, parseInt(rating))
        .then((res) => {
          setPriceFilter(res);
          setInitialData({});
        })
        .catch((error) => {
          console.error(
            "Error fetching products by category and price filter:",
            error
          );
        });
    }

    if (rating > 1 && minPrice === null) {
      setCheckedQuery((prevQueries) => {
        if (!prevQueries.includes(rating)) {
          return [...prevQueries, rating];
        }
        return prevQueries;
      });
      getProductsRatingFilter(parseInt(rating)).then((res) => {
        setPriceFilter({});
        setInitialData(res);
      });
    }
  }, [minPrice, maxPrice, rating, category]);

  const handleQuery = (query) => {
    fetchCategory(query);
    setCategory(query);
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
    setPriceFilter({});
    setInitialData({});
    setMinPice(null);
    setMaxPice(null);
    setRating("");
    setCategory("");
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
            <div className="checkedFilter my-[0.8px]" key={index}>
              <ul className="bg-gray-200 px-2 text-sm rounded-md flex items-center py-1 gap-2">
                <li className="text-sm">{item}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-md mb-2">Categories</h3>
        {data.data ? (
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
          ))
        ) : (
          <>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-[16px] w-[16px] bg-slate-200 animate-pulse mt-2"></div>
              <div className="h-[20px] w-[70px] bg-slate-200 animate-pulse mt-2"></div>
            </div>
          </>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-md mb-2">Price </h3>
        <div className="flex items-center">
          <Select
            name="rangeFilter"
            placeholder="min"
            className="flex-grow text-md"
            options={PRICE_RANGE_MIN}
            onChange={(selectedOption) =>
              setMinPice(selectedOption?.value || null)
            }
          />
          <span className="mx-2 text-gray-500">to</span>
          <Select
            name="rangeFilter"
            placeholder="max"
            className="flex-grow text-md"
            options={PRICE_RANGE_MAX}
            onChange={(selectedOption) =>
              setMaxPice(selectedOption?.value || null)
            }
          />
        </div>
      </div>
      <div>
        <h3 className="text-md mb-2">Rating</h3>
        <div>
          {RATING_FILTER.map((ratingOption, index) => (
            <div className="flex gap-1" key={index}>
              <input
                type="checkbox"
                className="border border-gray-300"
                name="filterCheck"
                value={ratingOption.value}
                id={`rating-${ratingOption.value}`}
                onChange={() => setRating(ratingOption.value)}
                checked={rating === ratingOption.value}
              />
              <label htmlFor={`rating-${ratingOption.value}`}>
                {ratingOption.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
