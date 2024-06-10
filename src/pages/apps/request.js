import { setApps } from "src/redux/actions/oAuthActions";
import { loadingAction } from "src/redux/actions/userActions";
import oAuthRequest from "src/utils/oAuth";
import { toastify } from "src/utils/toast";

export const getApps = async (dispatch) => {
  dispatch(loadingAction(true));

  try {
    const res = await oAuthRequest.get("/app/get");
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setApps(res.data.data));
    }
  } catch (e) {
    dispatch(loadingAction(false));
    if (e.response.status === 404) {
      dispatch(setApps([]));
    } else {
      toastify("error", e.response.data.message);
    }
  }
};
