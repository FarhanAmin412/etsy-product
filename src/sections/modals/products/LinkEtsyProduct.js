import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getProductList } from "../../../pages/products/request";
import { toastify } from "src/utils/toast";
import { setModalState } from "src/redux/actions/modalActions";

const LinkEtsyProduct = ({ id, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);

  const getFormValue = (e) => {
    e.preventDefault();
    const listingID = e.target.elements.listingID.value;
    let formData = new FormData();
    formData.append("product_id", id);
    formData.append("listing_id", listingID);
    linkProduct(formData);
  };

  const linkProduct = async (payload) => {
    dispatch(loadingBtnAction(true));

    try {
      const res = await request.post("/products/link/etsy", payload);
      if (res) {
        dispatch(loadingBtnAction(false));
        toastify("success", res.data.message);
        dispatch(setModalState(undefined));
        getProductList(dispatch, page + 1, rowsPerPage);
      }
    } catch (e) {
      dispatch(loadingBtnAction(false));
      toastify("error", e.response.data.message);
    }
  };

  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Link an Etsy Product
      </Typography>
      <form onSubmit={(e) => getFormValue(e)}>
        <TextField
          fullWidth
          type="text"
          label="Product Listing ID"
          name="listingID"
          required
        />

        <LoadingButton
          sx={{ marginTop: "30px", borderRadius: "16" }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          loadingIndicator={<CircularProgress size={16} color="inherit" />}
        >
          Link Product
        </LoadingButton>
      </form>
    </Box>
  );
};

export default LinkEtsyProduct;
