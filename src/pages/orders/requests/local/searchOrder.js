import { setOrderList, setSearched } from "src/redux/actions/orderActions";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";

export const searchOrder = async (dispatch, searchValue) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(`/orders/search/${searchValue}`);

    if (res) {
      dispatch(setOrderList(res.data.data.orders));
      dispatch(setSearched(true));
      dispatch(loadingAction(false));
      toastify("success", res.data.message);
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
  }
};
