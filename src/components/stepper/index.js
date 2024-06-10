import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useSelector } from "react-redux";

export default function FormStepper(props) {
  const activeStep = useSelector((state) => state.user.activeStep);
  return (
    <Box sx={{ width: "100%", marginTop: "100px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {props.steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
