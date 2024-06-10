import {
  setOrderList,
  setOrdersMeta,
  setRowsPerPage,
  setSearched,
  setTotalPages,
} from "src/redux/actions/orderActions";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getOrderStats } from "./orderStats";
import { filterOrdersByCatalog } from "./filterOrdersByCatalog";
import { isEmpty } from "lodash";

export const setOrderTabName = (userType, tabValue) => {
  if (userType === "Seller") {
    return tabValue === "2"
      ? "on_hold"
      : tabValue === "3"
      ? "in_production"
      : tabValue === "4"
      ? "fulfilled"
      : "refunded";
  } else {
    return tabValue === "2"
      ? "awaiting_approval"
      : tabValue === "3"
      ? "awaiting_shipment"
      : tabValue === "4"
      ? "shipped"
      : tabValue === "5"
      ? "refunded"
      : "";
  }
};

export const getAllOrdersList = (
  dispatch,
  userType,
  page,
  rowsPerPage,
  tabValue
) => {
  let catalog_id = sessionStorage.getItem("selectedCatalogID");
  if (userType === "Seller") {
    if (tabValue === "1") {
      getAllOrders(dispatch, userType, page, rowsPerPage);
    } else {
      let status = setOrderTabName(userType, tabValue);
      getOrdersByStatus(dispatch, userType, status, page, rowsPerPage);
    }
  } else {
    filterOrdersByCatalog(
      dispatch,
      userType,
      catalog_id,
      page,
      rowsPerPage,
      tabValue
    );
  }
  getOrderStats(dispatch, userType);
};

export const getAllOrders = async (dispatch, userType, page, rowsPerPage) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(
      `/orders?page=${page}&rowsPerPage=${rowsPerPage}`
    );

    if (res) {
      dispatch(setOrderList(res.data.data.orders.data));
      dispatch(setTotalPages(res.data.data.orders.meta.total));
      dispatch(setRowsPerPage(res.data.data.orders.meta.per_page));
      dispatch(setOrdersMeta(res.data.data.orders.meta));
      dispatch(setSearched(false));
      dispatch(loadingAction(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));

    if (e.response.status === 404) {
      dispatch(setOrderList([]));
      dispatch(setTotalPages(1));
      dispatch(setRowsPerPage(25));
    }
  }
};
export const getOrdersByStatus = async (
  dispatch,
  userType,
  status,
  page,
  rowsPerPage
) => {
  dispatch(loadingAction(true));
  let type = userType === "Seller" ? "seller" : "admin";

  try {
    const res = await request.get(
      `/orders/show/statuswise/seller?status=${status}&page=${page}&rowsPerPage=${rowsPerPage}`
    );

    if (res) {
      dispatch(setOrderList(res.data.data.orders.data));
      dispatch(setTotalPages(res.data.data.orders.meta.total));
      dispatch(setRowsPerPage(res.data.data.orders.meta.per_page));
      dispatch(setOrdersMeta(res.data.data.orders.meta));
      dispatch(setSearched(false));
      dispatch(loadingAction(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));

    if (e.response.status === 404) {
      dispatch(setOrderList([]));
      dispatch(setTotalPages(1));
      dispatch(setRowsPerPage(25));
    }
  }
};
