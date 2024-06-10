import {
  Card,
  CardContent,
  Box,
  Typography,
  styled,
  CardMedia,
  Stack,
} from "@mui/material";
import React from "react";
import Logo from "../../../assets/applynow/image2.png";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: theme.palette.primary.main,

  "& .card": {
    width: "80%",
    marginTop: "64px",
  },

  "& .form-container": {
    width: "50%",
    margin: "0 auto",
  },

  "& .button-container": {
    textAlign: "end",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "150px",
  height: "150px",
  marginBottom: "20px",

  [theme.breakpoints.down("sm")]: {
    width: "50%",
    height: "50%",
  },
}));

const SignupNotice = () => {
  return (
    <Container>
      <Card className="card" align="center">
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
          >
            <StyledCardMedia component="img" image={Logo} alt="Paella dish" />
            <Typography
              variant="h3"
              gutterBottom
              sx={{ textDecoration: "underline" }}
            >
              Thank You!
            </Typography>
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            Please check your email to complete the application process.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupNotice;
