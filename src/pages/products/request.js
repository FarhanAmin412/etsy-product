import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { setModalState } from "src/redux/actions/modalActions";
import {
  setProductSearched,
  setProductsList,
  setProductsMeta,
} from "src/redux/actions/productActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";

export const getProductList = async (dispatch, currentPage, itemsPerPage) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(
      `/products?page=${currentPage}&&rowsPerPage=${itemsPerPage}`
    );
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setProductsList(res.data.data.data));
      dispatch(setProductsMeta(res.data.data.meta));
      dispatch(setProductSearched(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));
    if (e?.response?.status === 404) {
      dispatch(setProductsList([]));
    } else {
      toastify("error", e.response.data.message);
    }
  }
};

export const deleteProduct = async (id, dispatch, page, rowsPerPage) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.delete(`/products/${id}`);

    if (res) {
      dispatch(setModalState(undefined));
      getProductList(dispatch, page + 1, rowsPerPage);
      toastify("success", res.data.message);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};

export const searchProducts = async (dispatch, inputValue) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get(`/products/search/${inputValue}`);

    if (res) {
      dispatch(loadingAction(false));
      dispatch(setProductsList(res.data.data));
      toastify("success", res.data.message);
      dispatch(setProductSearched(true));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(setProductSearched(true));
    dispatch(loadingAction(false));
  }
};
