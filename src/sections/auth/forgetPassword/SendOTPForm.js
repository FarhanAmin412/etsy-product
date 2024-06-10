import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import Iconify from "../../../components/iconify";

// api
import Request from "../../../utils/request";
import { toastify } from "../../../utils/toast";
import {
  loginAction,
  setActiveStep,
  setUserEmail,
} from "src/redux/actions/userActions";
import { useDispatch } from "react-redux";
import {
  StyledBackButton,
  StyledLoadingButton,
} from "src/pages/auth/login/Login.styles";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const SendOTPForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sendOTP = async (data) => {
    try {
      const res = await Request.post("/reset/password/otp", data);

      if (res) {
        dispatch(setUserEmail(data.email));
        dispatch(setActiveStep(1));
        toastify("success", "An OTP code has been send to your email.");

        setLoading(false);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      setLoading(false);
    }
  };

  const onSubmitHandler = (data) => {
    setLoading(true);
    reset();
    sendOTP(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack spacing={3}>
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          required
          sx={{
            marginTop: "0px",
            styleOverrides: {
              "&.MuiListItem-root": {
                marginTop: "0px",
              },
            },
          }}
        />
        {errors.email?.message && (
          <Alert severity="error">{errors.email?.message}</Alert>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>

      <StyledLoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Continue
      </StyledLoadingButton>
    </form>
  );
};

export default SendOTPForm;
