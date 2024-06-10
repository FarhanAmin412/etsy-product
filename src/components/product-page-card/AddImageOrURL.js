import React from "react";
import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  LightTooltip,
  StyledCanvaURl,
  StyledDesignBox,
  StyledImageUpload,
  StyledLoadingButton,
} from "./ProductCard.styles";
import LaptopIcon from "@mui/icons-material/Laptop";
import BrushIcon from "@mui/icons-material/Brush";
import ImageViewPopup from "../image-viewer";


const AddImageOrURL = (props) => {
  return (
    <StyledDesignBox component="span">
      {props.CatalogDetails?.no_of_graphics > 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Add{" "}
            {props.CatalogDetails.no_of_graphics === 2
              ? "Pendant Graphic"
              : "Image or URL"}
          </Typography>

          <Typography variant="p" sx={{ mb: 3, maxWidth: "350px" }}>
            <b> Note:</b>{" "}
            {props.catalogID === 5 ? (
              <>
                The personalized and non-personalized graphics should be atleast
                239MM X 208MM.
              </>
            ) : props.catalogID === 6 ? (
              <>
                82MM for full ornament face coverage & 61 MM for main artwork
                contained within the safety area.
              </>
            ) : (
              <>coming soon.</>
            )}
          </Typography>

          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            disabled={props.imageUpload === "image" ? true : false}
            hidden
            onChange={(e) => props.onUploading(e, "graphicImage")}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
          <LightTooltip title="For Non Personalized Graphics" placement="right">
            <StyledImageUpload htmlFor="icon-button-file">
              <IconButton
                color="gray"
                aria-label="upload picture" 
                component="span"
              >
                <LaptopIcon />
              </IconButton>
              {props.fileName ? "Image Uploaded" : "My Device"}
            </StyledImageUpload>
          </LightTooltip>

          <ImageViewPopup
            imageSRC={props.imageSRC}
            fileName={props.fileName}
            sx={{ my: 2 }}
          />

          <LightTooltip title="For Personalized Graphics" placement="right">
            <StyledCanvaURl>
              <IconButton
                color="gray"
                aria-label="upload picture"
                component="span"
              >
                <BrushIcon />
              </IconButton>
              <TextField
                label="Canva, Kittl or Adobe URL"
                className="canva-input"
                value={props.canvaURL}
                disabled={props.imageUpload === "url" ? true : false}
                onChange={(e) => props.handleCanvaUrl(e, "graphicImage")}
              />
            </StyledCanvaURl>
          </LightTooltip>

          {props.CatalogDetails.no_of_graphics === 2 ? (
            <>
              <Typography variant="h4" sx={{ my: 3 }}>
                Add Notecard Graphic:
              </Typography>
              <input
                accept="image/*"
                id="notecard-file"
                type="file"
                disabled={
                  props.notecardImageUpload === "notecardImage" ? true : false
                }
                hidden
                onChange={(e) => props.onUploading(e, "notecardImage")}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              <LightTooltip
                title="For Non Personalized Graphics"
                placement="right"
              >
                <StyledImageUpload htmlFor="notecard-file">
                  <IconButton
                    color="gray"
                    aria-label="upload picture"
                    component="span"
                  >
                    <LaptopIcon />
                  </IconButton>
                  {props.notecardFileName ? "Image Uploaded" : "My Device"}
                </StyledImageUpload>
              </LightTooltip>

              <ImageViewPopup
                imageSRC={props.notecardImageSRC}
                fileName={props.notecardFileName}
                sx={{ my: 2 }}
              />
 
              <LightTooltip title="For Personalized Graphics" placement="right">
                <StyledCanvaURl>
                  <IconButton
                    color="gray"
                    aria-label="upload picture"
                    component="span"
                  >
                    <BrushIcon />
                  </IconButton>
                  <TextField
                    placeholder="Canva, Kittl or Adobe URL"
                    className="canva-input"
                    variant="standard" 
                    value={props.notecardCanvaURL}
                    disabled={
                      props.notecardImageUpload === "notecardUrl" ? true : false
                    }
                    onChange={(e) => props.handleCanvaUrl(e, "notecardImage")}
                  />
                </StyledCanvaURl>
              </LightTooltip>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}

      <StyledLoadingButton
        className="mt-5"
        variant="contained"
        size="large"
        disabled={
          props.CatalogDetails.no_of_graphics === 0
            ? false
            : props.CatalogDetails.no_of_graphics === 2
            ? props.imageUpload === "none" ||
              (props.notecardImageUpload === "none" && true)
            : props.imageUpload === "none"
            ? true
            : false
        }
        onClick={props.handleAddToProducts}
        loading={props.btnLoading}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Add to Products
      </StyledLoadingButton>
      <Divider sx={{ my: 3, maxWidth: "350px" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
      <StyledLoadingButton
        variant="contained"
        size="large"
        disabled={
          props.CatalogDetails.no_of_graphics === 0
            ? false
            : props.CatalogDetails.no_of_graphics === 2
            ? props.imageUpload === "none" ||
              (props.notecardImageUpload === "none" && true)
            : props.imageUpload === "none"
            ? true
            : false
        }
        onClick={props.handleAddToCart}
        loading={props.loading}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Add to Cart
      </StyledLoadingButton>
    </StyledDesignBox>
  );
};

export default AddImageOrURL;
