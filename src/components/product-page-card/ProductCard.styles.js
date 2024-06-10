import { styled } from "@mui/material/styles";
import {
  Button,
  CardMedia,
  CardContent,
  Card,
  Box,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledRoot = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "30px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    padding: "24px",
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    // width: '400px',
    // margin:'auto'
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  // width: '60%',
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  // flex: '1 0 auto',
  padding: "10px 70px",
  [theme.breakpoints.down("lg")]: {
    padding: "24px",
  },

  ".canva-input": {
    width: "80%",
    // marginTop: "8px",

    fieldset: {
      border: "transparent",
    },
    input: {
      padding: 0,
    },
    label: {
      top: -8,
    },
  },
}));

export const StyledDesignButton = styled(Button)(({ theme }) => ({
  width: "350px",
  borderRadius: "40px",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    width: "300px",
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  maxWidth: "350px",
  borderRadius: "40px",
}));

export const StyledCanvaURl = styled("div")(({ theme }) => ({
  background: "#d3d3d347",
  border: "1px solid gray",
  padding: "10px 0px",
  borderRadius: "10px",
  margin: "5px 0px",
  maxWidth: "350px",
}));

export const StyledImageUpload = styled("label")(({ theme }) => ({
  background: "#d3d3d347",
  border: "1px solid gray",
  padding: "10px 0px",
  borderRadius: "10px",
  margin: "5px 0px",
  maxWidth: "350px",
}));

export const StyledDesignBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // width: '50%',
  [theme.breakpoints.down("md")]: {
    width: "100%",
    // padding:'20px',
  },
}));

export const EditImageContainer = styled(Button)(({ theme }) => ({
  height: "54px",
  minWidth: "60px",
  borderRadius: "50%",
  backgroundColor: "#02B2FE",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  position: "absolute",
  top: -8,
  right: -8,
  textAlign: "-webkit-right",

  "&:hover": {
    backgroundColor: "#0097d9 !important",
  },
}));

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#02B2FE",
    boxShadow: theme.shadows[8],
    fontSize: 14,
  },
}));

export const StyledEditBox = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[300],
  fontWeight: 700,
  borderRadius: "40px",
  textAlign: "center",
  fontSize: "0.9375rem",
  minWidth: "64px",
  maxWidth: "340px",
  padding: "8px 22px",
  lineHeight: "1.7142857142857142",
}));
