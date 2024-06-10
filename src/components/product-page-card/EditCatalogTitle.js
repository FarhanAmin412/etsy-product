import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const EditCatalogTitle = ({ productTitle, onChange }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "350px" },
        mb: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Product Title
      </Typography>

      <TextField
        label="Product Title"
        variant="outlined"
        type="text"
        value={productTitle}
        onChange={onChange}
      />
    </Box>
  );
};

export default EditCatalogTitle;
