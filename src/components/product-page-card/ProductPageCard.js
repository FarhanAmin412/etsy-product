import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toastify } from "src/utils/toast";
import { fCurrency } from "src/utils/formatNumber";
import { setModalState } from "src/redux/actions/modalActions";
import Carousel from "react-material-ui-carousel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  StyledCardContent,
  StyledCardMedia,
  StyledDesignButton,
} from "./ProductCard.styles";
import request from "src/utils/request";
import CartWidget from "src/sections/@dashboard/products/ProductCartWidget";
import EditPreviewImage from "./EditPreviewImage";
import AddImageOrURL from "./AddImageOrURL";
import EditImageOrUrl from "./EditImageOrUrl";
import EditCatalogTitle from "./EditCatalogTitle";
import ShippingProfiles from "src/sections/modals/products/shippingProfiles";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { addProductToCart } from "src/redux/actions/productActions";
import { createFile } from "src/utils/createFile";
import SetLaunchState from "src/sections/modals/products/setLaunchState";

export default function ProductPageCard(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const [showTab, setShowTab] = useState(false);
  const [imageUpload, setImageUpload] = useState("none");
  const [value, setValue] = useState("1");
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [amzBtnLoading, setAmzBtnLoading] = useState(false);
  const [canvaURL, setCanvaURL] = useState("");
  const [imageSRC, setImage] = useState([]);
  const [previewImages, setPreviewImage] = useState(
    props.CatalogDetails.images
  );
  const [uploadedDataType, setUploadedDataType] = useState("");
  const [uploadedNotecardDataType, setUploadedNotecardDataType] = useState("");

  const [productTitle, setProductTitle] = useState(props.CatalogDetails.name);
  const [uploadedData, setUploadedData] = useState(
    props.CatalogDetails.uploadedData
  );
  const [notecardData, setNotecardData] = useState(
    props.CatalogDetails.notecardData
  );
  const [uploadedNotecardImage, setUploadedNotecardImage] = useState([]);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [etsyLaunched, setEtsyLaunched] = useState(false);

  const productsInCart = useSelector((state) => state.product.productsInCart);
  const loading = useSelector((state) => state.user.loadingButton);
  const userType = useSelector((state) => state.user.user.type);

  const id = props.CatalogDetails.id;
  const listing_id = props.CatalogDetails.listing_id;
  const amazon_sku = props.CatalogDetails.amazon_sku;
  const type = props.CatalogDetails.breadCrumb;

  const price = fCurrency(props.CatalogDetails.price);
  const shipPrice = fCurrency(props.CatalogDetails.shipPrice);
  const info = JSON.parse(JSON.stringify(props.CatalogDetails.desc));

  const [notecardImageUpload, setNoteCardImageUpload] = useState("none");
  const [notecardFiles, setNoteCardFiles] = useState([]);
  const [notecardFileName, setNotecardFileName] = useState("");
  const [notecardImageSRC, setNotecardImage] = useState([]);
  const [notecardCanvaURL, setNotecardCanvaURL] = useState("");

  const noteCardRequired =
    type === "products"
      ? props.CatalogDetails.catalog.no_of_graphics === 2
      : props.CatalogDetails.no_of_graphics === 2;

  useEffect(() => {
    if (type === "products") {
      let isCanvaUrl = uploadedData?.search("canva");
      let isKittlUrl = uploadedData?.search("kittl");
      let isAdobeUrl = uploadedData?.search("adobe");

      if (isCanvaUrl > 0 || isKittlUrl > 0 || isAdobeUrl > 0) {
        setUploadedDataType("url");
      } else {
        createFile(uploadedData, setUploadedImage);
        setUploadedDataType("image");
      }
      setImage([props.CatalogDetails.uploadedData]);

      if (noteCardRequired) {
        let canvaUrl = notecardData?.search("canva");
        let kittlUrl = notecardData?.search("kittl");
        let adobeUrl = notecardData?.search("adobe");

        if (canvaUrl > 0 || kittlUrl > 0 || adobeUrl > 0) {
          setUploadedNotecardDataType("notecardUrl");
        } else {
          createFile(notecardData, setUploadedNotecardImage);
          setUploadedNotecardDataType("notecardImage");
        }
        setNotecardImage([props.CatalogDetails.notecardData]);
      }
    } else {
      createFile(props.CatalogDetails.cover, setPreviewFiles);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowTab = (event, bool) => {
    setShowTab(bool);
  };

  async function onUploading(e, type) {
    const file = e.target.files[0];

    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention =
        tempExtention[tempExtention.length - 1].toLowerCase();
      const allowedFileExtentions = ["png"];

      if (!allowedFileExtentions.includes(fileExtention)) {
        toastify(
          "warning",
          "Please upload valid file type. File type allowed: PNG"
        );
        return;
      }

      if (file.size > 20000000) {
        toastify("warning", "File size should be less than 20MB");
        return;
      }

      const image = new Image();
      image.onload = function () {
        const width = (image.width / 96) * 25.4; // convert pixels to mm
        const height = (image.height / 96) * 25.4; // convert pixels to mm
        const minWidth = 239;
        const minHeight = 208;

        if (width < minWidth || height < minHeight) {
          toastify(
            "warning",
            `Image dimensions must be atleast ${minWidth}mm x ${minHeight}mm`
          );
          return;
        }
        image.src = URL.createObjectURL(file);
      };

      if (type === "prevImage") {
        handlePreviewImage(e, file);
      } else {
        if (type === "graphicImage") {
          handleGraphicImage(e, file);
        }
        if (type === "notecardImage") {
          handleNoteCardImage(e, file);
        }
      }
    }
  }

  const handleGraphicImage = (e, file) => {
    setFiles([file]);
    setFileName(file.name);
    setImageUpload("url");
    setUploadedDataType("image");
    setImage([URL.createObjectURL(e.target.files[0])]);
  };

  const handleNoteCardImage = (e, file) => {
    setNoteCardFiles([file]);
    setNotecardFileName(file.name);
    setNoteCardImageUpload("notecardUrl");
    setUploadedNotecardDataType("notecardImage");
    setNotecardImage([URL.createObjectURL(e.target.files[0])]);
  };

  const handlePreviewImage = (e, file) => {
    setPreviewFiles([file]);
    setPreviewImage([URL.createObjectURL(e.target.files[0])]);
    if (type === "products") {
      setImageUpload("previmage");
    }
  };

  const handleUrl = (e, type) => {
    if (type === "graphicImage") {
      setImageUpload("image");
      setCanvaURL(e.target.value);
    } else {
      setNoteCardImageUpload("notecardImage");
      setNotecardCanvaURL(e.target.value);
    }

    if (e.target.value === "") {
      setImageUpload("none");
      setNoteCardImageUpload("none");
    }
  };

  const reset = () => {
    if (type === "Catalog") {
      setImage([]);
      setNotecardImage([]);
      setPreviewImage(props.CatalogDetails.images);
      setProductTitle(props.CatalogDetails.name);
    }
    setImageUpload("none");
    setFileName("");
    setFiles([]);
    setCanvaURL("");

    setNoteCardImageUpload("none");
    setNoteCardFiles([]);
    setNotecardFileName("");
    setNotecardCanvaURL("");
  };

  const checkifURLPresent = () => {
    let isCanvaUrl;
    let isKittlUrl;
    let isAdobeUrl;

    if (canvaURL || notecardCanvaURL) {
      isCanvaUrl = noteCardRequired
        ? notecardCanvaURL?.search("canva") && canvaURL?.search("canva")
        : canvaURL?.search("canva");
      isKittlUrl = noteCardRequired
        ? notecardCanvaURL?.search("kittl") && canvaURL?.search("kittl")
        : canvaURL?.search("kittl");
      isAdobeUrl = noteCardRequired
        ? notecardCanvaURL?.search("adobe") && canvaURL?.search("adobe")
        : canvaURL?.search("adobe");

      if (canvaURL && isCanvaUrl <= 0 && isKittlUrl <= 0 && isAdobeUrl <= 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getShipingProfiles = async () => {
    try {
      const res = await request.get("etsy/get/shipping/profiles/");

      if (res) {
        const response = res.data.data.results;

        if (response.length > 1) {
          dispatch(
            setModalState(
              <ShippingProfiles
                shippingProfiles={response}
                launchToEtsy={launchToEtsy}
                loading={loading}
              />
            )
          );
        } else {
          launchToEtsy(response[0].shipping_profile_id);
        }
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  const launchToEtsy = async (shipping_profile_id) => {
    let formData = new FormData();
    formData.append("quantity", "1");
    formData.append("description", props.CatalogDetails.desc);
    formData.append("title", productTitle);
    formData.append("price", props.CatalogDetails.price);
    formData.append("shipping_profile_id", shipping_profile_id);
    formData.append("product_id", props.CatalogDetails.id);

    dispatch(
      setModalState(
        <SetLaunchState
          formData={formData}
          reset={reset}
          setEtsyLaunched={setEtsyLaunched}
          page={1}
          rowsPerPage={10}
        />
      )
    );
  };

  const launchToAmazon = async () => {
    setAmzBtnLoading(true);

    const payload = {
      product_id: id,
    };

    try {
      const res = await request.post("amazon/add/product", payload);

      if (res) {
        setAmzBtnLoading(false);
        reset();
        toastify("success", res.data.message);
      }
    } catch (e) {
      setAmzBtnLoading(false);
      toastify("error", e.response.data.message);
    }
  };

  const addToCart = async () => {
    let formData = new FormData();
    formData.append("catalog_id", props.CatalogDetails.id);
    formData.append("quantity", "1");

    if (canvaURL) {
      formData.append("url", canvaURL);
    } else {
      formData.append("graphic_image", files[0]);
    }

    if (noteCardRequired) {
      if (notecardCanvaURL) {
        formData.append("notecard_url", notecardCanvaURL);
      } else {
        formData.append("notecard_image", notecardFiles[0]);
      }
    }

    if (checkifURLPresent()) {
      toastify("warning", "Please enter a valid url");
    } else {
      try {
        dispatch(loadingBtnAction(true));
        const res = await request.post(`/cart`, formData);

        if (res) {
          dispatch(loadingBtnAction(false));
          dispatch(addProductToCart(productsInCart + 1));
          reset();
          toastify("success", res.data.message);
        }
      } catch (e) {
        dispatch(loadingBtnAction(false));
        toastify("error", e.response.data.message);
      }
    }
  };

  const addToCartOnProducts = async () => {
    setLoadingAddToCart(true);

    let formData = new FormData();
    formData.append("catalog_id", props.CatalogDetails.catalog.id);
    formData.append("quantity", "1");

    let isGraphicURL = uploadedData?.search("image") > 0 ? false : true;
    let notecardURL = notecardData?.search("image") > 0 ? false : true;

    if (isGraphicURL) {
      formData.append("url", uploadedData);
    } else {
      formData.append("graphic_image", uploadedImage[0]);
    }

    if (notecardData && notecardURL) {
      formData.append("notecard_url", notecardData);
    } else {
      formData.append("notecard_image", uploadedNotecardImage[0]);
    }

    if (checkifURLPresent()) {
      toastify("warning", "Please enter a valid url");
      setLoadingAddToCart(false);
    } else {
      try {
        const res = await request.post(`/cart`, formData);

        if (res) {
          setLoadingAddToCart(false);
          dispatch(addProductToCart(productsInCart + 1));
          reset();
          toastify("success", res.data.message);
        }
      } catch (e) {
        setLoadingAddToCart(false);
        toastify("error", e.response.data.message);
      }
    }
  };

  const addToProducts = async () => {
    setBtnLoading(true);

    let formData = new FormData();
    formData.append("catalog_id", props.CatalogDetails.id);
    formData.append("quantity", "1");
    formData.append("title", productTitle);
    formData.append("price", props.CatalogDetails.price);
    formData.append("description", props.CatalogDetails.desc);
    formData.append("preview_image", previewFiles[0]);

    if (canvaURL) {
      formData.append("url", canvaURL);
    } else {
      formData.append("graphic_image", files[0]);
    }

    if (noteCardRequired) {
      if (notecardCanvaURL) {
        formData.append("notecard_url", notecardCanvaURL);
      } else {
        formData.append("notecard_image", notecardFiles[0]);
      }
    }

    if (checkifURLPresent()) {
      toastify("warning", "Please enter a valid url");
      setBtnLoading(false);
    } else {
      try {
        const res = await request.post(`/products`, formData);

        if (res) {
          reset();
          toastify("success", res.data.message);
          setBtnLoading(false);
        }
      } catch (e) {
        setBtnLoading(false);
        toastify("error", e.response.data.message);
      }
    }
  };

  const updateProduct = async () => {
    dispatch(loadingBtnAction(true));

    let formData = new FormData();
    formData.append("product_id", props.CatalogDetails.id);

    formData.append("catalog_id", props.CatalogDetails.catalog.id);
    formData.append("quantity", "1");
    formData.append("title", productTitle);
    formData.append("price", props.CatalogDetails.price);
    formData.append("description", props.CatalogDetails.desc);


    previewFiles.length > 0 &&
      formData.append("preview_image", previewFiles[0]);


    if (canvaURL) {
      formData.append("url", canvaURL);
    } else if (files.length) {
      formData.append("graphic_image", files[0]);
    }

    if (noteCardRequired) {
      if (notecardCanvaURL || notecardFiles.length) {
        if (notecardCanvaURL) {
          formData.append("notecard_url", notecardCanvaURL);
        } else if (notecardFiles.length) {
          formData.append("notecard_image", notecardFiles[0]);
        }
      } else {
        let isURL = notecardData?.search("image") > 0 ? false : true;

        if (isURL) {
          formData.append("notecard_url", notecardData);
        } else {
          formData.append("notecard_image", uploadedNotecardImage[0]);
        }
      }
    }

    if (checkifURLPresent()) {
      toastify("warning", "Please enter a valid url");
      dispatch(loadingBtnAction(false));
    } else {
      try {
        const res = await request.post(`/products/update`, formData);

        if (res) {
          dispatch(loadingBtnAction(false));
          reset();

          if (canvaURL) {
            setUploadedDataType("url");
            setUploadedData(canvaURL);
          }
          if (files.length) {
            setUploadedDataType("image");
          }

          if (notecardCanvaURL || notecardFiles.length) {
            if (notecardCanvaURL) {
              setNotecardData(notecardCanvaURL);
              setUploadedNotecardDataType("notecardUrl");
            } else if (notecardFiles.length) {
              setUploadedNotecardDataType("notecardImage");
            }
          } else {
            let isURL = notecardData?.search("image") > 0 ? false : true;

            if (isURL) {
              setUploadedNotecardDataType("notecardUrl");
              setNotecardData(notecardData);
            } else {
              setUploadedNotecardDataType("notecardImage");
              createFile(notecardData, setUploadedNotecardImage);
            }
          }

          toastify("success", res.data.message);
        }
      } catch (e) {
        dispatch(loadingBtnAction(false));
        toastify("error", e.response.data.message);
      }
    }
  };

  return (
    <Grid container sx={{ backgroundColor: "#ffffff", padding: "20px" }}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {userType === "Seller" && <CartWidget />}
      <Grid
        item
        sm={12}
        md={5}
        style={{ flexBasis: "100%", position: "relative" }}
      >
        {showTab && (
          <EditPreviewImage
            handlePreviewImage={(e) => onUploading(e, "prevImage")}
          />
        )}

        {previewImages?.length > 1 ? (
          <Carousel navButtonsAlwaysVisible autoPlay={false}>
            {previewImages.map((image, index) => (
              <StyledCardMedia
                key={index}
                component="img"
                image={image}
                alt="images slider"
              />
            ))}
          </Carousel>
        ) : (
          <StyledCardMedia
            component="img"
            image={previewImages[0]}
            alt="Catalog image"
          />
        )}
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1">
            {props.CatalogDetails.url}
          </Typography>
        </Box>
      </Grid>

      {showTab ? (
        <Grid item sm={12} md={7}>
          <StyledCardContent>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs">
                  <Tab
                    label={type === "products" ? "Open Product" : "New Design"}
                    value="1"
                  />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ padding: "20px 0px" }}>
                <EditCatalogTitle
                  productTitle={productTitle}
                  onChange={(e) => {
                    setProductTitle(e.target.value);
                    if (type === "products") {
                      setImageUpload("title");
                    }
                  }}
                />

                {type === "products" ? (
                  <EditImageOrUrl
                    imageUpload={imageUpload}
                    onUploading={onUploading}
                    imageSRC={imageSRC}
                    fileName={fileName}
                    canvaURL={canvaURL}
                    notecardCanvaURL={notecardCanvaURL}
                    notecardFileName={notecardFileName}
                    notecardImageSRC={notecardImageSRC}
                    files={files}
                    handleAddToCart={addToCartOnProducts}
                    loadingAddToCart={loadingAddToCart}
                    handleCanvaUrl={handleUrl}
                    handleUpdateProduct={updateProduct}
                    getShipingProfiles={getShipingProfiles}
                    loading={loading}
                    uploadedData={uploadedData}
                    notecardData={notecardData}
                    uploadedDataType={uploadedDataType}
                    uploadedNotecardDataType={uploadedNotecardDataType}
                    listing_id={listing_id}
                    launchToAmazon={launchToAmazon}
                    amzBtnLoading={amzBtnLoading}
                    amazon_sku={amazon_sku}
                    etsyLaunched={etsyLaunched}
                    catalogID={props.CatalogDetails.catalog.id}
                    CatalogDetails={props.CatalogDetails.catalog}
                    notecardImageUpload={notecardImageUpload}
                  />
                ) : (
                  <AddImageOrURL
                    imageUpload={imageUpload}
                    onUploading={onUploading}
                    imageSRC={imageSRC}
                    fileName={fileName}
                    canvaURL={canvaURL}
                    notecardCanvaURL={notecardCanvaURL}
                    notecardFileName={notecardFileName}
                    notecardImageSRC={notecardImageSRC}
                    handleCanvaUrl={handleUrl}
                    handleAddToCart={addToCart}
                    handleAddToProducts={addToProducts}
                    loading={loading}
                    btnLoading={btnLoading}
                    catalogID={props.CatalogDetails.id}
                    CatalogDetails={props.CatalogDetails}
                    notecardImageUpload={notecardImageUpload}
                  />
                )}
              </TabPanel>
            </TabContext>
          </StyledCardContent>
        </Grid>
      ) : (
        <Grid item sm={6} md={7}>
          <StyledCardContent>
            <Typography component="div" variant="h3">
              {props.CatalogDetails.name}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                paddingTop: theme.spacing(2),
              }}
              variant="h4"
              color="text.secondary"
              component="div"
            >
              Price {price}
            </Typography>
            {shipPrice && (
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  paddingBottom: theme.spacing(2),
                }}
                variant="h4"
                color="text.secondary"
                component="div"
              >
                Shipping {shipPrice}
              </Typography>
            )}

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="mt-3"
            >
              <div style={{ whiteSpace: "pre-line" }}>{info}</div>
            </Typography>

            {userType === "Seller" && (
              <StyledDesignButton
                onClick={(e) => handleShowTab(e, true)}
                variant="contained"
                size="large"
              >
                {type === "products" ? "Edit Design" : "Start Designing"}
              </StyledDesignButton>
            )}
          </StyledCardContent>
        </Grid>
      )}
    </Grid>
  );
}
