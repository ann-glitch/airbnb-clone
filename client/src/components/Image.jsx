import React from "react";

const Image = ({ src, ...rest }) => {
  src =
    src && src.includes("https://")
      ? src
      : `${process.env.REACT_APP_BASE_URL}/uploads` + src;
  return <img {...rest} src={src} alt={""} />;
};

export default Image;
