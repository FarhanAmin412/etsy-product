import React from "react";
import CanvaLogo from "../../assets/canva.png";
import KittlLogo from "../../assets/kittl.jpg";
import AdobeLogo from "../../assets/adobe.png";
import {
  Button,
  CardMedia,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { SmallImage } from "src/theme/globalStyles";
import { StyledGrid } from "./Cart.styles";
import ImageViewPopup from "src/components/image-viewer";
import usps_catalog from "../../assets/images/usps_catalog.png";
const CartItem = ({ item, addToCart, removeFromCart }) => {
  const checkIfURL = (item) => {
    if (item.catalog?.no_of_graphics === 0) {
      return [usps_catalog];
    } else {
      let grouped_images = [item?.image, item?.notecard_image];

      let newArray = grouped_images.map((graphic) => {
        let canvaUrl = graphic ? graphic?.search("canva") : 0;
        let kittleURL = graphic ? graphic?.search("kittl") : 0;
        let adobeURL = graphic ? graphic?.search("adobe") : 0;
        if (canvaUrl > 0) {
          return CanvaLogo;
        } else if (kittleURL > 0) {
          return KittlLogo;
        } else if (adobeURL > 0) {
          return AdobeLogo;
        } else {
          return graphic;
        }
      });

      return newArray.filter((item) => item !== null);
    }
  };

  return (
    <StyledGrid container>
      <Grid item xs={2}>
        <ImageViewPopup imageSRC={checkIfURL(item)} overlap />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Stack direction={"row"} justifyContent={"space-between"} mt={3}>
          <Typography variant="body1">Price: ${item.price}</Typography>
          <Typography variant="body1">
            Total: ${(item.quantity * item.price).toFixed(2)}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={4} alignSelf={"center"}>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Button
            size="small"
            disableElevation
            variant="contained"
            color="inherit"
            onClick={() => {
              removeFromCart(item.id);
            }}
          >
            -
          </Button>
          <Typography variant="body1">{item.quantity}</Typography>

          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => {
              addToCart(item);
            }}
          >
            +
          </Button>
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default CartItem;
