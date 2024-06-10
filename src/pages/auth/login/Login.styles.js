import { styled } from "@mui/material/styles";
import { Link as routerLink } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const FormContainer = styled("div")(({ props, theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    height: props.reset ? "40vh" : props.login ? "88vh" : props.signup ? "" :"74vh",
  },
}));

export const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  paddingBottom: ` ${theme.spacing(8)} !important`,
  // backgroundColor: theme.palette.background.default,
  backgroundImage: `url(/assets/images/authentication/bg.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "20px",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  // minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(2, 0),
}));

export const TitleWrapper = styled("div")(({ theme }) => ({
  textAlign: "-webkit-center",
  padding: "0px 20px",
}));

export const SignUp = styled(routerLink)(({ theme }) => ({
  textAlign: "-webkit-right",
  minWidth: "150px",
  marginLeft: "auto",
  borderRadius: "25px",
  backgroundColor: "#02B2FE",
  color: "#ffffff",
  padding: "10px",
  border: "1px solid",
  // width: '150px',
  textAlign: "-webkit-center",
  "&:hover": {
    textDecoration: "underLine",
    color: "#ffffff",
  },
}));

export const StyledLink = styled(routerLink)(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  lineHeight: 1.5714285714285714,
  fontSize: "0.875rem",
  fontFamily: "Public Sans,sans-serif",
  color: "#02B2FE",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underLine",
  },
}));

export const StyledGoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#F4F8FA",
  borderRadius: "25px",
  boxShadow: "none",
  // '&:hover': {
  //   backgroundColor: '#313131d6',
  // },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: "#313131",
  borderRadius: "25px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#313131d6",
  },
}));

export const StyledBackButton = styled(Button)(({ theme }) => ({
  marginTop: "18px",
  textTransform: "none",
  backgroundColor: "#DFE3E8",
  color: "#212B36",
  borderRadius: "25px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#C4CDD5",
  },
}));
