import React from "react";
import LaurenCo from "../../../assets/applynow/image4.png";
import Stats1 from "../../../assets/applynow/image10.png";
import Stats2 from "../../../assets/applynow/image8.png";
import Stats3 from "../../../assets/applynow/image7.png";
import Jackie from "../../../assets/applynow/image3.jpg";
import Jesse from "../../../assets/applynow/image1.jpg";

import {
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
  styled,
} from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingBottom: ` ${theme.spacing(4)} !important`,
  margin: "28px 0px",

  "& p ": {
    fontSize: "18px",
  },
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline",
  marginBottom: "16px",
  fontWeight: 600,
  fontSize: "24px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  marginBottom: "12px",

  [theme.breakpoints.up("sm")]: {
    width: "50%",
    height: "50%",
  },
}));

const HightlightText = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#000000",
  margin: "16px auto",
  fontSize: "16px",
  fontWeight: 800,
  lineHeight: "1.5",

  "& .firstLine": {
    padding: "2px 4px",
    width: "fit-content",
    fontWeight: 800,
    backgroundColor: theme.palette.yellow.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  "& .secondLine": {
    lineHeight: "1.5",
    backgroundColor: theme.palette.yellow.main,
    padding: "2px 4px",
    margin: " 0 20px",
    width: "fit-content",
    fontWeight: 800,
    borderRadius: theme.shape.borderRadius,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "25px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SellerStories = ({ myDivRef }) => {
  const scrollToTop = () => {
    if (myDivRef?.current) {
      myDivRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  return (
    <StyledContainer maxWidth="2xl">
      <HightlightText>
        <Typography className={"firstLine"}>
          What Our Sellers Are Saying
        </Typography>
        <Typography className={"secondLine"}>
          After Their First 90 Days in ICP
        </Typography>
      </HightlightText>

      <StyledHeading variant="body2">Lauren & Connor</StyledHeading>

      <StyledCardMedia component="img" image={LaurenCo} alt="LarenConnor" />
      <Box mt={3}>
        <Typography variant="body1">
          In our first 90 days, we sold over $60,000 (including shipping) worth
          of print products on Etsy through Inner Circle Prints. $40,000 of that
          $60,000 came during the 30-day peak window leading up to Mother's Day.
          We've been selling on Etsy for years, but in January we heard that
          Jesse would be launching Inner Circle Prints and we jumped all over
          it! We just knew how crazy of an opportunity it was!
        </Typography>
        <br />
        <Typography variant="body1">
          We launched 25 new products on one of our newer Etsy shops on March
          6th and got our first sale just over 24 hours later. Leading up to
          Mother's Day, we launched about 150 listings and the sales began to
          pour in and have continued since.
        </Typography>
        <br />
        <Typography variant="body1">
          We wanted to thank Jesse and his team for all that they do! In our
          opinion, Inner Circle Prints is the best print provider out there for
          3 main reasons:
          <ol>
            <li>
              Inner Circle Prints offers products that are in high demand on
              Etsy today.
            </li>
            <li>
              Inner Circle Prints offers crazy low prize points where other Etsy
              seller's using traditional print on demand companies cannot
              compete.
            </li>
            <li>Inner Circle Prints ships items the same day or next day.</li>
          </ol>
        </Typography>

        <Typography variant="body1">
          In addition, Jesse, Erica, and the rest of the team are a pleasure to
          work with. They go above and beyond to serve and support their
          customers. We are excited to continue to work with them as we grow our
          business.
        </Typography>
      </Box>
      <StyledCardMedia
        component="img"
        image={Stats1}
        alt="Stats"
        sx={{ margin: "0 auto", width: "100%", height: "100%" }}
      />

      <Box mt={3}>
        <StyledHeading variant="body2">Jackie</StyledHeading>
        <StyledCardMedia component="img" image={Jackie} alt="Jackie" />

        <Typography variant="body1">
          I couldn’t be happier with my experience with ICP. Jesse provides a
          clear path to achieve success if you’re willing to put in the work.
          The one-on-one and group coaching is invaluable, and was the
          foundational reason that allowed me to achieve an impressive amount of
          sales, super fast. ICP provides proven strategies and tactics to make
          achieving a high-level of Etsy success a reality. I would recommend
          ICP to anyone looking to build a successful business on Etsy, and I
          truly consider myself so lucky for the opportunity to learn from them.
        </Typography>
        <StyledCardMedia
          component="img"
          image={Stats2}
          alt="Stats"
          sx={{ margin: "0 auto", width: "100%", height: "100%" }}
        />
      </Box>

      <Box mt={3}>
        <StyledHeading variant="body2">Jessie</StyledHeading>
        <StyledCardMedia component="img" image={Jesse} alt="Jackie" />

        <Typography variant="body1">
          In my first 80 days following Elite POD & using Inner Circle Prints
          for fulfillment, I made 22K in revenue. I have no doubt I'll replace
          my household income by the end of the year. I've been doing print on
          demand for 4 years now and this is THE fastest, full-proof method to
          success. It took me over a year to get to 1K sales in my shop when I
          started four years ago. With my new shop and Jesse's guidance, I hit
          1K sales in my first month and a half. You will still have to do your
          research and put in the work to launch listings that convert, but
          Jesse's blueprint will ensure you win. It's not a get rich quick
          scheme and it's not passive income, but it IS my family's path to
          financial freedom and the life we want to build.
        </Typography>
        <StyledCardMedia
          component="img"
          image={Stats3}
          alt="Stats"
          sx={{ margin: "0 auto", width: "100%", height: "100%" }}
        />
      </Box>
      <Box sx={{ margin: "34px auto", maxWidth: "300px" }}>
        <StyledButton
          fullWidth
          size="large"
          variant="contained"
          onClick={scrollToTop}
        >
          Apply now
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default SellerStories;
