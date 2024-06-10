import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import AddDocument from "./AddDocument";
import Typography from "@mui/material/Typography";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { submitPost } from "src/pages/dashboard/requests";
import RichTextEditor from "react-rte";

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ],
};

export const StyledDropzone = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.grey[200],
  textAlign: "center",
  cursor: "pointer",
}));

const AddPost = ({ setPosts }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loadingButton);
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString("What's on your mind?", "html")
  );

  /**
   * Handle editor's change.
   * @param {import('react-rte').EditorValue} value Value from the editor.
   */

  function onChange(value) {
    value.toString("html");
    setEditorValue(value);
  }

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [url, setURL] = useState("");

  const handleURL = (event) => {
    setURL(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
    }

    if (videos.length) {
      for (let i = 0; i < videos.length; i++) {
        formData.append("video", videos[i]);
      }
    }

    if (documents.length) {
      for (let i = 0; i < documents.length; i++) {
        formData.append("document", documents[i]);
      }
    }

    if (url) {
      formData.append("link", url);
    }

    formData.append("content", editorValue?._cache?.html);
    submitPost(dispatch, formData, setPosts);
  };

  return (
    <Box sx={{ padding: "12px" }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        Add an Update
      </Typography>

      <RichTextEditor onChange={onChange} value={editorValue} />

      <Box sx={{ my: 4 }}></Box>

      <AddImage images={images} setImages={setImages} />

      <AddVideo videos={videos} setVideos={setVideos} />

      <AddDocument documents={documents} setDocuments={setDocuments} />

      <Box sx={{ my: 4 }}></Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        Any Links?
      </Typography>

      <TextField
        label="URL"
        variant="outlined"
        value={url}
        onChange={handleURL}
        fullWidth
      />

      <Box sx={{ my: 4 }}></Box>
      <Stack direction={"row"} justifyContent={"center"} spacing={3}>
        <Button
          variant="contained"
          color="inherit"
          fullWidth
          onClick={() => dispatch(setModalState(undefined))}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          loading={loading}
          loadingIndicator={<CircularProgress size={12} color="inherit" />}
        >
          Confirm
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default AddPost;
