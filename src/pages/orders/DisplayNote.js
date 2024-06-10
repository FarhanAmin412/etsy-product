import React from "react";
import { useDispatch } from "react-redux";
import { Paper, Stack, Tooltip, Typography } from "@mui/material";
import { setModalState } from "src/redux/actions/modalActions";
import Iconify from "src/components/iconify/Iconify";
import AddNote from "../../sections/modals/order/note/AddNote";
import DeleteNote from "src/sections/modals/order/note/DeleteNote";

const DisplayNote = ({ id, notes }) => {
  const dispatch = useDispatch();

  return (
    <Paper className="notes-container">
      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
        <Typography variant="subtitle1">Note: </Typography>
        <Stack direction={"row"} spacing={1}>
          <Tooltip title={"Delete"} arrow>
            <Iconify
              icon={"eva:trash-2-outline"}
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(setModalState(<DeleteNote id={id} />))}
            />
          </Tooltip>

          <Tooltip title={"Edit"} arrow>
            <Iconify
              icon={"ic:baseline-edit"}
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(setModalState(<AddNote id={id} notes={notes} />))
              }
            />
          </Tooltip>
        </Stack>
      </Stack>
      <Typography variant="body1">{notes}</Typography>
    </Paper>
  );
};

export default DisplayNote;
