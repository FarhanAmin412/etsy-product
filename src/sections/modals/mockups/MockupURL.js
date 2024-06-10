import { LoadingButton } from "@mui/lab";
import { CircularProgress, Grid, TextField } from "@mui/material";
import React from "react";

const MockupURL = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          label="Input"
          variant="outlined"
      
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          // loading={loadingButton}
          loadingIndicator={<CircularProgress size={12} color="inherit" />}
        >
          Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default MockupURL;
