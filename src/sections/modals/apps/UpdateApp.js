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
import { setModalState } from "src/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import scope_icon from "../../../assets/icons/navbar/ic_lock.svg";
import oAuthRequest from "src/utils/oAuth";
import { getApps } from "src/pages/apps/request";

const UpdateApp = ({ app }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  const scopes = useSelector((state) => state.oAuth.scopes);

  const getFormValue = (e) => {
    e.preventDefault();

    let payload = {
      name: e.target.elements.name.value,
      redirect_uri: e.target.elements.redirect_uri.value,
      scopes: scopes.map((item) => item.name),
      client_id: app.client_id,
      client_secret: app.client_secret,
    };

    updateApp(payload);
  };

  const updateApp = async (payload) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await oAuthRequest.post(`/app/update/${app?.id}`, payload);
      if (res) {
        toastify("success", res.data.message);
        dispatch(loadingBtnAction(false));
        dispatch(setModalState(undefined));
        getApps(dispatch);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
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
        Update App
      </Typography>

      <form onSubmit={(e) => getFormValue(e)} style={{ width: "50%" }}>
        <TextField
          fullWidth
          defaultValue={app.name}
          type="text"
          label="Name"
          name="name"
          required
        />
        <TextField
          fullWidth
          type="text"
          label="Redirect URI"
          defaultValue={app.redirect_uri}
          name="redirect_uri"
          sx={{ mt: 2 }}
          required
        />

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
            Update
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default UpdateApp;
