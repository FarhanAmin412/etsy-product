import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { updateChatMessages } from "../../request";

const MarkAsUnread = ({ last_messages, id }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const userType = useSelector((state) => state.user.user.type);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  const unreadAdminMessages = useSelector(
    (state) => state.chat.unreadAdminMessages
  );

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const alreadyMarked = unreadAdminMessages?.some(
    (item) => item.user_id === last_messages.user_id
  );

  return (
    <>
      <Tooltip title="Mark as unread">
        <IconButton sx={{ ml: 1 }} onClick={(e) => setOpen(e.currentTarget)}>
          <Iconify icon="mdi:dots-vertical" />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          disabled={alreadyMarked || id === activeChat?.user_id ? true : false}
          onClick={() => {
            const payload = {
              message_id: [last_messages.message_id],
              status: 0,
            };

            updateChatMessages(dispatch, userType, payload, selectedFilter);
            handleCloseMenu();
          }}
        >
          <Iconify
            sx={{ color: "primary.main", mr: 2 }}
            icon="material-symbols:mark-chat-unread-outline"
          />
          <Typography variant="body2">Mark as unread</Typography>
        </MenuItem>
      </Popover>
    </>
  );
};

export default MarkAsUnread;
