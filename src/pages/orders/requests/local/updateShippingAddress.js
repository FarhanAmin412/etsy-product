import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { getAllOrdersList } from ".";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { setModalState } from "src/redux/actions/modalActions";

export const updateShippingAddress = async (dispatch, payload, userType) => {
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
  try {
    const res = await request.post("orders/address", payload);
    if (res) {
      toastify("success", res.data.message);
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(loadingBtnAction(false));
      dispatch(setModalState(undefined));
    }
  } catch (e) {
    toastify("success", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
