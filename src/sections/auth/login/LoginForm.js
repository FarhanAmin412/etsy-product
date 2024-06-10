import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import defaultAvatar from "../../../assets/images/avatars/avatar_default.jpg";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import Request from "../../../utils/request";
import { toastify } from "../../../utils/toast";
import {
  loadingBtnAction,
  loginAction,
  setActiveStep,
} from "src/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledLink,
  StyledLoadingButton,
} from "src/pages/auth/login/Login.styles";
import { setOAuthData } from "src/redux/actions/oAuthActions";
import { parseUrlParameters } from "src/pages/oAuth/utils";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .max(32)
    .required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.loadingButton);

  const currentUrl = window.location.href;
  const urlObject = currentUrl.split("?");
  let getConsentURL =
    urlObject && urlObject?.length > 1 ? urlObject[1]?.split("=")[1] : "";
  const frompage = getConsentURL ? "/app/oauth2/auth?" + urlObject[2] : "";

  const urlParams = frompage ? parseUrlParameters(frompage) : [];
  const { redirect_uri, state, scope, client_id } = urlParams;
  const scopesArray = scope ? scope?.split(" ") : [];

  useEffect(() => {
    let data = {
      redirect_uri: redirect_uri,
      state: state,
      scopes: scopesArray,
      client_id: client_id,
    };

    dispatch(setOAuthData(data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = async (data) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await Request.post("/login", data);
      var response = res["data"];
      var data_filter = response["data"];
      const userData = data_filter.user;
      const token = data_filter["token"];
      const oauth = data_filter["oauth"];
      const etsyStoreConnected = data_filter["etsy_store_connected"];
      const amazonStoreConnected = data_filter["amazon_store_connected"];
      const expiresIn = data_filter["expiresIn"];

      const image = userData.image ? userData.image : defaultAvatar;

      if (token) {
        dispatch(
          loginAction(
            token,
            userData.id,
            userData.name,
            userData.email,
            image,
            userData.UserType
          )
        );

        if (frompage) {
          navigate(frompage);
        } else {
          navigate("/dashboard/app");
        }
        dispatch(loadingBtnAction(false));
        localStorage.setItem("token", token);
        localStorage.setItem("oAuth", oauth);
        localStorage.setItem("etsyStore", etsyStoreConnected);
        localStorage.setItem("amazonStore", amazonStoreConnected);
        localStorage.setItem("expiresIn", expiresIn);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(loadingBtnAction(false));
    }
  };
  const onSubmitHandler = (data) => {
    console.log(data, "data");
    reset();
    login(data);
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

        <TextField
          {...register("password")}
          type={showPassword ? "text" : "password"}
          label="Password"
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Stack direction="row">
          <Checkbox
            className="rememberTest"
            name="remember"
            label="Remember me"
          />
          <span style={{ alignSelf: "center" }}>Remember me</span>
        </Stack>
        <StyledLink
          variant="subtitle2"
          underline="hover"
          to={"/reset-password"}
          onClick={() => dispatch(setActiveStep(0))}
        >
          Forgot password?
        </StyledLink>
      </Stack>

      <StyledLoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Login
      </StyledLoadingButton>
    </form>
  );
};

export default LoginForm;
