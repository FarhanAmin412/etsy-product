import { Container, Stack, Typography } from "@mui/material";
import { config } from "src/utils/config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import etsy_icon from "../../assets/icons/etsy.svg";
import amazon_icon from "../../assets/icons/Amazon_icon.png";
import InfoCard from "../../components/info-card/InfoCard";
import { getEtsyShop } from "./request";

export default function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
    getEtsyShop(dispatch);
  }, []);

  const EtsyLink = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri= ${
    config.apiUrl
  }/oauth&scope=listings_r%20listings_w%20shops_r%20shops_w%20profile_r%20profile_w%20transactions_r%20transactions_w&client_id=c3f3ejj8l0jra9u06rukbxxx&state=${localStorage.getItem(
    "oAuth"
  )}&code_challenge=3ERlZgHM0JsbTM95OAxzZvD4ggq5xYgnf7yC2F-jJS8&code_challenge_method=S256`;
  const AmazonLink = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.6ac59542-55dc-4486-9d5b-edee1dc63dcf&redirect_uri=${
    config.apiUrl
  }/oauth/amazon&state=${localStorage.getItem("oAuth")}`;

  return (
    <Container maxWidth="xl" sx={{ margin: "0px", padding: "0px" }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Stores
      </Typography>
      <Stack direction={"row"} spacing={4} flexWrap={"wrap"}>
        <InfoCard
          title={"Etsy"}
          info={
            "Etsy provides a fast and easy way to get started selling and reach over 96 million active buyers worldwide."
          }
          icon={etsy_icon}
          link={EtsyLink}
          etsy
        />
        <InfoCard
          title={"Amazon"}
          info={
            "Amazon allows any seller to start, manage, and grow their Amazon business."
          }
          icon={amazon_icon}
          link={AmazonLink}
          amazon
        />
      </Stack>
    </Container>
  );
}
