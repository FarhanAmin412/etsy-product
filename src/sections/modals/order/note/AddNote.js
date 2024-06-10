import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "src/components/ordersTable/utils";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";
import { saveNote } from "src/pages/orders/requests/local/saveNotes";

const AddNote = ({ id, notes }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const [currentValue, setCurrentValue] = useState(notes ? notes : "");
  const isLoading = useSelector((state) => state.user.loadingButton);

  const handleInputChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNote(dispatch, id, currentValue, userType, "add");
        }}
      >
        <Item className="custom-notes">
          <Typography variant="h5" sx={{ mb: 1, color: "primary.main" }}>
            {notes ? "Edit" : "New"} Note
          </Typography>
          <TextField
            id="outlined-multiline-static"
            name="notes"
            placeholder="Add notes here..."
            multiline
            fullWidth
            rows={2}
            value={currentValue}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Item>
        <Stack direction="row" justifyContent={"flex-end"} spacing={2} mt={2}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => dispatch(setModalState(undefined))}
          >
            Cancel
          </Button>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default AddNote;
