import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastify } from "src/utils/toast";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Typography, Divider, styled } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import {
  StyledRoot,
  StyledContent,
  StyledSection,
  SignUp,
  TitleWrapper,
  FormContainer,
} from "../../pages/auth/login/Login.styles";
import Logo from "src/components/logo/Logo";
import useResponsive from "src/hooks/useResponsive";
import FormStepper from "src/components/stepper";
import request from "src/utils/request";
import {
  loadingAction,
  loadingBtnAction,
  loginAction,
} from "src/redux/actions/userActions";
import Iconify from "src/components/iconify/Iconify";
import layoutImg from "../../assets/images/authentication/layout.png";
import SellerStories from "src/pages/auth/register/SellerStories";

const AuthLayout = (props) => {
  const mdUp = useResponsive("up", "md");
  const myDivRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  const steps = ["Send OTP to Email", "Verify OTP code", "Reset Password"];
  const clientId =
    "469901868785-n9j8jifnstss57uo159onk88rpk4i218.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    dispatch(loadingAction(false));
    dispatch(loadingBtnAction(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuccess = (res) => {
    if (res) {
      const data = {
        email: res.profileObj.email,
        name: res.profileObj.name,
      };

      googleLogin(data);
    }
  };

  const googleLogin = async (data) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post("/login/google", data);
      var response = res["data"];
      var data_filter = response["data"];
      const userData = data_filter.user;
      const token = data_filter["token"];
      const oauth = data_filter["oauth"];
      const image = "/assets/images/avatars/avatar_default.jpg";
      if (res) {
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
        navigate("/dashboard/app");
        dispatch(loadingBtnAction(false));
        localStorage.setItem("token", token);
        localStorage.setItem("oAuth", oauth);
      }
    } catch (e) {
      if (e.response.status === 400) {
        navigate("/verification");
      }
      toastify("error", e.response.data.message);
      dispatch(loadingBtnAction(false));
    }
  };

  const onFailure = (err) => {
    console.log(err, "err");
  };

  const Main = styled("div")(({ theme }) => ({
    flexGrow: 1,
    maxHeight: "120vh",

    // [theme.breakpoints.down("sm")]: {
    //   paddingBottom: theme.spacing(26),
    // },
  }));

  return (
    <>
      <Helmet>
        <title> {props.title} </title>
      </Helmet>
      <StyledRoot>
        <span ref={myDivRef} />
        <Main>
          <Container maxWidth="sm">
            <StyledContent>
              <div style={{ paddingTop: "40px" }}>
                <Logo href="/" />
              </div>

              {props.goBack && (
                <div style={{ padding: "16px 0px" }}>
                  <NavLink to={"/login"}>
                    <Iconify icon="bi:arrow-left-short" color="primary.main" />
                    Back to login
                  </NavLink>
                </div>
              )}
              {props.reset && <FormStepper steps={steps} />}
              {props.signup && (
                <Typography
                  variant="body2"
                  color={"primary.main"}
                  className="mt-2 mb-3"
                  sx={{ fontStyle: "italic", fontWeight: "600" }}
                >
                  Ready to Unlock Untapped Product Types in the Print on Demand
                  Space and Get World Class Coaching From a Top 100 Etsy Seller
                  in the World?
                </Typography>
              )}
              <FormContainer props={props}>
                <Typography variant="h4" gutterBottom>
                  {props.heading}
                </Typography>

                {props.form}

                {!props.reset && (
                  <>
                    <Divider sx={{ my: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        OR
                      </Typography>
                    </Divider>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Sign in with Google"
                      onSuccess={onSuccess}
                      loading={isLoading}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      className="GOOGLE"
                    />
                  </>
                )}
                {props.login && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, mb: 5, textAlign: "center" }}
                  >
                    Don’t have an account? {""}
                    <Link variant="subtitle2" to="/signup">
                      Apply Now
                    </Link>
                  </Typography>
                )}
              </FormContainer>
            </StyledContent>
          </Container>
        </Main>

        {mdUp && (
          <StyledSection>
            {!props.signup && (
              <SignUp to="/signup" size="large" variant="outlined">
                Apply Now
              </SignUp>
            )}
            <TitleWrapper>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 1 }}>
                We Are Ready To Serve You
              </Typography>

              <Typography variant="p" sx={{ wordBreak: "word-wrap" }}>
                #InnerCirclePrintsFamily
              </Typography>
            </TitleWrapper>
            <img
              style={{ width: "800px", margin: "auto" }}
              src={layoutImg}
              alt="login"
            />
          </StyledSection>
        )}
      </StyledRoot>
      {props.signup && <SellerStories myDivRef={myDivRef} />}
      {/* <GuestFooter /> */}
    </>
  );
};

export default AuthLayout;
