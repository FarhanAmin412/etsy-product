const defaultState = {
  isAuthenticated: false,
  user: {
    id: 0,
    name: "",
    email: "",
    status: 0,
    image: "",
    type: "",
  },
  isLoading: false,
  loadingButton: false,
  skeletonLoading: false,
  token: "",
  userEmail: "",
  activeStep: 0,
  getUsers: false,
  etsyShopName: "",
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          status: 1,
          image: action.payload.image,
          type: action.payload.user_type,
        },
        token: action.payload.token,
      };
    case "Logout":
      return {
        ...state,
        isAuthenticated: false,
        user: {
          name: "",
          email: "",
          status: 0,
        },
        token: "",
      };
    case "isAuthorized":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case "LoadingOn":
      return {
        ...state,
        isLoading: true,
      };
    case "LoadingOff":
      return {
        ...state,
        isLoading: false,
      };

    case "LoadingBtnOn":
      return {
        ...state,
        loadingButton: true,
      };
    case "LoadingBtnOff":
      return {
        ...state,
        loadingButton: false,
      };

    case "LoadingSkeletonnOn":
      return {
        ...state,
        skeletonLoading: true,
      };
    case "LoadingSkeletonOff":
      return {
        ...state,
        skeletonLoading: false,
      };

    case "resetPassword":
      return {
        ...state,
        userEmail: action.payload,
      };

    case "activeStep":
      return {
        ...state,
        activeStep: action.payload,
      };

    case "getUsers":
      return {
        ...state,
        getUsers: action.payload,
      };

    case "setEtsyShopName":
      return {
        ...state,
        etsyShopName: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
