import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import MockupImage from "./MockupImage";
import MockupSection from "./MockupSection";
import Typography from "@mui/material/Typography";
import LibraryImg from "../../../assets/images/library.png";
import { useDropzone } from "react-dropzone";
import { setModalState } from "src/redux/actions/modalActions";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { submitMockup } from "src/pages/mockups/request";

const StyledDropzone = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.grey[200],
  textAlign: "center",
  cursor: "pointer",
}));

const AddMockup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [loadingButton, setLoadingButton] = useState();
  const [seletedSection, setSelectedSection] = React.useState("");
  const [isDropzoneDisabled, setIsDropzoneDisabled] = useState(true);
  const [selected, setSelected] = React.useState("document");
  const [url, setURL] = useState("");
  const sections = useSelector((state) => state.mockups.sections);

  const handleSelected = (event) => {
    setSelected(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedSection(event);
    setIsDropzoneDisabled(false);
  };

  const handleURL = (event) => {
    setURL(event.target.value);
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingButton(true);
    const formData = new FormData();

    if (selected === "document") {
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          formData.append("media", files[i]);
        }
      }
    } else {
      formData.append("url", url);
    }

    formData.append("section_id", seletedSection?.id);
    formData.append("name", seletedSection?.label);
    formData.append("description", "description");

    submitMockup(dispatch, formData, setLoadingButton, sections[0]?.id);
  };

  return (
    <Box sx={{ padding: "12px" }}>
      <MockupSection
        seletedSection={seletedSection}
        handleChange={handleChange}
      />

      <Box sx={{ my: 4 }}></Box>

      <Typography variant="h5" sx={{ mb: 1.5 }}>
        2. What are you adding:
      </Typography>

      <FormControl>
        <RadioGroup
          defaultValue="document"
          name="radio-buttons-group"
          value={selected}
          onChange={handleSelected}
        >
          <FormControlLabel value="document" control={<Radio />} label="File" />
          <FormControlLabel value="url" control={<Radio />} label="URL" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ my: 4 }}></Box>
      {selected === "document" ? (
        <>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            Add a file:
          </Typography>

          <StyledDropzone
            elevation={3}
            {...getRootProps()}
            className={isDropzoneDisabled ? "disabled-dropzone" : ""}
          >
            <input
              {...getInputProps()}
              multiple
              disabled={isDropzoneDisabled}
            />
            <img src={LibraryImg} alt="library" style={{ width: 120 }} />
            <div>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Drag Your Files Here
              </Typography>
            </div>
          </StyledDropzone>
          <Box sx={{ my: 4 }}></Box>
          {files?.map((file, index) => {
            let type = file?.name?.split(".")[1];
            return (
              <MockupImage
                file={file}
                setFiles={setFiles}
                type={type}
                index={index}
              />
            );
          })}
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            Add a url:
          </Typography>

          <TextField
            label="URL"
            variant="outlined"
            disabled={isDropzoneDisabled}
            value={url}
            onChange={handleURL}
            fullWidth
          />
        </>
      )}

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
          disabled={files?.length || url ? false : true}
          onClick={handleSubmit}
          loading={loadingButton}
          loadingIndicator={<CircularProgress size={12} color="inherit" />}
        >
          Confirm
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default AddMockup;
