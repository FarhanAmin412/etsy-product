import React from "react";
import supportIcon from "../../../../assets/icons/support_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { Close, Refresh } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { getMessages } from "../../request";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  return (
    <Grid container className="chat-header">
      <Grid item xs={1}>
        <Avatar src={supportIcon} alt="photoURL" />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="caption">Chat with</Typography>
        <Typography variant="h6" mt={-1}>
          Inner Circle Prints Support
        </Typography>
      </Grid>

      <Grid item xs={3} textAlign="right">
        <Tooltip title="Refresh" arrow>
          <IconButton
            onClick={() =>
              getMessages(dispatch, userType, false, selectedFilter)
            }
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ChatHeader;
