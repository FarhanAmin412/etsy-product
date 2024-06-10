import PaymentCards from "./cart/payment";
import { Card, Container, Typography } from "@mui/material";

export default function Payments() {
  return (
    <Container maxWidth="xl" sx={{ margin: "0px", padding: "0px" }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Payment Details
      </Typography>
      <Container>
        <Card>
          <PaymentCards />
        </Card>
      </Container>
    </Container>
  );
}
