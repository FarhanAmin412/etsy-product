import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

// api
import Request from "../../../utils/request";
import { toastify } from "../../../utils/toast";
import { useSelector } from "react-redux";
import { StyledLoadingButton } from "src/pages/auth/login/Login.styles";
import Iconify from "../../../components/iconify";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let navigate = useNavigate();
  const resetEmail = useSelector((state) => state.user.userEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const resetPassword = async (data) => {
    const payload = {
      ...data,
      email: resetEmail,
    };
    try {
      const res = await Request.post("reset/password/set", payload);
      if (res) {
        navigate("/login");
        toastify("success", res.data.message);
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
    resetPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack spacing={3}>
        <TextField
          {...register("password")}
          label="New Password"
          type={showPassword ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
            maxLength: 25,
            minLength: 8,
          }}
        />
        {errors.password?.message && (
          <Alert severity="error">{errors.password?.message}</Alert>
        )}

        <TextField
          {...register("password_confirmation")}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
            maxLength: 25,
            minLength: 8,
          }}
        />
        {errors.password_confirmation?.message && (
          <Alert severity="error">
            {errors.password_confirmation?.message}
          </Alert>
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
        Reset Password
      </StyledLoadingButton>
    </form>
  );
};

export default ResetPasswordForm;
