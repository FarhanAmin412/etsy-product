import request from "src/utils/request";
import { getAllOrdersList } from ".";
import { toastify } from "src/utils/toast";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { setModalState } from "src/redux/actions/modalActions";

export const updateOrder = async (
  file,
  id,
  dispatch,
  userType,
  type,
  payload
) => {
  //update graphic image or variations on nested table

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

  let formData = new FormData();

  if (file && type) {
    formData.append(type, file);
  }

  try {
    const res = await request.post(
      `/orders/update/${id}`,
      payload ? payload : formData
    );

    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      dispatch(setModalState(undefined));
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message);
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};
