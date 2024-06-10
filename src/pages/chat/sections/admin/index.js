import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formatChatList } from "../../utils";
import { getMessages } from "../../request";
import UserList from "./UserList";
import ChatHeader from "./AdminChatHeader";
import ChatList from "../ChatList";
import ChatReply from "./ChatReply";
import ChatForm from "../ChatForm";
import SearchUsers from "./SearchUsers";
import { isEmpty } from "lodash";
import {
  setActiveChat,
  setSelectedFilter,
} from "src/redux/actions/chatActions";
import { loadingSkeletonAction } from "src/redux/actions/userActions";
import FilterDropdown from "src/components/filter-dropdown";

const AdminChat = () => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const userType = useSelector((state) => state.user.user.type);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const chatSearched = useSelector((state) => state.chat.chatSearched);
  const [CHATLIST, setCHATLIST] = useState([]);
  const totalUnreadCount = useSelector((state) => state.chat.totalUnreadCount);
  const userUnreadCount = useSelector((state) => state.chat.userUnreadCount);
  const filterOptions = [
    "All Messages",
    "@tumblers",
    "@ornaments",
    "@necklaces",
    "@sofware",
  ];
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  useEffect(() => {
    dispatch(loadingSkeletonAction(true));
    getMessages(dispatch, userType, chatSearched, selectedFilter);
  }, []);

  useEffect(() => {
    if (!isEmpty(activeChat)) {
      getMessages(dispatch, userType, chatSearched, selectedFilter);
    }
  }, [activeChat]);

  useEffect(() => {
    let formattedChatList = formatChatList(chatList, userUnreadCount);

    setCHATLIST(formattedChatList);
  }, [chatList, userUnreadCount]);

  useEffect(() => {
    dispatch(setActiveChat(!isEmpty(activeChat) ? activeChat : CHATLIST[0]));
    // if (!isEmpty(activeChat) && CHATLIST.includes(activeChat)) {
    //   dispatch(setActiveChat(activeChat));
    // } else {
    //   dispatch(setActiveChat(CHATLIST[0]));
    // }
  }, [CHATLIST]);

  const handleFilterChange = (option) => {
    dispatch(setSelectedFilter(option));
    dispatch(loadingSkeletonAction(true));
    getMessages(dispatch, userType, chatSearched, option);
  };

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Grid container flexWrap={"wrap"}>
        <Grid item xs={12} md={12} lg={12} xl={4}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
            sx={{ width: "85%" }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Typography variant="h4" gutterBottom>
                Inbox
              </Typography>
              <Badge badgeContent={totalUnreadCount} color="primary" />
            </Stack>
            <FilterDropdown
              options={filterOptions}
              selectedOption={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </Stack>

          <SearchUsers CHATLIST={CHATLIST} />
          <Box sx={{ mb: 2 }}></Box>
          {!isEmpty(CHATLIST) && (
            <Typography variant="subtitle1" gutterBottom>
              Recent
            </Typography>
          )}
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
            <ChatHeader userdata={activeChat} />

            <Divider />
            <ChatList chatList={activeChat?.data} />
            <Divider />

            <ChatReply />

            <Divider sx={{ bgcolor: "secondary.light" }} />
            <ChatForm activeChat={activeChat} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminChat;
