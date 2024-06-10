import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { SignupForm } from "../../auth/signup";

const CreateUsers = () => {
  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Create New User
      </Typography>
      <SignupForm button_title="create new user" />
    </Box>
  );
};

export default CreateUsers;
