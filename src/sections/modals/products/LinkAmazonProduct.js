import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getProductList } from "../../../pages/products/request";
import { toastify } from "src/utils/toast";
import { setModalState } from "src/redux/actions/modalActions";

const LinkAmazonProduct = ({ id, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);

  const getFormValue = (e) => {
    e.preventDefault();
    const sku = e.target.elements.sku.value;
    let formData = new FormData();
    formData.append("product_id", id);
    formData.append("amazon_sku", sku);
    linkProduct(formData);
  };

  const linkProduct = async (payload) => {
    dispatch(loadingBtnAction(true));

    try {
      const res = await request.post("/products/link/amazon", payload);
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
        Link an Amazon Product
      </Typography>
      <form onSubmit={(e) => getFormValue(e)}>
        <TextField
          fullWidth
          type="text"
          label="Amazon SKU"
          name="sku"
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

export default LinkAmazonProduct;
