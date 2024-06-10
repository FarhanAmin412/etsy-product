import request from "src/utils/request";
import { getAllOrdersList } from ".";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";

export const onDeleteOrder = async (id, userType, dispatch) => {
  const page =
    sessionStorage.getItem("page") !== null
      ? sessionStorage.getItem("page")
      : 1;

  const rowsPerPage =
    sessionStorage.getItem("rowsPerPage") !== null
      ? sessionStorage.getItem("rowsPerPage")
      : 25;

  const tabValue = sessionStorage.getItem("activeTabIndex")
    ? sessionStorage.getItem("activeTabIndex")
    : "1";

  dispatch(loadingBtnAction(true));
  try {
    const res = await request.delete(`/orders/${id}`);

    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(loadingBtnAction(false));
      dispatch(setModalState(undefined));
      toastify("success", res.message);
    }
  } catch (e) {
    toastify("error", e.message);
    dispatch(loadingBtnAction(false));
  }
};
