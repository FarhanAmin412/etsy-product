import { format } from "date-fns";
import { getMessages } from "src/pages/chat/request";
import { setActiveChat, setChatList } from "src/redux/actions/chatActions";

export const sellerToAdmin = (
  data,
  dispatch,
  userType,
  chatSearched,
  activeChat,
  chatList,
  location,
  selectedFilter
) => {
  console.log(data, "seller to admin");
  if (userType === "Seller") {
    getMessages(dispatch, userType, chatSearched, selectedFilter);
  } else {
    getMessages(dispatch, userType, chatSearched, selectedFilter);

    let temporary_message = {
      id: data?.message_id ? data?.message_id : 1,
      avatarUrl: data?.user_image,
      user_details: {
        id: data?.user_id,
        name: data?.user_name,
        email: data?.email,
        image: data?.user_image,
        status: 1,
        user_type: "Seller",
      },
      msg_sent: data?.message,
      media_sent: data?.media,
      msg_received: "",
      media_received: "",
      created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'"),
      updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'"),
    };

    if (
      location.pathname === "/dashboard/chat" &&
      data?.user_id === activeChat?.user_id
    ) {
      let temporary_chatlist = [...activeChat.data];

      dispatch(
        setActiveChat({
          ...activeChat,
          data: temporary_chatlist.concat(temporary_message),
        })
      );
    } else {
      let temporary_chatlist = [...chatList];
      dispatch(setChatList(temporary_chatlist.concat(temporary_message)));
    }
  }
};

export const adminToSeller = (
  data,
  dispatch,
  userType,
  chatSearched,
  activeChat,
  account,
  replyMessage,
  selectedFilter
) => {
  console.log(data, "admin to seller");

  if (userType === "Seller") {
    getMessages(dispatch, userType, chatSearched, selectedFilter);
  } else {
    getMessages(dispatch, userType, chatSearched, selectedFilter);

    if (replyMessage) {
      let findMessage = activeChat?.data?.filter(
        (item) => item.id === replyMessage.id
      )[0];

      let concatMessage = findMessage?.msg_received
        ? findMessage?.msg_received + "|" + data.message
        : data.message;

      let setmessage = {
        ...findMessage,
        msg_received: concatMessage,
        media_received: data.media,
      };

      let newChatList = [...activeChat?.data];
      let index = newChatList?.findIndex((item) => item.id === setmessage.id);

      if (index !== -1) {
        newChatList = newChatList?.map((item, i) =>
          i === index ? setmessage : item
        );
      }

      dispatch(setActiveChat({ ...activeChat, data: newChatList }));
    } else {
      let temporary_message = {
        id: data?.message_id ? data?.message_id : 1,
        avatarUrl: account?.image,
        user_details: {
          id: data?.user_id,
          name: data?.user_name,
          email: data?.email,
          image: data?.user_image,
          status: 1,
          user_type: "Seller",
        },
        msg_sent: "",
        media_sent: "",
        msg_received: data?.message,
        media_received: data?.media,
        created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'"),
        updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'"),
      };
      const updatedObject = {
        ...activeChat,
        data: [...activeChat.data, temporary_message],
      };

      dispatch(setActiveChat(updatedObject));
    }
  }
};
