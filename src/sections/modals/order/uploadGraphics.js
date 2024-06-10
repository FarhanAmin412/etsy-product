import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import {
  LightTooltip,
  StyledImageUpload,
} from "src/components/product-page-card/ProductCard.styles";
import LaptopIcon from "@mui/icons-material/Laptop";
import { SmallImage } from "src/theme/globalStyles";
import OrderGraphics from "./orderGraphics";
import { useDispatch, useSelector } from "react-redux";
import { toastify } from "src/utils/toast";
import { updateOrder } from "src/pages/orders/requests/local/updateOrder";
import { LoadingButton } from "@mui/lab";
import { loadingBtnAction } from "src/redux/actions/userActions";

const UploadGraphics = ({ item, onUploading }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const loading = useSelector((state) => state.user.loadingButton);

  const [file, setFile] = useState([]);
  const [type, setType] = useState("graphic_image");
  const [graphic, setGraphic] = useState([]);
  const [selected, setSelected] = React.useState("pendant");

  const handleSelected = (event) => {
    setSelected(event.target.value);

    if (event.target.value === "pendant") {
      setType("graphic_image");
    } else if (event.target.value === "notecard") {
      setType("notecard_image");
    }
  };

  async function onUploading(e) {
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
        const width = (image.width / 96) * 25.4;
        const height = (image.height / 96) * 25.4;
        const minWidth = 239;
        const minHeight = 208;

        if (width < minWidth || height < minHeight) {
          toastify(
            "warning",
            `Image dimensions must be atleast ${minWidth}mm x ${minHeight}mm`
          );
          return;
        }
      };
      setFile(e.target.files[0]);
      setGraphic([URL.createObjectURL(e.target.files[0])]);
    }
  }

  return (
    <>
      <OrderGraphics item={item} />
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Upload Graphics:
        </Typography>
        <FormControl>
          <RadioGroup
            defaultValue="pendant"
            name="radio-buttons-group"
            value={selected}
            onChange={handleSelected}
          >
            <FormControlLabel
              value="pendant"
              control={<Radio />}
              label="Pendant"
            />
            <FormControlLabel
              value="notecard"
              control={<Radio />}
              label="Notecard"
            />
          </RadioGroup>
        </FormControl>

        <Stack direction={"row"} justifyContent={"center"}>
          {selected === "pendant" ? (
            <>
              <input
                accept="image/*"
                id={`${item.id}-pendent-graphics`}
                type="file"
                hidden
                onChange={onUploading}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              <LightTooltip
                title="For Non Personalized Graphics"
                placement="right"
              >
                <StyledImageUpload
                  htmlFor={`${item.id}-pendent-graphics`}
                  sx={{
                    paddingRight: "20px",
                    paddingLeft: "20px",
                  }}
                >
                  <LaptopIcon sx={{ mx: 1 }} />
                  Upload Pendant graphic
                </StyledImageUpload>
              </LightTooltip>
            </>
          ) : item?.notecard_image && selected === "notecard" ? (
            <>
              {" "}
              <input
                accept="image/*"
                id={`${item.id}-notecard-graphics`}
                type="file"
                hidden
                onChange={onUploading}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              <LightTooltip
                title="For Non Personalized Graphics"
                placement="right"
              >
                <StyledImageUpload
                  htmlFor={`${item.id}-notecard-graphics`}
                  sx={{
                    paddingRight: "20px",
                  }}
                >
                  <LaptopIcon sx={{ mx: 1 }} />
                  Upload Notecard graphic
                </StyledImageUpload>
              </LightTooltip>
            </>
          ) : (
            ""
          )}

          {graphic?.length ? (
            <SmallImage
              sx={{ my: 2 }}
              component={"img"}
              image={graphic}
              alt="pendant"
            />
          ) : (
            <Box sx={{ my: 2 }} />
          )}
        </Stack>
        <Box sx={{ textAlign: "end", mt: 3 }}>
          <LoadingButton
            variant="contained"
            disabled={graphic?.length ? false : true}
            loading={loading}
            loadingIndicator={<CircularProgress size={12} color="inherit" />}
            onClick={() => {
              dispatch(loadingBtnAction(true));
              updateOrder(file, item?.id, dispatch, userType, type);
            }}
          >
            Upload
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default UploadGraphics;
