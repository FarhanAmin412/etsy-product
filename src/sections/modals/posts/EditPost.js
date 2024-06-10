import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import EditDocument from "./EditDocument";
import Typography from "@mui/material/Typography";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "src/pages/dashboard/requests";
import RichTextEditor from "react-rte";
import EditImage from "./EditImage";
import EditVideo from "./EditVideo";

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

const EditPost = ({ post, setPosts }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loadingButton);
  const editorRef = React.useRef(null);
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(
      post.content || "What's on your mind?",
      "html"
    )
  );

  /**
   * Handle editor's change.
   * @param {import('react-rte').EditorValue} value Value from the editor.
   */

  function onChange(value) {
    console.log(value.toString("html"));
    setEditorValue(value);
  }

  const [image, setImage] = useState(
    Array.isArray(post.images)
      ? [...post.images]
      : post.images
      ? [post.images]
      : []
  );
  const [video, setVideo] = useState(
    Array.isArray(post.videos)
      ? [...post.videos]
      : post.videos
      ? [post.videos]
      : []
  );
  const [document, setDocument] = useState(
    Array.isArray(post.document)
      ? [...post.document]
      : post.document
      ? [post.document]
      : []
  );
  const [url, setURL] = useState(post.links || "");

  const handleURL = (event) => {
    setURL(event.target.value);
  };
  
  console.log(loading, "loadingBtn");

  console.log(editorValue, "editorValue?._cache?.html");

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger;
    const formData = new FormData();

    if (image.length) {
      for (let i = 0; i < image.length; i++) {
        if (image[i] instanceof Blob || image[i] instanceof File) {
          formData.append("image", image[i]);
        }
      }
    }

    if (video.length) {
      for (let i = 0; i < video.length; i++) {
        if (video[i] instanceof Blob || video[i] instanceof File) {
          formData.append("video", video[i]);
        }
      }
    }
                                                                                                                                                    
    if (document.length) {
      for (let i = 0; i < document.length; i++) {
        if (document[i] instanceof Blob || document[i] instanceof File) {
          formData.append("document", document[i]);
        }
      }
    }

    if (url) {
      formData.append("link", url);
    }

    formData.append("content", editorValue?._cache?.html);
    editPost(post.id, dispatch, formData, setPosts);
  };

  React.useEffect(() => {
    console.log("post", post);
  }, []);

  return (
    <Box sx={{ padding: "12px" }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        Update Post
      </Typography>

      <RichTextEditor onChange={onChange} value={editorValue} ref={editorRef} />

      <Box sx={{ my: 4 }}></Box>

      <EditImage images={image} setImages={setImage} />

      <EditVideo videos={video} setVideos={setVideo} />

      <EditDocument documents={document} setDocuments={setDocument} />

      <Box sx={{ my: 4 }}></Box>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        Any Links?
      </Typography>

      <TextField
        label="URL"
        variant="outlined"
        value={post.links}
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

export default EditPost;
