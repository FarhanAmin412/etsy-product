import { VideoCameraBackOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { toastify } from "src/utils/toast";

const EditVideo = ({ videos, setVideos }) => {
  const [loadingVideo, setLoadingVideo] = useState(false);

  async function onUploadingVideo(e) {
    setLoadingVideo(true);
    const file = e.target.files[0];
    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention = tempExtention[tempExtention.length - 1];
      console.log(fileExtention, "fileExtention");
      const allowedFileExtentions = ["mp4"];
      if (!allowedFileExtentions.includes(fileExtention.toLowerCase())) {
        setLoadingVideo(false);
        toastify("warning", "Please upload valid file type");
        return;
      }

      if (file.size > 20000000) {
        setLoadingVideo(false);
        toastify("warning", "File size should be less than 20MB");
        return;
      } else {
        setLoadingVideo(false);
        setVideos([...videos, file]);
      }
    }
  }
  return (
    <>
      <Button variant="contained" component="label" color="inherit" fullWidth>
        <VideoCameraBackOutlined sx={{ mr: 1 }} /> Upload a Video
        <input type="file" multiple hidden onChange={onUploadingVideo} />
      </Button>
      {loadingVideo ? <LinearProgress /> : <></>}
      <Box sx={{ my: 2 }}></Box>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={3}
        flexWrap={"wrap"}
      >
        {videos.map((video, index) => {
          if (video instanceof Blob || video instanceof File) {
            return (
              <CardMedia
                key={index}
                component="video"
                controls
                height="150"
                style={{ width: "200px", margin: "4px" }}
                src={URL.createObjectURL(video)}
                title="Video"
              />
            );
          } else if (!!video) {
            return (
              <CardMedia
                key={index}
                component="video"
                controls
                height="150"
                style={{ width: "200px", margin: "4px" }}
                src={video}
                title="Video"
              />
            );
          }
          return null;
        })}
      </Stack>
    </>
  );
};

export default EditVideo;
