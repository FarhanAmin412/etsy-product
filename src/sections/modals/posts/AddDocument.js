import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Iconify from "src/components/iconify";
import { StyledStack } from "src/pages/mockups/MockupDocs";
import { toastify } from "src/utils/toast";
import { ArticleOutlined } from "@mui/icons-material";

const AddDocument = ({ documents, setDocuments }) => {
  async function onUploadingDocument(e) {
    const file = e.target.files[0];
    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention = tempExtention[tempExtention.length - 1];

      const allowedFileExtentions = ["pdf"];
      if (!allowedFileExtentions.includes(fileExtention.toLowerCase())) {
        toastify("warning", "Please upload valid file type");
        return;
      }

      if (file.size > 20000000) {
        toastify("warning", "File size should be less than 20MB");
        return;
      } else {
        setDocuments([...documents, file]);
      }
    }
  }

  return (
    <>
      <Button variant="contained" component="label" color="inherit" fullWidth>
        <ArticleOutlined sx={{ mr: 1 }} /> Upload a Document
        <input type="file" multiple hidden onChange={onUploadingDocument} />
      </Button>

      <Box sx={{ my: 2 }}></Box>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={3}
        flexWrap={"wrap"}
      >
        {documents?.map((document, index) => {
          let type = document?.name?.split(".")[1];
          return (
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
          );
        })}
      </Stack>
    </>
  );
};

export default AddDocument;
