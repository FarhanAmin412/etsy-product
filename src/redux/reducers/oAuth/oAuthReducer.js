const defaultState = {
  scopes: [],
  apps: [],
  oAuthData: {},
  validityStatus: "",
};

const OAuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setScopes":
      return {
        ...state,
        scopes: action.payload,
      };

    case "setApps":
      return {
        ...state,
        apps: action.payload,
      };

    case "setOAuthData":
      return {
        ...state,
        oAuthData: action.payload,
      };

    case "setValidityStatus":
      return {
        ...state,
        validityStatus: action.payload,
      };

    default:
      return state;
  }
};

export default OAuthReducer;
