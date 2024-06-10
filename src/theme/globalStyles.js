// @mui
import {
  CardMedia,
  GlobalStyles as MUIGlobalStyles,
  styled,
} from "@mui/material";

export default function GlobalStyles({ isDashboard }) {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
          overflowY: isDashboard > 0 && "hidden",
        },

        "::-webkit-scrollbar": {
          width: "8px",
          height: "4px",
        },

        "::-webkit-scrollbar-track": {
          background: "transparent",
        },

        "::-webkit-scrollbar-thumb": {
          backgroundColor: "grey",
          borderRadius: "20px",
        },

        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
      }}
    />
  );

  return inputGlobalStyles;
}

export const SmallImage = styled(CardMedia)(() => ({
  width: "80px",
  height: "80px",
  marginRight: 20,
}));
