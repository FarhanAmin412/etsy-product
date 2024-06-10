import React from "react";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { saveNote } from "src/pages/orders/requests/local/saveNotes";

const DeleteNote = ({ id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);
  const userType = useSelector((state) => state.user.user.type);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Are you sure you want to delete this note?
      </Typography>
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
          variant="contained"
          color="error"
          onClick={() => saveNote(dispatch, id, "", userType, "delete")}
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default DeleteNote;
