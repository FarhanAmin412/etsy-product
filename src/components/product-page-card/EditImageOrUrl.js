import React from "react";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  LightTooltip,
  StyledCanvaURl,
  StyledDesignBox,
  StyledEditBox,
  StyledImageUpload,
  StyledLoadingButton,
} from "./ProductCard.styles";
import LaptopIcon from "@mui/icons-material/Laptop";
import BrushIcon from "@mui/icons-material/Brush";
import ImageViewPopup from "../image-viewer";
import Iconify from "../iconify/Iconify";
                                                                                           
const EditImageOrUrl = (props) => {
  return (
    <StyledDesignBox component="span">
      {props.CatalogDetails?.no_of_graphics > 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Edit{" "}
            {props.CatalogDetails.no_of_graphics === 2
              ? "Pendant Graphic"
              : "Image or URL"}
          </Typography>
          <Typography variant="p" sx={{ mb: 3, maxWidth: "350px" }}>
            {props.CatalogDetails.no_of_graphics === 2 ? "" : <b> Note:</b>}{" "}
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
              <></>
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
              Image Uploaded
            </StyledImageUpload>
          </LightTooltip>

          {props.uploadedDataType === "image" && (
            <>
              <ImageViewPopup
                imageSRC={props.imageSRC}
                fileName={props.fileName}
                sx={{ my: 1 }}
              />
            </>
          )}
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
          {props.uploadedDataType === "url" && (
            <>
              <Typography component="span" className="mb-3 mt-3">
                URL Added:
              </Typography>
              <a
                href={props.uploadedData}
                target="_blank"
                rel="noreferrer"
                style={{ maxWidth: "350px", wordBreak: "break-all" }}
              >
                {props.uploadedData}
              </a>
            </>
          )}

          {props.CatalogDetails.no_of_graphics === 2 && (
            <>
              <Typography variant="h4" sx={{ my: 3 }}>
                Edit Notecard Graphic:
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
                  Image Uploaded
                </StyledImageUpload>
              </LightTooltip>

              {props.uploadedNotecardDataType === "notecardImage" && (
                <>
                  <ImageViewPopup
                    imageSRC={props.notecardImageSRC}
                    fileName={props.notecardFileName}
                    sx={{ mb: 2 }}
                  />
                </>
              )}

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
                    value={props.notecardCanvaURL}
                    disabled={
                      props.notecardImageUpload === "notecardUrl" ? true : false
                    }
                    onChange={(e) => props.handleCanvaUrl(e, "notecardImage")}
                  />
                </StyledCanvaURl>
              </LightTooltip>
              {props.uploadedNotecardDataType === "notecardUrl" && (
                <>
                  <Typography component="span" className="mb-3 mt-3">
                    URL Added:
                  </Typography>
                  <a
                    href={props.notecardData}
                    target="_blank"
                    rel="noreferrer"
                    style={{ maxWidth: "350px", wordBreak: "break-all" }}
                  >
                    {props.notecardData}
                  </a>
                </>
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
      <StyledLoadingButton
        className="mt-3"
        variant="contained"
        size="large"
        disabled={
          props.CatalogDetails.no_of_graphics === 0
            ? false
            : props.CatalogDetails.no_of_graphics === 2
            ? props.notecardImageUpload === "none" &&
              props.imageUpload === "none"
              ? true
              : false
            : props.imageUpload === "none"
            ? true
            : false
        }
        onClick={props.handleUpdateProduct}
        loading={props.loading}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Update Product
      </StyledLoadingButton>

      <StyledLoadingButton
        className="mt-3"
        variant="contained"
        size="large"
        disabled={
          props.CatalogDetails.no_of_graphics === 0
            ? false
            : props.CatalogDetails.no_of_graphics === 2
            ? props.notecardImageUpload === "none" &&
              props.imageUpload === "none"
              ? false
              : true
            : props.imageUpload === "none"
            ? false
            : true
        }
        onClick={props.handleAddToCart}
        loading={props.loadingAddToCart}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Add to Cart
      </StyledLoadingButton>

      <Divider sx={{ my: 3, maxWidth: "350px" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>

      {props.listing_id === null ? (
        <Button
          variant="contained"
          size="large"
          disabled={
            props.CatalogDetails.no_of_graphics === 0
              ? false
              : props.CatalogDetails.no_of_graphics === 2
              ? props.notecardImageUpload === "none" &&
                props.imageUpload === "none"
                ? false
                : true
              : props.imageUpload !== "none" || props.etsyLaunched
              ? true
              : false
          }
          onClick={props.getShipingProfiles}
          sx={{ maxWidth: "350px", borderRadius: "40px" }}
        >
          {props.etsyLaunched ? "Launched" : "Launch"} to Etsy
          <Iconify className="ms-3" icon="bi:box-arrow-up-right" color="#fff" />
        </Button>
      ) : (
        <StyledEditBox>
          Launched to Etsy
          <br />
          Listing id: {props.listing_id}
        </StyledEditBox>
      )}

      <Divider sx={{ my: 3, maxWidth: "350px" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>

      {props.amazon_sku === null ? (
        <StyledLoadingButton
          variant="contained"
          size="large"
          disabled={
            props.CatalogDetails.no_of_graphics === 0
              ? false
              : props.CatalogDetails.no_of_graphics === 2
              ? props.notecardImageUpload === "none" &&
                props.imageUpload === "none"
                ? false
                : true
              : props.imageUpload === "none"
              ? false
              : true
          }
          onClick={props.launchToAmazon}
          loading={props.amzBtnLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Launch to Amazon{" "}
          <Iconify className="ms-3" icon="bi:box-arrow-up-right" color="#fff" />
        </StyledLoadingButton>
      ) : (
        <StyledEditBox>
          Launched to Amazon
          <br />
          SKU : {props.amazon_sku}
        </StyledEditBox>
      )}
    </StyledDesignBox>
  );
};

export default EditImageOrUrl;
