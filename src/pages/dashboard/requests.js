import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";

export const getPosts = async (dispatch, setPosts) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(`/post`);
    if (res) {
      console.log(res, "resss");
      setPosts(res.data.data);
      dispatch(loadingAction(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));
  }
};

export const submitPost = async (dispatch, formData, setPosts) => {
  dispatch(loadingBtnAction(true));

  try {
    const res = await request.post(`/post`, formData);
    if (res) {
      console.log(res, "resss");
      dispatch(setModalState(undefined));
      getPosts(dispatch, setPosts);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};

export const editPost = async (postId, dispatch, formData, setPosts) => {
  dispatch(loadingBtnAction(true));

  try {
    const res = await request.post(`/post/${postId}`, formData);
    if (res) {
      console.log(res, "resssPosts");
      dispatch(setModalState(undefined));
      getPosts(dispatch, setPosts);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};

export const deletePost = async (postId, dispatch, setPosts) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.delete(`/post/${postId}`);
    if (res) {
      dispatch(setModalState(undefined));
      getPosts(dispatch, setPosts);
      dispatch(loadingBtnAction(false));
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingBtnAction(false));
  }
};
