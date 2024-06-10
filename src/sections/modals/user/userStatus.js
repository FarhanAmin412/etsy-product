import React from "react";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";

const UserStatus = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  
  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Do you want to {props.status === "Active" ? "block" : "activate"} this
        user?
      </Typography>
      <Stack direction="row">
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
          color={props.status === "Active" ? "error" : "primary"}
          onClick={props.changeStatus}
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          {props.status === "Active" ? "block" : "activate"}
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default UserStatus;
