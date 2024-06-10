export const setModalState = (component) => async (dispatch) => {
  dispatch({
    type: "openModal",
    payload: component,
  });
};
