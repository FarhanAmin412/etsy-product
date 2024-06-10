import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { setReplyMessage } from "src/redux/actions/chatActions";

const ChatReply = () => {
  const dispatch = useDispatch();
  const replyMessage = useSelector((state) => state.chat.replyMessage);
  const userType = useSelector((state) => state.user.user.type);

  return (
    <Box sx={{ mx: 2, mb: 1 }}>
      {!isEmpty(replyMessage) ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>
            <b>Replying to:</b>{" "}
            {userType === "Seller"
              ? replyMessage?.msg_received
              : replyMessage?.msg_sent}{" "}
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            sx={{ borderRadius: "16px" }}
            onClick={() => dispatch(setReplyMessage({}))}
          >
            cancel
          </Button>
        </Stack>
      ) : (
        <Typography variant="body2">Select a message to reply</Typography>
      )}
    </Box>
  );
};

export default ChatReply;
