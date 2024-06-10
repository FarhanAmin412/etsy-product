const defaultState = {
  chatList: [],
  unreadSellerMessages: 0,
  unreadAdminMessages: [],
  replyMessage: {},
  activeChat: {},
  chatSearched: false,
  totalUnreadCount: 0,
  userUnreadCount: {},
  selectedFilter: "",
};

const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setChatList":
      return {
        ...state,
        chatList: action.payload,
      };

    case "setUnreadSellerMessages":
      return {
        ...state,
        unreadSellerMessages: action.payload,
      };

    case "setUnreadAdminMessages":
      return {
        ...state,
        unreadAdminMessages: action.payload,
      };

    case "setReplyMessage":
      return {
        ...state,
        replyMessage: action.payload,
      };

    case "setActiveChat":
      return {
        ...state,
        activeChat: action.payload,
      };

    case "setChatSearched":
      return {
        ...state,
        chatSearched: action.payload,
      };

    case "setTotalUnreadCount":
      return {
        ...state,
        totalUnreadCount: action.payload,
      };

    case "setUserUnreadCount":
      return {
        ...state,
        userUnreadCount: action.payload,
      };

    case "setSelectedFilter":
      return {
        ...state,
        selectedFilter: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
