import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import {
  setMockups,
  setMockupsMeta,
  setSections,
} from "src/redux/actions/mockupsActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";
import { setModalState } from "src/redux/actions/modalActions";

export const getMockups = async (
  dispatch,
  sectionID,
  currentPage,
  itemsPerPage
) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get(
      `/mockup?section_id=${sectionID}&&page=${currentPage}&&rowsPerPage=${itemsPerPage}`
    );
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setMockups(res.data?.data?.data));
      dispatch(setMockupsMeta(res.data?.data?.meta));
    }
  } catch (e) {
    dispatch(loadingAction(false));
    if (e.response.status === 404) {
      dispatch(setMockups([]));
    } else {
      toastify("error", e.response.data.message);
    }
  }
};

export const getMockupSections = async (dispatch) => {
  dispatch(loadingBtnAction(true));

  try {
    const res = await request.get("/mockup/sections");
    if (res) {
      dispatch(loadingBtnAction(false));
      dispatch(setSections(res.data.data));
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    if (e.response.status === 404) {
      dispatch(setSections([]));
    } else {
      toastify("error", e.response.data.message);
    }
  }
};

export const addSection = async (dispatch, payload, setShowInput) => {
  dispatch(loadingBtnAction(true));
  try {
    const res = await request.post("/mockup/section", payload);

    if (res) {
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message);
      getMockupSections(dispatch);
      setShowInput(false);
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};

export const submitMockup = async (
  dispatch,
  formData,
  setLoadingButton,
  sectionID
) => {
  setLoadingButton(true);
  try {
    const res = await request.post("/mockup", formData);

    if (res) {
      setLoadingButton(false);
      dispatch(setModalState(undefined));
      toastify("success", res.data.message);

      getMockups(dispatch, sectionID, 1, 6);
    }
  } catch (e) {
    setLoadingButton(false);
    toastify("error", e.response.data.message);
  }
};

export const deleteMockup = async (dispatch, id, sectionID) => {
  dispatch(loadingBtnAction(true));

  try {
    const res = await request.delete(`/mockup/${id}`);
    if (res) {
      dispatch(loadingBtnAction(false));
      toastify("success", res.data.message);
      dispatch(setModalState(undefined));
      getMockups(dispatch, sectionID, 1, 6);
    }
  } catch (e) {
    dispatch(loadingBtnAction(false));
    toastify("error", e.response.data.message);
  }
};
