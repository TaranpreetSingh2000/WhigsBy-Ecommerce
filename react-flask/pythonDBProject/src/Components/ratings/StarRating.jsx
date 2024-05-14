import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

function StarRating({ rating }) {
  const numStars = Math.floor(rating);
  const hasHalfStar = rating - numStars >= 0.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <span key={i}>
          <FaStar className="text-yellow-400" />
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key={numStars}>
          <FaStarHalfAlt className="text-yellow-400" />
        </span>
      );
    }
    return stars;
  };

  return <div className="flex items-center gap-1 my-1">{renderStars()}</div>;
}

export default StarRating;
