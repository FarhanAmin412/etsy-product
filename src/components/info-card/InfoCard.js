import { Stack, Typography, Button, Card, useTheme, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../svg-icons/icon";
import Iconify from "../iconify/Iconify";
import {
  disconnectAmazonyStore,
  disconnectEtsyStore,
} from "src/pages/Stores/request";

const StyledContainer = styled(Card)(({ theme }) => ({
  position: "relative",
  maxWidth: "340px",
  height: "340px",
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "15px",
  margin: "0px",
}));

export default function InfoCard(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const etsyShopName = useSelector((state) => state.user.etsyShopName);
  const amazon_store_connected = localStorage.getItem("amazonStore");

  const isEtsyConnected = props.etsy && etsyShopName ? true : false;
  const isAmazonConnected =
    props.amazon && amazon_store_connected == 1 ? true : false;

  return (
    <StyledContainer>
      <Stack spacing={2}>
        <Stack direction={"row"} alignItems="center">
          <Icon
            icon={props.icon}
            style={{ width: props.amazon ? "60px" : "" }}
          />
          <Typography variant="h6" sx={{ ml: 3 }}>
            {props.title}
          </Typography>
        </Stack>
        <Typography variant="p" sx={{ mb: 5 }}>
          {props.info}
        </Typography>
        {props.amazon && (
          <Typography>
            <b>Info:</b> When you have connected your amazon store. Log out and
            log back in to see changes.
          </Typography>
        )}
        <Box sx={{ position: "absolute", bottom: 10, width: "90%" }}>
          {isEtsyConnected || isAmazonConnected ? (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Iconify
                  icon={"mdi:tick-circle"}
                  color={theme.palette.green.main}
                />
                <Typography variant="body2">
                  {isEtsyConnected
                    ? etsyShopName
                    : isAmazonConnected
                    ? "Connected"
                    : ""}
                </Typography>
              </Stack>

              <Button
                sx={{
                  borderRadius: "16px",
                }}
                color="inherit"
                variant="contained"
                onClick={() => {
                  if (isEtsyConnected) {
                    disconnectEtsyStore(dispatch);
                  } else if (isAmazonConnected) {
                    disconnectAmazonyStore(dispatch);
                  }
                }}
              >
                Disconnect
              </Button>
            </Stack>
          ) : (
            <a
              href={props.link}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                sx={{
                  boxShadow: "none",
                  borderRadius: "20px",
                }}
                fullWidth
                size="large"
                variant="contained"
              >
                Connect
              </Button>
            </a>
          )}
        </Box>
      </Stack>
    </StyledContainer>
  );
}
