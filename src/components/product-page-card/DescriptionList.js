import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

const StyledInfoList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: "80%",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  // bgcolor: 'background.paper',
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

export default function DescriptionList(props) {
  return (
    <StyledInfoList>
      {props.desc.map((value, index) => (
        <ListItem
          key={index}
          disableGutters
          sx={{ padding: 0, color: "black" }}
        >
          <ListItemText primary={`- ${value.desc}`} />
        </ListItem>
      ))}
    </StyledInfoList>
  );
}
