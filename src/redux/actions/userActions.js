export const loginAction =
  (token, id, name, email, image, user_type) => (dispatch) => {
    dispatch({
      type: "Login",
      payload: {
        token,
        id,
        name,
        email,
        image,
        user_type,
      },
    });
  };

export const logoutAction = () => async (dispatch) => {
  dispatch({
    type: "Logout",
  });
};

export const setAuthorized = (authCheck) => async (dispatch) => {
  dispatch({
    type: "isAuthorized",
    payload: authCheck,
  });
};

export const loadingAction = (isLoading) => (dispatch) => {
  if (isLoading) {
    dispatch({
      type: "LoadingOn",
    });
  } else {
    dispatch({
      type: "LoadingOff",
    });
  }
};

export const loadingBtnAction = (isLoading) => (dispatch) => {
  if (isLoading) {
    dispatch({
      type: "LoadingBtnOn",
    });
  } else {
    dispatch({
      type: "LoadingBtnOff",
    });
  }
};

export const loadingSkeletonAction = (isLoading) => (dispatch) => {
  if (isLoading) {
    dispatch({
      type: "LoadingSkeletonnOn",
    });
  } else {
    dispatch({
      type: "LoadingSkeletonOff",
    });
  }
};

export const setUserEmail = (email) => async (dispatch) => {
  dispatch({
    type: "resetPassword",
    payload: email,
  });
};

export const setActiveStep = (step) => async (dispatch) => {
  dispatch({
    type: "activeStep",
    payload: step,
  });
};

export const getUsers = (boolean) => async (dispatch) => {
  dispatch({
    type: "getUsers",
    payload: boolean,
  });
};

export const setEtsyShopName = (shopName) => async (dispatch) => {
  dispatch({
    type: "setEtsyShopName",
    payload: shopName,
  });
};
