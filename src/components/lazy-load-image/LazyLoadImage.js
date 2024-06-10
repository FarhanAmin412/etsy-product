import React, { memo } from "react";
import { CardMedia, styled } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "../../assets/placeholder.jpg";

const StyledLazyLoadImage = styled(LazyLoadImage)({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  objectFit: "cover",
  width: "80px",
  height: "80px",
});

const MyImage = ({ image, sx, onClick, afterLoad, imageLoaded }) => {
  return (
    <>
      {!imageLoaded && (
        <StyledLazyLoadImage
          style={{ ...sx }}
          src={image}
          effect="blur"
          placeholderSrc={placeholderImg}
          onClick={onClick}
          afterLoad={afterLoad}
          alt="Lazy image"
        />
      )}
      {imageLoaded && (
        <CardMedia
          style={{ width: "80px", height: "80px" }}
          src={image}
          component="img"
          alt="My Image"
        />
      )}
    </>
  );
};

export default memo(MyImage);
