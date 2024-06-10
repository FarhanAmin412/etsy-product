import { Chip, Stack } from "@mui/material";
import React from "react";

const ChatTags = ({ inputValue, setInputValue, setError }) => {
  const handleTagClick = (buttonValue) => {
    if (inputValue && inputValue.includes("@technical_support ")) {
      const updatedString = inputValue.replace(
        new RegExp("@technical_support ", "g"),
        "@general-support "
      );
      setInputValue(updatedString);
    } else if (inputValue && inputValue.includes("@general-support ")) {
      const updatedString = inputValue.replace(
        new RegExp("@general-support ", "g"),
        "@technical_support "
      );
      setInputValue(updatedString);
    } else {
      setInputValue([buttonValue, inputValue].join(" "));
    }
    setError(false);
  };

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"} m={1}>
      <Chip
        label="@technical_support"
        variant="filled"
        size="small"
        onClick={() => handleTagClick("@technical_support")}
      />
      <Chip
        label="@general-support"
        variant="filled"
        size="small"
        onClick={() => handleTagClick("@general-support")}
      />
    </Stack>
  );
};

export default ChatTags;
