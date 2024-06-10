import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getAllOrdersList } from ".";
import { setModalState } from "src/redux/actions/modalActions";
import { getWalletAmount } from "src/pages/settings/utils";
import { toastify } from "src/utils/toast";

export const approveOrder = async (
  orders,
  totalAmount,
  paymentMode,
  userType,
  setSelected,
  dispatch
) => {
  dispatch(loadingBtnAction(true));
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

  const payload = {
    user_type: userType === "Seller" ? "seller" : "admin",
    total_amount: totalAmount,
    payment_mode: paymentMode,
    orders: orders,
  };

  try {
    const res = await request.post(`/shipstation`, payload);

    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(setModalState(undefined));
      setSelected([]);

      if (userType === "Seller") {
        getWalletAmount(dispatch);
      }

      toastify("success", res.data.message);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
