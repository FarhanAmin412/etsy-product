import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "60%",
  minWidth: "40%",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "15px",
  maxHeight: "calc(100vh - 225px)",
  boxShadow: 4,
  p: 4,
  overflowY: "scroll",

  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.5)",
    outline: "1px solid slategrey",
  },
};

export default function ModalProvider() {
  const ModalOutlet = useSelector((state) => state.modal.openModal);
  const isOpen = !!ModalOutlet;
  const dispatch = useDispatch();

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => dispatch(setModalState(undefined))}
          style={{ zIndex: 3000 }}
          className="modal"
          closeAfterTransition
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
        >
          <Fade in={isOpen}>
            <Box sx={style}>{ModalOutlet}</Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
