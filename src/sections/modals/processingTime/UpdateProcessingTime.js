import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";

const UpdateProcessingTime = ({ item, updateProcessingTime }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: item?.type,
      processing_time: e.target.elements.time.value,
    };
    updateProcessingTime(payload, item?.id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Update Processing Time
      </Typography>
      <Box sx={{ my: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          defaultValue={item?.processing_time}
          label="Processing Time"
          name="time"
          required
        />
        <Box sx={{ my: 2 }} />
        <Stack direction="row" justifyContent={"end"}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => dispatch(setModalState(undefined))}
          >
            Cancel
          </Button>
          <Box sx={{ ml: 2 }} />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Update
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateProcessingTime;
