import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { formatAmazonOrders } from "./format";
import { getAllOrdersList } from "../local";

export const getAmazonOrdersList = async (userType, dispatch) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get("/amazon/get/orders");

    if (res) {
      const amazonOrders = res.data.data;

      if (amazonOrders.length) {
        const formattedOrders = formatAmazonOrders(amazonOrders);

        saveAmazonOrders(formattedOrders, userType, dispatch);
      } else {
        toastify("success", "No more orders");
      }
      dispatch(loadingAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
  }
};
                                                                                                                                                                     
const saveAmazonOrders = async (formattedOrders, userType, dispatch) => {
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

  dispatch(loadingAction(true));

  let payload = { amazon_orders: formattedOrders };

  try {
    const res = await request.post(`/orders/amazon`, payload);
    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(loadingAction(false));
    }
  } catch (e) {
    toastify("error", e.message);
    dispatch(loadingAction(false));
  }
};
