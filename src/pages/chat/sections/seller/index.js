import React, { useEffect } from "react";
import {
  Badge,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../request";
import ChatHeader from "./SellerChatHeader";
import ChatList from "../ChatList";
import ChatReply from "../admin/ChatReply";
import ChatForm from "../ChatForm";
import { loadingSkeletonAction } from "src/redux/actions/userActions";
import UserList from "../admin/UserList";
import supportIcon from "../../../../assets/icons/support_icon.png";

const AdminChat = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const chatList = useSelector((state) => state.chat.chatList);
  const totalUnreadCount = useSelector((state) => state.chat.totalUnreadCount);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  useEffect(() => {
    dispatch(loadingSkeletonAction(true));
    getMessages(dispatch, userType, false, selectedFilter);
  }, []);

  const CHATLIST = [
    {
      user_id: 1,
      user_details: {
        id: 1,
        name: "ICP Support",
        email: "innercircleprintsadmin@gmail.com",
        status: 1,
        image: supportIcon,
        type: "Super Admin",
      },
      data: chatList,
      avatarUrl: supportIcon,

      count: totalUnreadCount,
    },
  ];

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Grid container flexWrap={"wrap"}>
        <Grid item xs={12} md={12} lg={12} xl={4}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Typography variant="h4" gutterBottom>
              Inbox
            </Typography>
            <Badge badgeContent={totalUnreadCount} color="primary" />
          </Stack>
          <UserList chatList={CHATLIST} />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <div
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "#f9fafb",
              borderRadius: "14px",
              boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            }}
          >
            <ChatHeader />

            <Divider />
            <ChatList chatList={chatList} />
            <Divider />

            <ChatReply />

            <Divider sx={{ bgcolor: "secondary.light" }} />
            <ChatForm />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminChat;
