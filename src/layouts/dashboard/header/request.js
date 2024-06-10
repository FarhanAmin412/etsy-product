import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { loadingBtnAction, logoutAction } from "src/redux/actions/userActions";

export const onLogout = async (dispatch, navigate, setOpen) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.post("/logout");

    if (res) {
      setOpen(null);
      navigate("/login");
      dispatch(logoutAction());
      sessionStorage.removeItem("activeTabIndex");
      sessionStorage.removeItem("rowsPerPage");
      sessionStorage.removeItem("page");
      localStorage.removeItem("token");
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message)
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
