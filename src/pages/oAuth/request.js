import oAuthRequest from "src/utils/oAuth";
import { toastify } from "src/utils/toast";
import { setValidityStatus } from "src/redux/actions/oAuthActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";

export const getCredentialValidity = async (dispatch, currentUrl) => {
  let endpoint = "/app/o/oauth2/auth?" + currentUrl[1] + currentUrl[2];

  dispatch(loadingAction(true));

  try {
    const res = await oAuthRequest.get(endpoint);
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setValidityStatus("success"));
    }
  } catch (e) {
    dispatch(loadingAction(false));
    dispatch(setValidityStatus(`error:${e.response.data.message}`));
  }
};

export const getToken = async (dispatch, navigate, oAuthData) => {
  dispatch(loadingBtnAction(true));

  try {
    const res = await oAuthRequest.post("/app/o/oauth2/code", oAuthData);
    if (res) {
      dispatch(loadingBtnAction(false));
      window.location.href = res.data.data;
      toastify(
        "success",
        "You have been connected with InnerCircle Prints successfully."
      );
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};
