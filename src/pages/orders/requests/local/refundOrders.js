import { setModalState } from "src/redux/actions/modalActions";
import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getAllOrdersList } from ".";
import { toastify } from "src/utils/toast";

export const refundOrders = async (dispatch, payload, setLoading, userType) => {
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
    const res = await request.post(`/orders/refund/`, payload);

    if (res) {
      dispatch(loadingBtnAction(false));
      setLoading(false);
      toastify("success", res.data.message);
      dispatch(setModalState(undefined));
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    setLoading(false);
    toastify("error", e.response.data.message);
  }
};
