import React from "react";
import Cart from "./Cart";
import FormStepper from "src/components/stepper";
import { Card, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ShippingForm from "./shipping/ShippingForm";
import PaymentCards from "./payment";

const Checkout = () => {
  const steps = ["Cart", "Shipping", "Payment"];
  const activeStep = useSelector((state) => state.user.activeStep);
  
  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
      </Stack>

      <Card sx={{ padding: "40px 0px" }}>
        <Container>
          <FormStepper steps={steps} />
          {activeStep === 0 ? (
            <Cart />
          ) : activeStep === 1 ? (
            <ShippingForm />
          ) : (
            <PaymentCards orderIsPlaced />
          )}
        </Container>
      </Card>
    </Container>
  );
};

export default Checkout;
