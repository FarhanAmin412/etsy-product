import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const SetProcessingTime = ({ time, addProcessingTime }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  const [selected, setSelected] = useState("ornament");
  let getDefaultTime = time?.filter(
    (item) => item?.type.toLowerCase() === selected.toLowerCase()
  );

  const handleSelected = (event) => {
    setSelected(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: selected,
      processing_time: e.target.elements.time.value,
    };
    addProcessingTime(payload);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Processing Time
      </Typography>

      <FormControl>
        <RadioGroup
          defaultValue="ornament"
          name="radio-buttons-group"
          value={selected}
          onChange={handleSelected}
        >
          <FormControlLabel
            value="ornament"
            control={<Radio />}
            label="Ornaments"
          />
          <FormControlLabel
            value="tumbler"
            control={<Radio />}
            label="Tumblers"
          />
          <FormControlLabel
            value="jewelry"
            control={<Radio />}
            label="Jewelry"
          />
        </RadioGroup>
      </FormControl>
      <Box sx={{ my: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          defaultValue={getDefaultTime ? getDefaultTime[0]?.processing_time : 0}
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
            Add
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default SetProcessingTime;
