import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { toastify } from "src/utils/toast";
import request from "src/utils/request";
import { setModalState } from "src/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { LoadingButton } from "@mui/lab";
import { getProductList } from "src/pages/products/request";

const SetLaunchState = ({ formData, reset, setEtsyLaunched, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const [launchState, setLaunchState] = useState("active");
  const isLoading = useSelector((state) => state.user.loadingButton);

  const handleChange = (event) => {
    setLaunchState(event.target.value);
  };

  const launchProduct = async () => {
    let launchValue = launchState === "active" ? 1 : 0;
    formData.append("is_active", launchValue);

    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post("etsy/add/product", formData);

      if (res) {
        dispatch(loadingBtnAction(false));
        reset();
        dispatch(setModalState(undefined));
        toastify("success", res.data.message);
        getProductList(dispatch, page + 1, rowsPerPage);
        setEtsyLaunched(true);
      }
    } catch (e) {
      dispatch(loadingBtnAction(false));
      toastify("error", e.response.data.message);
    }
  };

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      // sx={{ width: "100%" }}
    >
      <Typography variant="h4">Select Launch State:</Typography>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={"active"}
        name="radio-buttons-group"
        sx={{ mt: 1, width: "50%", margin: "0 auto" }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          spacing={2}
          onClick={() => setLaunchState("active")}
          sx={{
            border:
              launchState === "active"
                ? "2px solid #02b2fe"
                : "1px solid #02b2fe",
            margin: launchState === "active" ? "7.2px 0px" : "8px 0px",
            padding: "8px 0px",
            maxWidth: "460px",
          }}
        >
          <Radio
            checked={launchState === "active"}
            onChange={handleChange}
            value={"active"}
            name="radio-buttons2"
            inputProps={{ "aria-label": "B" }}
          />
          <Typography variant="h6">Active</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems={"center"}
          className="card-item"
          spacing={2}
          onClick={() => setLaunchState("inactive")}
          sx={{
            border:
              launchState === "inactive"
                ? "2px solid #02b2fe"
                : "1px solid #02b2fe",
            margin: launchState === "inactive" ? "7.2px 0px" : "8px 0px",
            padding: "8px 0px",
            maxWidth: "460px",
          }}
        >
          <Radio
            checked={launchState === "inactive"}
            onChange={handleChange}
            value={"inactive"}
            name="radio-buttons1"
            inputProps={{ "aria-label": "A" }}
          />
          <Typography variant="h6">Draft</Typography>
        </Stack>
      </RadioGroup>
      <Box sx={{ my: 1 }} />
      <Stack direction="row" justifyContent={"center"}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => dispatch(setModalState(undefined))}
        >
          Cancel
        </Button>
        <Box sx={{ ml: 2 }} />
        <LoadingButton
          variant="contained"
          onClick={launchProduct}
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Launch
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default SetLaunchState;
