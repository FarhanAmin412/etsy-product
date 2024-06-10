import {
  Avatar,
  Box,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Iconify from "src/components/iconify/Iconify";
import { StyledStack } from "src/pages/mockups/MockupDocs";

const MockupImage = ({ file, setFiles, type, index }) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={3}
      >
        <div style={{ position: "relative" }}>
          <Avatar
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: theme.palette.primary.main,
              width: "22px",
              height: "22px",
              cursor: "pointer",
            }}
            onClick={() => setFiles([])}
          >
            <Iconify icon={"basil:cross-solid"} color="#fff" />
          </Avatar>
          {type === "psd" || type === "zip" ? (
            <StyledStack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ width: "200px", mb: 3 }}
            >
              <Stack direction={"row"} spacing={2}>
                <Iconify
                  icon="teenyicons:text-document-solid"
                  color="primary.main"
                />
                <Typography variant="body2">
                  Document-{index + 1}.{type}
                </Typography>
              </Stack>
            </StyledStack>
          ) : (
            <CardMedia
              component={"img"}
              image={URL.createObjectURL(file)}
              alt={file.name}
              sx={{ width: "80px", height: "80px" }}
            />
          )}
        </div>

        {type === "psd" || type === "zip" ? (
          ""
        ) : (
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {file.name}
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default MockupImage;
