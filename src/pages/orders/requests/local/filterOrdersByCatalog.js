import request from "src/utils/request";
import { loadingAction } from "src/redux/actions/userActions";
import { setOrderTabName } from ".";
import {
  setOrderList,
  setOrdersMeta,
  setRowsPerPage,
  setSearched,
  setTotalPages,
} from "src/redux/actions/orderActions";

export const filterOrdersByCatalog = async (
  dispatch,
  userType,
  catalog_id,
  page,
  rowsPerPage,
  tabValue
) => {
  dispatch(loadingAction(true));
  let status = setOrderTabName(userType, tabValue);
  let id = catalog_id ? catalog_id : "";
  let tabStatus = tabValue === "1" ? "all" : status;
  try {
    const res = await request.get(
      `/orders/catalog/filter?catalog_id=${id}&status=${tabStatus}&page=${page}&rowsPerPage=${rowsPerPage}`
    );

    if (res) {
      dispatch(setOrderList(res.data.data.orders));
      dispatch(setTotalPages(res.data.data.pagination.total));
      dispatch(setRowsPerPage(res.data.data.pagination.per_page));
      dispatch(setOrdersMeta(res.data.data.pagination));
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
