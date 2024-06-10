import request from "src/utils/request";
import {
  setActiveChat,
  setChatList,
  setTotalUnreadCount,
  setUserUnreadCount,
} from "src/redux/actions/chatActions";
import { toastify } from "src/utils/toast";
import { loadingSkeletonAction } from "src/redux/actions/userActions";

export const getMessages = async (
  dispatch,
  userType,
  chatSearched,
  selectedFilter
) => {
  try {
    const res = await request.get("/pusher/get-messages");

    if (res) {
      if (userType === "Super Admin") {
        let messages = res.data?.data?.user_messages;
        let flattenedData = Object.values(messages)
          .map((array) => array)
          .flat();

        if (selectedFilter && selectedFilter !== "All Messages") {
          let getChats = flattenedData?.map((item) =>
            item?.msg_sent?.includes(selectedFilter) ? item : undefined
          );
          let filteredChats = getChats?.filter((item) => item);
          dispatch(setChatList(filteredChats));
        } else {
          dispatch(setChatList(flattenedData));
        }
      } else {
        dispatch(setChatList(res.data.data.messages));
      }
      dispatch(setTotalUnreadCount(res.data.data.total_unread_count));
      dispatch(setUserUnreadCount(res.data.data.user_unread_count));

      // dispatch(setChatSearched(false))
      dispatch(loadingSkeletonAction(false));
    }
  } catch (error) {
    dispatch(loadingSkeletonAction(false));

    if (error.response.data.status === 404) {
      dispatch(setChatList([]));
      if (!chatSearched) {
        dispatch(setActiveChat([]));
      }
    }
  }
};

export const sendMessage = async (formdata, setInputValue, setFiles) => {
  try {
    const res = await request.post("/pusher/send-message", formdata);

    if (res) {
      setInputValue("");
      setFiles([]);
    }
  } catch (e) {
    toastify("error", e.response.data.message);
  }
};

export const updateChatMessages = async (
  dispatch,
  userType,
  payload,
  selectedFilter
) => {
  try {
    const res = await request.post("/pusher/message-status", payload);

    if (res) {
      getMessages(dispatch, userType, false, selectedFilter);
    }
  } catch (e) {
    toastify("error", e.response.data.message);
  }
};
