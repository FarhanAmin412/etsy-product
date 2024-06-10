import React from "react";
import { useDropzone } from "react-dropzone";
import { StyledDropzone } from "./AddPost";
import { CardMedia, Stack, Typography } from "@mui/material";
import LibraryImg from "../../../assets/images/library.png";

const EditImage = ({ images, setImages }) => {
  const onDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        Attach an image:
      </Typography>

      <StyledDropzone elevation={3} {...getRootProps()}>
        <input {...getInputProps()} multiple />
        <img src={LibraryImg} alt="library" style={{ width: 120 }} />
        <div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Drag Your Files Here
          </Typography>
        </div>
      </StyledDropzone>

      <Stack direction={"row"} spacing={3} sx={{ my: 4 }} flexWrap={"wrap"}>
        {images?.map((file, index) => {
          if (file instanceof Blob || file instanceof File) {
            return (
              <CardMedia
                component={"img"}
                image={URL.createObjectURL(file)}
                alt={file.name}
                sx={{ width: "80px", height: "80px", m: 2 }}
              />
            );
          } else if (!!file) {
            return (
              <CardMedia
                component={"img"}
                image={file}
                alt={file}
                sx={{ width: "80px", height: "80px", m: 2 }}
              />
            );
          }
          return null;
        })}
      </Stack>
    </>
  );
};

export default EditImage;
