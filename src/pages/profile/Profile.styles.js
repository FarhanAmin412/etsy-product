import { LoadingButton } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  position: "relative",
  textAlign: "-webkit-right",

  label: {
    color: "#000",
    minWidth: "40px",

    "&:hover": {
      backgroundColor: "#5ad9ae",
    },
  },
}));

export const EditIconContainer = styled(Button)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#94e5ca",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  position: "absolute",
  top: -8,
  right: -8,
  textAlign: "-webkit-right",
}));


export const ColorButton = styled(LoadingButton)(({ theme }) => ({
  // color: theme.palette.getContrastText(purple[500]),
  color: "white",
  backgroundColor: "#434343",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: `#434343`,
  },
}));
