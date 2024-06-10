import React from "react";
import Iconify from "src/components/iconify/Iconify";
import DeleteMockup from "src/sections/modals/mockups/DeleteMockup";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { Box, IconButton, Stack, Typography, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  padding: "8px",
  borderRadius: "16px",
}));

const MockupDocs = ({ docs, index }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `FileName.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
 
  return (
    <StyledStack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={2}>
        <Iconify icon="teenyicons:text-document-solid" color="primary.main" />
        <Typography variant="body2">
          File-{index + 1}.{docs.type}
        </Typography>
      </Stack>
      <Box>
        {userType === "Super Admin" && (
          <IconButton
            onClick={() =>
              dispatch(setModalState(<DeleteMockup id={docs.id} />))
            }
          >
            <Iconify color="error.main" icon="eva:trash-2-outline" />
          </IconButton>
        )}
        <IconButton onClick={() => downloadFile(docs.media)}>
          <Iconify color="primary.main" icon="bi:cloud-download" />
        </IconButton>
      </Box>
    </StyledStack>
  );
};

export default MockupDocs;
