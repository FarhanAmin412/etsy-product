export const setChatList = (chatList) => async (dispatch) => {
  dispatch({
    type: "setChatList",
    payload: chatList,
  });
};

export const setUnreadSellerMessages =
  (unreadSellerMessages) => async (dispatch) => {
    dispatch({
      type: "setUnreadSellerMessages",
      payload: unreadSellerMessages,
    });
  };

export const setUnreadAdminMessages =
  (unreadAdminMessages) => async (dispatch) => {
    dispatch({
      type: "setUnreadAdminMessages",
      payload: unreadAdminMessages,
    });
  };

export const setReplyMessage = (replyMessage) => async (dispatch) => {
  dispatch({
    type: "setReplyMessage",
    payload: replyMessage,
  });
};

export const setActiveChat = (activeChat) => async (dispatch) => {
  dispatch({
    type: "setActiveChat",
    payload: activeChat,
  });
};

export const setChatSearched = (boolean) => async (dispatch) => {
  dispatch({
    type: "setChatSearched",
    payload: boolean,
  });
};


export const setTotalUnreadCount = (totalUnreadCount) => async (dispatch) => {
  dispatch({
    type: "setTotalUnreadCount",
    payload: totalUnreadCount,
  });
};

export const setUserUnreadCount = (userUnreadCount) => async (dispatch) => {
  dispatch({
    type: "setUserUnreadCount",
    payload: userUnreadCount,
  });
};

export const setSelectedFilter = (selectedFilter) => async (dispatch) => {
  dispatch({
    type: "setSelectedFilter",
    payload: selectedFilter,
  });
};
