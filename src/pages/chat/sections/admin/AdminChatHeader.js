import React from "react";
import {
  Avatar,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { getMessages } from "../../request";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "@mui/icons-material";

const ChatHeader = ({ userdata }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const skeletonLoading = useSelector((state) => state.user.skeletonLoading);
  const chatSearched = useSelector((state) => state.chat.chatSearched);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);


  return (
    <Grid container className="chat-header" alignItems={"center"}>
      <Grid item xs={0.8}>
        {skeletonLoading ? (
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        ) : (
          <Avatar src={userdata?.avatarUrl} alt="user-avatar" />
        )}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">
          {skeletonLoading ? (
            <Skeleton width={200} />
          ) : (
            userdata?.user_details?.name
          )}
        </Typography>
      </Grid>

      <Grid item xs={3.2} textAlign="right">
        <Tooltip title="Refresh" arrow>
          <IconButton onClick={() => getMessages(dispatch, userType, chatSearched, selectedFilter)}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ChatHeader;
