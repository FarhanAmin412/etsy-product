import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CartContainer = styled("div")(() => ({
  width: "800px",
  // minHeight: '100vh',
  padding: "20px",
  margin: "20px auto",
  ".button-container": {
    textAlign: "end",
  },

  ".card-input": {
    width: "100%",
    border: "1px solid rgba(145, 158, 171, 0.32)",
    height: "40px",
    "label:nth-of-type(1)": {
      width: "100%",
    },
  },

  ".card-item": {
    width: "60%",
    border: "1px solid rgba(145, 158, 171, 0.32)",
    height: "80px",
    padding: "15px",
    marginBottom: "20px",

    img: {
      marginRight: "20px",
    },
  },
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  borderBottom: "1px solid lightblue",
  paddingBottom: "14px",
  marginTop: "20px",

  button: {
    height: "42px",
  },
}));
