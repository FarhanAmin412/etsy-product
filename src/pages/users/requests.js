import request from "src/utils/request";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";

export const getUsers = async (dispatch, setUserList) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get("/users");

    if (res) {
      setUserList(res.data.data.users);
      dispatch(loadingAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
  }
};

export const getAllUserStats = async (dispatch, setUserStats) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.post("/orders/stats/all");

    if (res) {
      setUserStats(res.data.data.stats);
      dispatch(loadingAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
  }
};

export const onDeleteUser = async (dispatch, userID, setUserList) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.delete(`/users/${userID}`);

    if (res) {
      dispatch(setModalState(undefined));
      toastify("success", res.data.message);
      getUsers(dispatch, setUserList);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};

export const changeStatus = async (dispatch, userID, setUserList) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.get(`/users/status/${userID}`);

    if (res) {
      dispatch(setModalState(undefined));
      toastify("success", res.data.message);
      getUsers(dispatch, setUserList);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
