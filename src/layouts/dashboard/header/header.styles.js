import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { bgBlur } from "src/utils/cssStyles";

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

export const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  zIndex: 0,
  [theme.breakpoints.up("lg")]: {
    // width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    width: "100%",
  },
  position: "relative",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export const StyledSearchInput = styled("div")(({ theme }) => ({
  width: 800,
  border: `1px solid lightgrey`,
  padding: "10px",
  borderRadius: "30px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
