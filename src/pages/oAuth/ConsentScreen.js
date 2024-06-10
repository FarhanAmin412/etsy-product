import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  Stack,
  useTheme,
  CircularProgress,
} from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { LoadingButton } from "@mui/lab";
import { parseUrlParameters } from "./utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCredentialValidity, getToken } from "./request";
import { setOAuthData } from "src/redux/actions/oAuthActions";

const ConsentScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const token = localStorage.getItem("token");

  const [checked, setChecked] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.loadingButton);
  const oAuthData = useSelector((state) => state.oAuth.oAuthData);
  const validityStatus = useSelector((state) => state.oAuth.validityStatus);

  const urlObject = currentUrl?.split("?");

  const urlParams = new URL(currentUrl);
  const decline_uri = urlParams.searchParams.get("decline_uri");
  const type = urlParams.searchParams.get("type");
  const state = urlParams.searchParams.get("state");
  const redirect_uri = urlParams.searchParams.get("redirect_uri");
  const scope = urlParams.searchParams.get("scope");
  const client_id = urlParams.searchParams.get("client_id");
  const client_secret = urlParams.searchParams.get("client_secret");

  const scopesArray = scope ? scope.split(" ") : [];

  let data = {
    redirect_uri: redirect_uri,
    state: state,
    scopes: scopesArray,
    client_id: client_id,
    client_secret: client_secret,
    type: type,
  };

  useEffect(() => {
    getCredentialValidity(dispatch, urlObject);
    dispatch(setOAuthData(data));

    if (!token) {
      window.location.href = `/login?frompage=${currentUrl}`;
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    token && (
      <Container
        maxWidth="md"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
          }}
        >
          {validityStatus === "success" ? (
            <>
              <Typography variant="h4" gutterBottom>
                An application would like to connect to your account.
              </Typography>
              <Stack
                direction={"row"}
                spacing={2}
                my={4}
                alignItems={"center"}
                sx={{
                  backgroundColor: theme.palette.primary.lighter,
                  p: 2,
                  width: "fit-content",
                  // margin: "20px auto",
                }}
              >
                <Iconify
                  icon="iconoir:user-circle"
                  sx={{ width: 30, height: 30 }}
                />
                <Typography variant="caption">
                  You are currently signed in as <u>{user.email}</u>. Not you?{" "}
                  <a href={`/login?frompage=${currentUrl}`}>
                    <u>Sign in with different account.</u>
                  </a>
                </Typography>
              </Stack>

              <Typography variant="body1" gutterBottom>
                The application HelloCustom is trying to connect to your
                account.
              </Typography>

              <Typography variant="body1" paragraph>
                By connecting your store, you grant our application access to
                following functionality:
                <ul style={{ marginLeft: "20px" }}>
                  <li>Connect to your account</li>
                  {scopesArray.includes("order:read") && (
                    <li>View your Etsy orders</li>
                  )}
                  {scopesArray.includes("order:write") && (
                    <li>Update your Etsy orders</li>
                  )}
                </ul>
              </Typography>

              <Typography variant="body1" paragraph>
                Please review and accept the terms and conditions before
                proceeding.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="I accept the terms and conditions"
              />
              <Grid container justifyContent="center" spacing={2} mt={2}>
                <Grid item>
                  <a href={decline_uri}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{ color: "#000" }}
                    >
                      Decline
                    </Button>
                  </a>
                </Grid>
                <Grid item>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    disabled={!checked}
                    loading={isLoading}
                    loadingIndicator={
                      <CircularProgress color="inherit" size={16} />
                    }
                    onClick={() => getToken(dispatch, navigate, oAuthData)}
                  >
                    Grant Access
                  </LoadingButton>
                </Grid>
              </Grid>
            </>
          ) : (
            !isLoading &&
            validityStatus && (
              <>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Iconify
                    icon="material-symbols:error"
                    color="red"
                    sx={{ width: 30, height: 30 }}
                  />
                  <div>
                    <Typography variant="h4" gutterBottom>
                      An error occured
                    </Typography>
                  </div>
                </Stack>
                <Typography variant="body1" sx={{ marginLeft: "48px" }}>
                  {validityStatus?.split(":")[1]}
                </Typography>
              </>
            )
          )}
        </Paper>
      </Container>
    )
  );
};

export default ConsentScreen;
