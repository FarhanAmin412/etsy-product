export const addProductToCart = (productCount) => async (dispatch) => {
  dispatch({
    type: "addTocart",
    payload: productCount,
  });
};

export const setProductsList = (data) => async (dispatch) => {
  dispatch({
    type: "setProductsList",
    payload: data,
  });
};

export const setProductsMeta = (meta) => async (dispatch) => {
  dispatch({
    type: "setProductsMeta",
    payload: meta,
  });
};

export const setProductSearched = (boolean) => async (dispatch) => {
  dispatch({
    type: "setProductSearched",
    payload: boolean,
  });
};
