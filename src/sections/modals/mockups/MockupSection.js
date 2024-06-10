import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import Iconify from "src/components/iconify/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { addSection, getMockupSections } from "src/pages/mockups/request";
import { LoadingButton } from "@mui/lab";

const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#212B36" : "rgba(145, 158, 171, 0.32)",
    height: "55px",
    borderRadius: "6px",
    zIndex: 9999,
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    maxHeight: "180px",
  }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

const MockupSection = ({ seletedSection, handleChange }) => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const sections = useSelector((state) => state.mockups.sections);
  const loading = useSelector((state) => state.user.loadingButton);

  const options = sections?.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
  }));

  useEffect(() => {
    getMockupSections(dispatch);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const section = e.target.elements.section.value;
    const payload = {
      name: section,
    };
    addSection(dispatch, payload, setShowInput);
  };
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        1. Select a Section:
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FormControl sx={{ minWidth: 300 }}>
          <Select
            options={options}
            defaultValue={seletedSection}
            onChange={handleChange}
            placeholder="Select..."
            styles={styles}
          />
        </FormControl>

        {!showInput && (
          <Button
            variant={"contained"}
            startIcon={<Iconify icon="eva:plus-fill" />}
            size="small"
            onClick={() => setShowInput(true)}
          >
            Add Section
          </Button>
        )}
      </Stack>
      <Box sx={{ my: 4 }}></Box>
      {showInput && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="end">
            <Grid item xs={8}>
              <TextField
                label="Add Section"
                name="section"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                spacing={3}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  type="button"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  loading={loading}
                  loadingIndicator={
                    <CircularProgress size={12} color="inherit" />
                  }
                >
                  Confirm
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default MockupSection;
