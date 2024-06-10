import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")({
  position: "relative",
  margin: "20px",
});

const Image = styled("img")(({ index }) => ({
  position: "absolute",
  width: "80px",
  height: "80px",
  left: index * 20,
  top: index * 20,

  objectFit: "cover",
  //   opacity: "0.7",
  //   zIndex: "-1",
}));

const OverlappingImages = ({ image, index, onClick }) => {
  return (
    <Image
      key={index}
      src={image}
      alt={`Image ${index}`}
      onClick={onClick}
      index={index}
    />
  );
};

export default OverlappingImages;
