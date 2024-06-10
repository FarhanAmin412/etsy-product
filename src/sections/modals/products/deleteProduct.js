import React from "react";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";

const DeleteProduct = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Are you sure you want to delete this product?
      </Typography>
      <Stack direction="row" justifyContent={"end"}>
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
          color="error"
          onClick={props.deleteProduct}
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default DeleteProduct;
