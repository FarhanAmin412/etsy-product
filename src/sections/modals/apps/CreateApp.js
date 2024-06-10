import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
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
import { isEmpty } from "lodash";

const CreateApp = ({ scopes }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const getFormValue = (e) => {
    e.preventDefault();
    let payload = {
      name: e.target.elements.name.value,
      redirect_uri: e.target.elements.redirect_uri.value,
      scopes: !isEmpty(checkedItems)
        ? Object.keys(checkedItems).filter((key) => checkedItems[key] === true)
        : [],
    };

    createApp(payload);
  };

  const createApp = async (payload) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await oAuthRequest.post("/app/create", payload);
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
        Create an app
      </Typography>

      <form onSubmit={(e) => getFormValue(e)} style={{ width: "50%" }}>
        <TextField fullWidth type="text" label="Name" name="name" required />
        <TextField
          fullWidth
          type="text"
          label="Redirect URI"
          name="redirect_uri"
          sx={{ mt: 2 }}
          required
        />

        <FormGroup>
          {scopes?.map((item, index) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  name={item.name}
                  checked={checkedItems[item.name] || false}
                  onChange={handleCheckboxChange}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>

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
            Create
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreateApp;
