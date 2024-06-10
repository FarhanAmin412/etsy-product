import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled, useTheme } from "@mui/material/styles";
import defaultAvatar from "../../../assets/images/avatars/avatar_default.jpg";
// components
import Iconify from "../../../components/iconify";
import Request from "../../../utils/request";
import { toastify } from "src/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import {
  getUsers,
  loadingBtnAction,
  loginAction,
} from "src/redux/actions/userActions";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(32).required(),
  lastName: yup.string().min(3).max(32).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "Password length should be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: "#313131",
  borderRadius: "25px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#313131d6",
  },
}));

export default function SignupForm(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.loadingButton);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signUp = async (data) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await Request.post("/register", data);
      var data = res["data"];
      var data_filter = data["data"];
      const token = `Bearer ${data_filter["token"]}`;
      const oauth = data_filter["oauth"];
      const userData = data_filter.user;
      const image = defaultAvatar;

      if (token) {
        dispatch(
          loginAction(
            token,
            userData.id,
            userData.name,
            userData.email,
            image,
            userData.user_type
          )
        );
        navigate("/verification");
        dispatch(loadingBtnAction(false));
        // toastify("success", res.data.message);
        localStorage.setItem("token", token);
        localStorage.setItem("oAuth", oauth);
      }
    } catch (e) {
      dispatch(loadingBtnAction(false));
      toastify("error", e.response.data.message);
    }
  };

  const createUser = async (data) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await Request.post("/users/create", data);

      if (res) {
        dispatch(setModalState(undefined));
        dispatch(loadingBtnAction(false));
        toastify("success", res.data.message);
        dispatch(getUsers(true));
      }
    } catch (e) {
      dispatch(loadingBtnAction(false));
      toastify("error", e.response.data.message);
    }
  };

  const onSubmitHandler = (data) => {
    reset({ keepDirtyValues: true });

    let payload = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    if (props.signup) {
      signUp(payload);
    } else {
      createUser(payload);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={3}>
          <TextField
            {...register("firstName")}
            label="First Name"
            type="text"
            required
          />
          {errors.firstName?.message && (
            <Alert severity="error">{errors.firstName?.message}</Alert>
          )}

          <TextField
            {...register("lastName")}
            label="Last Name"
            type="text"
            required
          />
          {errors.lastName?.message && (
            <Alert severity="error">{errors.lastName?.message}</Alert>
          )}

          <TextField
            {...register("email")}
            label="Email"
            type="email"
            required
          />
          {errors.email?.message && (
            <Alert severity="error">{errors.email?.message}</Alert>
          )}

          <TextField
            {...register("password")}
            label="Password"
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
                        showConfirmPassword
                          ? "eva:eye-fill"
                          : "eva:eye-off-fill"
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

        <StyledLoadingButton
          sx={{ marginTop: "30px" }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          {props.button_title}
        </StyledLoadingButton>
      </form>
    </>
  );
}
