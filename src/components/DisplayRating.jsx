import React from "react";
import Icon from "../assets/logos/icon_logo_pink.svg?react";
import HalfIcon from "../assets/logos/half_icon_rating.svg?react"

const DisplayRating = ({ rating = 5.0 }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const isFull = rating >= i + 0.8;
    const isHalf = rating >= i + 0.25 && rating < i + 1;

    if (isFull) {
      stars.push(
        <Icon key={i} className="text-primary1 w-6 h-6" />
      );
    } else if (isHalf) {
      stars.push(
        <HalfIcon className="w-6 h-6" />
      );
    } else {
      stars.push(
        <Icon key={i} className="text-gray-300 w-6 h-6" />
      );
    }
  }

  return <div className="flex gap-2 w-32">{stars}</div>;
};

export default DisplayRating;