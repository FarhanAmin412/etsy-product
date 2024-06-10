import request from "src/utils/request";
import { loadingAction, setEtsyShopName } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";

export const getEtsyShop = async (dispatch) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get(`/etsy/get/shop`);

    if (res) {
      dispatch(setEtsyShopName(res.data.shop_name));
      localStorage.setItem("etsyStore", 1);
      dispatch(loadingAction(false));
      toastify("success", res.message);
    }
  } catch (e) {
    dispatch(loadingAction(false));
    localStorage.setItem("etsyStore", 0);
    if (e.response.status === 400) {
      dispatch(setEtsyShopName(""));
    }
  }
};

export const disconnectEtsyStore = async (dispatch) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get(`/etsy/disconnect/store`);

    if (res) {
      getEtsyShop(dispatch);
      localStorage.setItem("etsyStore", 0);
      dispatch(loadingAction(false));
      toastify("success", res.message);
    }
  } catch (e) {
    dispatch(loadingAction(false));
    localStorage.setItem("etsyStore", 0);
  }
};

export const disconnectAmazonyStore = async (dispatch) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get(`/amazon/disconnect/store`);

    if (res) {
      localStorage.setItem("amazonStore", 0);
      dispatch(loadingAction(false));
      toastify("success", res.message);
    }
  } catch (e) {
    dispatch(loadingAction(false));
    localStorage.setItem("etsyStore", 0);
  }
};
