export const setMockups = (list) => async (dispatch) => {
  dispatch({
    type: "setMockups",
    payload: list,
  });
};

export const setMockupsMeta = (meta) => async (dispatch) => {
  dispatch({
    type: "setMockupsMeta",
    payload: meta,
  });
};

export const setSections = (sections) => async (dispatch) => {
  dispatch({
    type: "setSections",
    payload: sections,
  });
};
