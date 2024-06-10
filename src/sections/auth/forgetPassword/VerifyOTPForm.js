import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Stack, TextField, Alert, CircularProgress } from "@mui/material";

// api
import Request from "../../../utils/request";
import { toastify } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { StyledLoadingButton } from "src/pages/auth/login/Login.styles";
import { setActiveStep } from "src/redux/actions/userActions";

const schema = yup.object().shape({
  otp: yup.string().required(),
});

const SendOTPForm = () => {
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const resetEmail = useSelector((state) => state.user.userEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const verifyOTP = async (data) => {
    const payload = {
      ...data,
      email: resetEmail,
    };
    try {
      const res = await Request.post("reset/password/otp", payload);
      if (res) {
        dispatch(setActiveStep(2));
        setLoading(false);
        toastify("success", res.data.message);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      setLoading(false);
    }
  };

  const onSubmitHandler = (data) => {
    setLoading(true);
    reset();
    verifyOTP(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack spacing={3}>
        <TextField
          {...register("otp")}
          type="otp"
          label="OTP"
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
        {errors.otp?.message && (
          <Alert severity="error">{errors.otp?.message}</Alert>
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
        Verify
      </StyledLoadingButton>
    </form>
  );
};

export default SendOTPForm;
