import { CardMedia, styled } from "@mui/material";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import OverlappingImages from "../overlap-images/OverlappingImages";

const Container = styled("div")({
  position: "relative",
  width: "80px",
  height: "80px",
  margin: "20px",
});

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  position: "relative",
  width: "80px",
  height: "80px",
}));

const ImageViewPopup = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {props.imageSRC?.length ? (
        props.overlap ? (
          <Container>
            {props.imageSRC.map((image, index) => (
              <OverlappingImages
                key={index}
                image={image}
                index={index}
                onClick={() => openImageViewer(index)}
              />
            ))}
          </Container>
        ) : (
          props.imageSRC.map((image, index) => (
            <StyledCardMedia
              key={index}
              component="img"
              image={image}
              alt="Catalog image"
              onClick={() => openImageViewer(index)}
              sx={{ ...props.sx }}
              loading="lazy"
            />
          ))
        )
      ) : (
        ""
      )}
      {isViewerOpen && (
        <ImageViewer
          src={props.imageSRC}
          currentIndex={currentImage.file}
          onClose={closeImageViewer}
          width={30}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 3000,
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
};

export default ImageViewPopup;
