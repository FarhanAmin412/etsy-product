import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { setReplyMessage } from "src/redux/actions/chatActions";
import AdminChatList from "./admin/AdminChatList";
import SellerChatList from "./seller/SellerChatList";
import ChatBubble from "../skeleton/ChatBubble";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatList = ({ chatList }) => {
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [groupedChats, setGroupedChats] = useState({});
  const userType = useSelector((state) => state.user.user.type);
  const skeletonLoading = useSelector((state) => state.user.skeletonLoading);

  useEffect(() => {
    if (!isEmpty(chatList)) {
      let filteredChats = chatList?.reduce((result, chat) => {
        const createdAt = new Date(chat.created_at);
        if (!isNaN(createdAt.getTime())) {
          const date = createdAt.toISOString().slice(0, 10);
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push(chat);
        }
        return result;
      }, {});
      setGroupedChats(filteredChats);
      if (userType === "Super Admin") {
        dispatch(setReplyMessage(""));
      }
    } else {
      setGroupedChats({});
    }
  }, [chatList]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <ScrollToBottom className={"chat-container"} ref={chatContainerRef}>
      {skeletonLoading ? (
        <div>
          <ChatBubble position="left" width={300} />
          <ChatBubble position="right" width={120} />
          <ChatBubble position="left" width={280} />
          <ChatBubble position="right" width={100} />

          <ChatBubble position="left" width={180} />
          <ChatBubble position="right" width={300} />
          <ChatBubble position="right" width={480} />
          <ChatBubble position="right" width={120} />
        </div>
      ) : (
        groupedChats &&
        Object.keys(groupedChats).map((index) => {
          let chats = groupedChats[index];

          let chatDate = new Date(index).getDate();
          let todayDate = new Date().getDate();

          return (
            <div key={index}>
              <Divider>
                <Typography
                  variant="subtitle2"
                  my={2}
                  sx={{ textTransform: "uppercase" }}
                >
                  {chatDate === todayDate ? "Today" : index}
                </Typography>
              </Divider>

              {userType === "Seller" ? (
                <SellerChatList chats={chats} />
              ) : (
                <AdminChatList chats={chats} />
              )}
            </div>
          );
        })
      )}
      {isEmpty(groupedChats) && !skeletonLoading && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%", margin: "0 auto" }}
        >
          <Grid item xs={3}>
            {userType === "Seller"
              ? "Start a conversation"
              : "There are no messages yet."}
          </Grid>
        </Grid>
      )}
    </ScrollToBottom>
  );
};

export default ChatList;
