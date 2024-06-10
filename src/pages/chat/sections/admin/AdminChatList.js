import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ImageViewPopup from "src/components/image-viewer";
import Iconify from "src/components/iconify/Iconify";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setReplyMessage } from "src/redux/actions/chatActions";

const AdminChatList = ({ chats }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.user);

  return (
    <>
      {chats?.map((message, index) => (
        <Stack key={`${message.id} - ${index}`} px={3}>
          {message.msg_sent &&
            message.msg_sent
              .split("|")
              .filter((item) => item !== "")
              .map((sentMsg, index) => (
                <Stack
                  direction={"row"}
                  alignItems={"flex-start"}
                  key={`${index}-key`}
                >
                  <Avatar src={message?.avatarUrl} sx={{ mr: 1 }} />
                  <Box className="bubble" sx={{ mb: 2 }}>
                    <Paper className="bubble-received">
                      <Typography variant="body1">{sentMsg}</Typography>
                    </Paper>

                    <Typography variant="caption">
                      {format(new Date(message.created_at), "hh:mm aaa")}
                    </Typography>
                  </Box>
                  <Tooltip title="Reply" arrow>
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() => dispatch(setReplyMessage(message))}
                    >
                      <Iconify icon="ic:baseline-reply" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}

          {message.media_sent && (
            <Box sx={{ mt: 1, ml: 6 }}>
              <ImageViewPopup imageSRC={[message.media_sent]} fileName={""} />

              <Typography variant="caption" mb={2}>
                {format(new Date(message.created_at), "hh:mm aaa")}
              </Typography>
            </Box>
          )}

          {message.msg_received &&
            message.msg_received
              .split("|")
              .filter((item) => item !== "")
              .map((receivedMsg, index) => (
                <React.Fragment key={`${index}-key`}>
                  <Stack direction={"row"} justifyContent={"end"} mb={2}>
                    <Box className="bubble">
                      <Paper className="bubble-sent">
                        <Typography variant="body1">{receivedMsg}</Typography>
                      </Paper>
                      <Stack direction={"row"} justifyContent={"end"} mb={2}>
                        <Typography variant="caption">
                          {format(new Date(message.updated_at), "hh:mm aaa")}
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar src={account?.image} sx={{ ml: 1 }} />
                  </Stack>
                </React.Fragment>
              ))}
          {message.media_received && (
            <Box sx={{ mt: 1, mr: 6 }}>
              <Stack direction={"row"} justifyContent={"end"}>
                <ImageViewPopup
                  imageSRC={[message.media_received]}
                  fileName={""}
                />
              </Stack>

              <Stack direction={"row"} justifyContent={"end"} mb={2}>
                <Typography variant="caption">
                  {format(new Date(message.updated_at), "hh:mm aaa")}
                </Typography>
              </Stack>
            </Box>
          )}
        </Stack>
      ))}
    </>
  );
};

export default AdminChatList;
