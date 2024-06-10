import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "src/pages/orders/requests/local/updateOrder";
import { loadingBtnAction } from "src/redux/actions/userActions";

const UpdateVariations = ({ item }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const loading = useSelector((state) => state.user.loadingButton);
  const [variations, setVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState("Gold");
  const [selectedSize, setSelectedSize] = useState("16");
  const [personalizationValue, setPersonalizationValue] = useState("");

  const default_array =
    item?.catalog?.id === 27
      ? [
          {
            property_id: 500,
            value_id: 1,
            formatted_name: "Color",
            formatted_value: "Gold",
          },
          {
            property_id: 506,
            value_id: 2,
            formatted_name: "Size",
            formatted_value: "16 inches",
          },
          {
            property_id: 54,
            value_id: 3,
            formatted_name: "Personalization",
            formatted_value: "",
          },
        ]
      : [
          {
            property_id: 54,
            value_id: 3,
            formatted_name: "Personalization",
            formatted_value: "",
          },
        ];

  useEffect(() => {
    setVariations(
      item?.personalization_details
        ? [
            {
              ...default_array[0],
              ...(item?.personalization_details[0] || {}),
            },
            {
              ...default_array[1],
              ...(item?.personalization_details[1] || {}),
            },
            {
              ...default_array[2],
              ...(item?.personalization_details[2] || {}),
            },
          ]
        : default_array
    );
  }, []);

  useEffect(() => {
    if (variations && variations?.length) {
      let colorObj = variations.filter(
        (item) => item.formatted_name === "Color"
      )[0];
      let sizeObj = variations.filter(
        (item) => item.formatted_name === "Size"
      )[0];
      let personalizationObj = variations.filter(
        (item) => item.formatted_name === "Personalization"
      )[0];

      setSelectedColor(colorObj ? colorObj?.formatted_value : "Gold");
      setSelectedSize(sizeObj ? sizeObj?.formatted_value?.split(" ")[0] : "16");
      setPersonalizationValue(
        personalizationObj ? personalizationObj?.formatted_value : ""
      );
    } else {
      setSelectedColor("Gold");
      setSelectedSize("16");
      setPersonalizationValue("");
    }
  }, [variations]);

  const handleSelectedColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSelectedSize = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleUpdate = () => {
    const updatedData =
      item?.catalog?.id === 27
        ? variations?.map((item, index) => {
            if (index === 0) {
              return {
                ...item,
                formatted_name: "Color",
                formatted_value: selectedColor,
              };
            } else if (index === 1) {
              return {
                ...item,
                formatted_name: "Size",
                formatted_value: `${selectedSize} inches`,
              };
            } else if (index === 2) {
              return {
                ...item,
                formatted_name: "Personalization",
                formatted_value: personalizationValue,
              };
            }

            return item;
          })
        : variations?.map((item) => {
            return {
              ...item,
              formatted_name: "Personalization",
              formatted_value: personalizationValue,
            };
          });

    let payload = { personalization_details: updatedData };

    dispatch(loadingBtnAction(true));
    updateOrder({}, item?.id, dispatch, userType, "", payload);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Update Variations:
      </Typography>
      {item?.catalog?.id === 27 && (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              Select Size:
            </Typography>
            <FormControl>
              <RadioGroup
                defaultValue={
                  variations && variations?.length
                    ? variations[1]?.formatted_value?.split(" ")[0]
                    : "16"
                }
                name="radio-buttons-group"
                value={selectedSize}
                onChange={handleSelectedSize}
              >
                <FormControlLabel value="16" control={<Radio />} label="16“" />
                <FormControlLabel value="18" control={<Radio />} label="18“" />
                <FormControlLabel value="20" control={<Radio />} label="20“" />
                <FormControlLabel value="24" control={<Radio />} label="24“" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              Select Color:
            </Typography>
            <FormControl>
              <RadioGroup
                defaultValue={
                  variations && variations?.length
                    ? variations[0].formatted_value
                    : "Gold"
                }
                name="radio-buttons-group"
                value={selectedColor}
                onChange={handleSelectedColor}
              >
                <FormControlLabel
                  value="Gold"
                  control={<Radio />}
                  label="Gold"
                />
                <FormControlLabel
                  value="Silver"
                  control={<Radio />}
                  label="Silver"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Personalization:</Typography>
        <TextField
          id="personalization_input"
          label="Personalization"
          multiline
          maxRows={4}
          fullWidth
          sx={{ mt: 2 }}
          value={personalizationValue}
          onChange={(event) => {
            setPersonalizationValue(event.target.value);
          }}
        />
      </Box>
      <Box sx={{ textAlign: "end", mt: 3 }}>
        <LoadingButton
          variant="contained"
          loading={loading}
          loadingIndicator={<CircularProgress size={12} color="inherit" />}
          onClick={handleUpdate}
        >
          Update
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateVariations;
