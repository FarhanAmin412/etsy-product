import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { getAllOrdersList } from ".";
import { toastify } from "src/utils/toast";
import { setModalState } from "src/redux/actions/modalActions";

export const saveNote = async (dispatch, id, value, userType, type) => {
  dispatch(loadingBtnAction(true));
  const payload = {
    id: id,
    note: value,
  };

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
    const res = await request.post(`/orders/notes`, payload);

    if (res) {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      if (type === "delete") {
        toastify("success", "Note Deleted Succesfully");
      } else {
        toastify("success", res.data.message);
      }
      dispatch(loadingBtnAction(false));
      dispatch(setModalState(undefined));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
