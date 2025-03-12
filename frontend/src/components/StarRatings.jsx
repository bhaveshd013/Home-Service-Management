import React, { useState } from "react";

const StarRatings = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => onRatingChange(starValue)} // ✅ Click to set rating
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: starValue <= (hover || rating) ? "gold" : "gray",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRatings;
