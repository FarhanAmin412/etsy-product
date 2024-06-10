import request from "src/utils/request";
import { formatedEtsyOrders } from "./format";
import { loadingAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import { getAllOrdersList } from "../local";

export const getEtsyOrdersList = async (userType, dispatch) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get("etsy/get/orders");

    if (res) {
      const etsyOrders = res.data.data;

      if (etsyOrders?.length) {
        let newOrders = formatedEtsyOrders(etsyOrders);
        saveEtsyOrders(newOrders, userType, dispatch);
        dispatch(loadingAction(false));
      } else {
        toastify("success", "No more orders");
      }
      dispatch(loadingAction(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));
  }
};

const saveEtsyOrders = async (orders, userType, dispatch) => {
  dispatch(loadingAction(true));
  let payload = { etsy_orders: orders };

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
    const res = await request.post(`/orders/etsy`, payload);
    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(loadingAction(false));
    }
  } catch (e) {
    toastify("error", e.message);
    dispatch(loadingAction(false));
  }
};
