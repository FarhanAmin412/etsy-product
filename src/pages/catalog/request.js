import { setModalState } from "src/redux/actions/modalActions";
import { setCatalogList } from "src/redux/actions/orderActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";

export const getCatalogsList = async (dispatch, userType) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(
      userType === "Super Admin" ? "/catalog" : `/catalog/seller/view`
    );
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setCatalogList(res.data.data.catalogs));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
    if (e.response.status === 404) {
      dispatch(setCatalogList([]));
    }
  }
};

export const addCatalog = async (dispatch, data, reset, userType) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.post(`/catalog`, data);

    if (res) {
      dispatch(setModalState(undefined));
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message);
      getCatalogsList(dispatch, userType);
      reset();
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};

export const updateCatalog = async (dispatch, data, id, userType) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.post(`/catalog/${id}?_method=PATCH`, data);

    if (res) {
      dispatch(setModalState(undefined));
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message);
      getCatalogsList(dispatch, userType);
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};

export const deleteCatalog = async (dispatch, id, userType) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.delete(`/catalog/${id}?_method=Delete`);

    if (res) {
      dispatch(setModalState(undefined));
      getCatalogsList(dispatch, userType);
      toastify("success", res.data.message);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
