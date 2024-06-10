export const setScopes = (apps) => async (dispatch) => {
  dispatch({
    type: "setScopes",
    payload: apps,
  });
};

export const setApps = (apps) => async (dispatch) => {
  dispatch({
    type: "setApps",
    payload: apps,
  });
};

export const setOAuthData = (data) => async (dispatch) => {
  dispatch({
    type: "setOAuthData",
    payload: data,
  });
};

export const setValidityStatus = (status) => async (dispatch) => {
  dispatch({
    type: "setValidityStatus",
    payload: status,
  });
};
