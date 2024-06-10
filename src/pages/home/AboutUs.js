import React from "react";
import Header from "./header";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import landingPage from "../../assets/demo/image6.png";
import loginPage from "../../assets/demo/image8.png";
import dashboardPage from "../../assets/demo/image1.png";
import ordersPage from "../../assets/demo/image3.png";
import productsPage from "../../assets/demo/image5.png";
import storePage from "../../assets/demo/image4.png";
import catalogPage from "../../assets/demo/image10.png";
import inventory from "../../assets/demo/image7.png";
import demoVideo from "../../assets/demo/ICP-demo.mp4";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,

  "& .card": {
    margin: "120px 32px 0px 32px",
  },

  "& .text": {
    marginBottom: theme.spacing(3),
  },
}));

const DescriptionCard = ({ fistContent, secondContent, image }) => {
  return (
    <Grid container alignItems={"center"} spacing={4} marginBottom={5}>
      <Grid
        item
        xs={6}
        container
        justifyContent={image ? "flex-end" : "flex-start"}
      >
        {fistContent}
      </Grid>
      <Grid
        item
        xs={6}
        container
        justifyContent={image ? "flex-end" : "flex-start"}
      >
        {secondContent}
      </Grid>
    </Grid>
  );
};

const AboutUs = () => {
  return (
    <>
      <Header />
      <Container>
        <Card className="card">
          <CardContent>
            <Typography variant="h3" className="mb-3">
              About Us
            </Typography>
            <Typography variant="body1" className="text">
              Welcome to the Inner Circle Prints application! We are beyond
              excited to serve you with our user friendly software and strategic
              print product categories that are not found elsewhere. We ensure
              the highest quality prints to bring your designs to life on every
              single order. Our application has a major focus on personalization
              ease making your custom designing process easier and more accurate
              than ever.
            </Typography>
            <Typography variant="body1" className="text">
              Not only do we provide you with the best print product categories
              that are not easily accessible for other sellers, we also have
              some of the fastest turn around times in the market. We average a
              1-2 day processing time on all orders, no matter the size! We
              can’t wait to serve you and help you grow your print products
              business to the next level. If you have any questions, please
              contact us at support@innercircleprints.com.
            </Typography>
            <Typography variant="body1" className="text">
              Here is a demo video that explains different components of Inner
              Circle Prints:
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} mb={5}>
              <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="600"
                height="370"
                data-setup="{}"
              >
                <source src={demoVideo} type="video/mp4" />
              </video>
            </Stack>

            <DescriptionCard
              fistContent={
                <>
                  <Typography variant="body1" className="text">
                    Inner Circle Prints is a fulfillment company for strategic
                    product categories that are only offered to our exclusive
                    clients. We have a major focus on personalization ease and
                    order management, and we are currently integrated with
                    Etsy.com.
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>
                    "Since going live with our sellers in March of 2023, they
                    have sold over $350,000 worth of goods."
                  </Typography>
                </>
              }
              secondContent={
                <CardMedia component="img" image={landingPage} alt="about" />
              }
              image
            />

            <DescriptionCard
              fistContent={
                <CardMedia component="img" image={loginPage} alt="about" />
              }
              secondContent={
                <Typography variant="body1" className="text">
                  Here is where our users can login to access their accounts
                  with our software.
                </Typography>
              }
            />

            <DescriptionCard
              fistContent={
                <Typography variant="body1" className="text">
                  On dashboard, there are stats such as total revenue generated
                  from fulfilled orders, on hold orders, in production orders
                  and fulfilled orders total count. There are recent orders on
                  the bottom showing up to 10 orders.
                </Typography>
              }
              secondContent={
                <CardMedia component="img" image={dashboardPage} alt="about" />
              }
              image
            />

            <DescriptionCard
              fistContent={
                <CardMedia component="img" image={storePage} alt="about" />
              }
              secondContent={
                <Typography variant="body1" className="text">
                  Storefronts that user account is connected to. Here more
                  stores will be added where users can connect their store and
                  manage orders with customized graphics more efficiently.
                </Typography>
              }
            />

            <DescriptionCard
              fistContent={
                <Typography variant="body1" className="text">
                  <h3> Listing:</h3> <br />
                  Currently we are listing two main products in our catalog that
                  are ornaments and tumblers. The sellers that have expertise in
                  designing ornaments and tumblers use our services to
                  personalize the products by adding edited graphics to our
                  catalog products and can save them. This product can either be
                  launched to Etsy.com or it can also be linked to an Etsy.com
                  product.
                </Typography>
              }
              secondContent={
                <CardMedia component="img" image={catalogPage} alt="about" />
              }
              image
            />

            <DescriptionCard
              fistContent={
                <CardMedia component="img" image={productsPage} alt="about" />
              }
              secondContent={
                <Typography variant="body1" className="text">
                  User Products page contains search bar, listing to storefronts
                  features and contact for support. Users can launch the product
                  and also link the products as well.
                </Typography>
              }
            />

            <DescriptionCard
              fistContent={
                <Typography variant="body1" className="text">
                  <h3> Inventory:</h3> <br />
                  Current Status of Orders, Order Date, Amount, Customer Name,
                  Order number, Tracking ID (once shipped). Edit Address, Delete
                  Order, Approve Order (buttons) Image Preview for Product,
                  Product Name, Graphic, Ready for Approval and FInalized
                  Graphic.
                </Typography>
              }
              secondContent={
                <CardMedia component="img" image={inventory} alt="about" />
              }
              image
            />

            <DescriptionCard
              fistContent={
                <CardMedia component="img" image={ordersPage} alt="about" />
              }
              secondContent={
                <Typography variant="body1" className="text">
                  <h3>Order management:</h3> <br />
                  <ul>
                    <li>
                      Sellers connect their store to Inner Circle Prints. The
                      customers that have placed the order on the e-commerce
                      website against an Inner Circle Prints customized product
                      are fetched into our system and can easily be managed. We
                      are also providing the process locally as well. Sellers
                      can place orders on Inner Circle Prints on the behalf of
                      the customers and add personalized graphic images.
                    </li>
                    <li>
                      The main functionality is to upload a finalized graphic
                      according to customers' likings. Sellers use Canva to
                      personalize the products and then upload them to our
                      system. From there the orders are approved and sent to
                      shipstation for shipment.
                    </li>
                  </ul>
                </Typography>
              }
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AboutUs;
