import React from "react";
import Image from "./Image";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place?.addedPhotos.length) {
    return "";
  }

  if (!className) {
    className = "object-cover w-full";
  }

  return <Image src={place.addedPhotos[index]} alt="" className={className} />;
};

export default PlaceImg;
