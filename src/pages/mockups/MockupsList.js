import React from "react";
import { Box, Card, IconButton, Paper, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import ImageViewPopup from "src/components/image-viewer";
import { useDispatch, useSelector } from "react-redux";
import DeleteMockup from "src/sections/modals/mockups/DeleteMockup";
import { setModalState } from "src/redux/actions/modalActions";
import { StyledPaper } from "./utils";

const MockupsList = ({ item }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  return (
    <StyledPaper variant="outlined">
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ImageViewPopup
          imageSRC={[item?.media]}
          fileName={item?.name}
          sx={{
            top: 0,
            position: "absolute",
            width: "100% ",
            height: "100%",
          }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ px: 2, py: 3 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" noWrap>
          {item.filename}
        </Typography>
        <Box>
          {userType === "Super Admin" && (
            <IconButton
              onClick={() =>
                dispatch(setModalState(<DeleteMockup id={item.id} />))
              }
            >
              <Iconify color="error.main" icon="eva:trash-2-outline" />
            </IconButton>
          )}

          <Iconify
            sx={{ cursor: "pointer" }}
            color="primary.main"
            icon="bi:cloud-download"
            onClick={() => window.open(item.media, "_blank")}
          />
        </Box>
      </Stack>
    </StyledPaper>
  );
};

export default MockupsList;
