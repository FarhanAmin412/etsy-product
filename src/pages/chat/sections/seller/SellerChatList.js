import React from "react";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import supportIcon from "../../../../assets/icons/support_icon.png";
import { setReplyMessage } from "src/redux/actions/chatActions";
import Iconify from "src/components/iconify";

const SellerChatList = ({ chats }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.user);

  return (
    <>
      {chats?.map((message, index) => (
        <Stack key={`${message.id} - ${index}`} px={2}>
          {message.msg_received &&
            message.msg_received.split("|").map((receivedMsg, index) => (
              <React.Fragment>
                <Stack direction={"row"} alignItems={"flex-start"} mb={2}>
                  <Avatar src={supportIcon} sx={{ mr: 1 }} />
                  <Box className="bubble">
                    <Paper className="bubble-received">
                      <Typography variant="body1">
                        <Typography variant="body1">{receivedMsg}</Typography>
                      </Typography>
                    </Paper>
                    <Typography variant="caption">
                      {format(new Date(message.updated_at), "hh:mm aaa")}
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
              </React.Fragment>
            ))}
          {message.media_received && (
            <Box sx={{ mt: 1, ml: 6 }}>
              <CardMedia
                component={"img"}
                image={message.media_received}
                alt={"recieved"}
                sx={{ width: "80px", height: "80px" }}
              />

              <Typography variant="caption" mb={2}>
                {format(new Date(message.updated_at), "hh:mm aaa")}
              </Typography>
            </Box>
          )}

          {message.msg_sent &&
            message.msg_sent.split("|").map((messageSend, index) => (
              <Stack
                key={`${index}-key`}
                direction={"row"}
                justifyContent={"end"}
                alignItems={"center"}
                mb={2}
              >
                <Box className="bubble">
                  <Paper className="bubble-sent">
                    <Typography variant="body1">{messageSend}</Typography>
                  </Paper>
                  <Stack direction={"row"} justifyContent={"end"}>
                    <Typography variant="caption">
                      {format(new Date(message.created_at), "hh:mm aaa")}
                    </Typography>
                  </Stack>
                </Box>
                <Avatar src={account?.image} sx={{ ml: 1, mt: -2 }} />
              </Stack>
            ))}
          {message.media_sent && (
            <Box sx={{ mr: 6 }}>
              <Stack direction={"row"} justifyContent={"end"}>
                <CardMedia
                  component={"img"}
                  image={message.media_sent}
                  alt={"sent"}
                  sx={{
                    width: "80px",
                    height: "80px",
                  }}
                />
              </Stack>

              <Stack direction={"row"} justifyContent={"end"} mb={2}>
                <Typography variant="caption">
                  {format(new Date(message.created_at), "hh:mm aaa")}
                </Typography>
              </Stack>
            </Box>
          )}
        </Stack>
      ))}
    </>
  );
};

export default SellerChatList;
