import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const PageSelect = ({
  currentPage,
  totalPages,
  handleChangePage,
  direction,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent={"flex-end"}
      alignItems={"center"}
      mx={3}
      spacing={1}
    >
      <Typography variant="body2">Page:</Typography>
      <FormControl variant="filled" size="small" sx={{ paddingTop: "6px" }}>
        <Select
          labelId="page-number"
          id="page-select"
          value={currentPage} 
          label="Page"
          variant="standard"
          disableUnderline
          sx={{
            lineHeight: "1.4375em",
            fontSize: "0.875rem",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: 400,
            flexShrink: 0,
            padding: "4px",
          }}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
            anchorOrigin: {
              vertical: direction,
              horizontal: "left",
            },
            transformOrigin: {
              vertical: direction === "bottom" ? "top" : "bottom",
              horizontal: "left",
            },
          }}
          onChange={(e) => handleChangePage(e, {}, true)}
        >
          {totalPages.map((page, index) => (
            <MenuItem key={`${page}-${index}`} value={page}>
              {page}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default PageSelect;
