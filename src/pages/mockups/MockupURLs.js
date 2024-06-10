import React from "react";
import Iconify from "src/components/iconify/Iconify";
import { toastify } from "src/utils/toast";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import DeleteMockup from "src/sections/modals/mockups/DeleteMockup";

const MockupURLs = ({ urls }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  const copyURLToClipboard = (urlToCopy) => {
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        toastify("success", "URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  const formattedURL = decodeURIComponent(urls?.media).replace(/%2F/g, "/");

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography variant="body2" sx={{ textDecoration: "underLine" }}>
        <a
          style={{ color: "#000" }}
          href={urls.media}
          target="_blank"
          rel="noopener"
        >
          {formattedURL}
        </a>
      </Typography>
      <Box>
        {userType === "Super Admin" && (
          <IconButton
            onClick={() =>
              dispatch(setModalState(<DeleteMockup id={urls.id} />))
            }
          >
            <Iconify color="error.main" icon="eva:trash-2-outline" />
          </IconButton>
        )}
        <IconButton onClick={() => copyURLToClipboard(urls.media)}>
          <Iconify icon="tabler:copy" color="primary.main" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default MockupURLs;
