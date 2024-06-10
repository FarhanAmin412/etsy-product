import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import request from "src/utils/request";
import { setModalState } from "src/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import scope_icon from "../../../assets/icons/navbar/ic_lock.svg";
import { getScopesData } from "src/pages/scopes";

const AddScope = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);

  const getFormValue = (e) => {
    e.preventDefault();
    let payload = {
      name: e.target.elements.name.value,
    };
    addScope(payload);
  };

  const addScope = async (payload) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post("/scopes", payload);
      if (res) {
        toastify("success", res.data.message);
        dispatch(loadingBtnAction(false));
        dispatch(setModalState(undefined));
        getScopesData(dispatch);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(setModalState(undefined));
      dispatch(loadingBtnAction(false));
    }
  };

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
    >
      <img height={80} width={80} src={scope_icon} alt="wallet icon" />
      <Typography variant="h4" color={"primary.main"} gutterBottom>
        Add a Scope
      </Typography>
      <Typography variant="caption">
        Required format (e.g., order:read)
      </Typography>

      <form onSubmit={(e) => getFormValue(e)} style={{ width: "50%" }}>
        <TextField fullWidth type="text" label="Name" name="name" required />

        <Stack direction="row" justifyContent={"center"} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            onClick={() => dispatch(setModalState(undefined))}
          >
            Cancel
          </Button>
          <Box sx={{ ml: 2 }} />
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddScope;
