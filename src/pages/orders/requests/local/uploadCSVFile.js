import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { getAllOrdersList } from ".";

export async function uploadToShipOrders(dispatch, userType, file) {
  // upload CSV file for shipped orders

  let formData = new FormData();
  formData.append("file", file);

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

  try {
    const res = await request.post("/shipstation/tracking/csv", formData);

    if (res) {
      dispatch(loadingAction(false));
      toastify("success", res.data.message);
    }
  } catch (e) {
    getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
    toastify("error", e.response.data.message);
  }
}
