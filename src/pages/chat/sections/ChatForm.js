import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import Iconify from "src/components/iconify/Iconify";
import { StyledIconButton } from "../utils";
import { sendMessage } from "../request";
import { toastify } from "src/utils/toast";

const ChatForm = () => {
  const theme = useTheme();
  const userType = useSelector((state) => state.user.user.type);
  const replyMessage = useSelector((state) => state.chat.replyMessage);
  const activeChat = useSelector((state) => state.chat.activeChat);

  const [error, setError] = useState(false);
  const [helperText, setHeplerText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState([]);

  const allTags = ["@tumblers", "@ornaments", "@necklaces", "@sofware"];

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.size > 5242880) {
      toastify("warning", "File size should be less than 5MB");
      return;
    } else {
      setFiles(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleTagClick = (tag) => {
    setInputValue([tag, inputValue].join(" "));
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    let message = e.target.elements.message.value;

    const messageId = replyMessage ? replyMessage.id : null;

    if (messageId) {
      formdata.append("message_id", messageId);
    } else {
      if (userType === "Super Admin") {
        formdata.append("user_id", activeChat?.user_id);
      }
    }

    if (files.length > 0) {
      formdata.append("attachment", files[0]);
    }

    formdata.append("message", message);

    if (userType === "Seller") {
      if (inputValue?.includes("@")) {
        setError(false);
        sendMessage(formdata, setInputValue, setFiles);
        setInputValue("");
      } else {
        setError(true);
        setHeplerText("Tagging someone is required");
      }
    } else {
      sendMessage(formdata, setInputValue, setFiles);
    }
  };

  return (
    <>
      {userType === "Seller" && (
        <Stack direction={"row"} spacing={2} alignItems={"center"} m={1}>
          {allTags?.map((tag) => (
            <Chip
              label={tag}
              variant="filled"
              size="small"
              onClick={() => handleTagClick(tag)}
            />
          ))}
          <Typography variant="caption">
            What is this message regarding to?
          </Typography>
        </Stack>
      )}
      <form onSubmit={handleSubmit}>
        <Stack
          sx={{ backgroundColor: "#fff", borderRadius: "16px" }}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            sx={{
              width: "80%",
              "& fieldset": {
                border: "transparent",
              },
            }}
            multiline
            type="text"
            placeholder="Type your message here..."
            name="message"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            error={error}
            helperText={error ? helperText : ""}
            required
          />
          <Box>
            <span {...getRootProps()} style={{ marginRight: "4px" }}>
              <input {...getInputProps()} />
              <IconButton>
                <Iconify icon="mingcute:attachment-line" />
              </IconButton>
            </span>

            <StyledIconButton variant="contained" size="small" type="submit">
              <Send
                sx={{
                  transform: "rotate(320deg)",
                  color: "#fff",
                  fontSize: 16,
                }}
              />
            </StyledIconButton>
          </Box>
        </Stack>
        {files.length > 0 && (
          <Box sx={{ padding: "20px", backgroundColor: "#fff" }}>
            {files?.map((file, index) => {
              let type = file?.name?.split(".")[1];
              return (
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

                    <CardMedia
                      component={"img"}
                      image={URL.createObjectURL(file)}
                      alt={file.name}
                      sx={{ width: "80px", height: "80px" }}
                    />
                  </div>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    {file.name}
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        )}
      </form>
    </>
  );
};

export default ChatForm;
