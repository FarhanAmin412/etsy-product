export const setOrderList = (data) => async (dispatch) => {
  dispatch({
    type: "setOrderList",
    payload: data,
  });
};

export const setOrderStats = (stats) => async (dispatch) => {
  dispatch({
    type: "setOrderStats",
    payload: stats,
  });
};

export const setTotalPages = (totalPages) => async (dispatch) => {
  dispatch({
    type: "setTotalPages",
    payload: totalPages,
  });
};

export const setRowsPerPage = (rowsPerPage) => async (dispatch) => {
  dispatch({
    type: "setRowsPerPage",
    payload: rowsPerPage,
  });
};

export const setEtsyOrderList = (data) => async (dispatch) => {
  dispatch({
    type: "setEtsyOrderList",
    payload: data,
  });
};

export const setCatalogList = (data) => async (dispatch) => {
  dispatch({
    type: "setCatalogList",
    payload: data,
  });
};

export const setCatalogDetails = (data) => async (dispatch) => {
  dispatch({
    type: "setCatalogDetails",
    payload: data,
  });
};

export const placeOrder = (data) => async (dispatch) => {
  dispatch({
    type: "placeOrder",
    payload: data,
  });
};

export const insertImagesToOrder = (data) => async (dispatch) => {
  dispatch({
    type: "insertImages",
    payload: data,
  });
};

export const setSearched = (data) => async (dispatch) => {
  dispatch({
    type: "setSearched",
    payload: data,
  });
};

export const setOrdersMeta = (data) => async (dispatch) => {
  dispatch({
    type: "setOrdersMeta",
    payload: data,
  });
};


export const setShippingError = (boolean) => async (dispatch) => {
  dispatch({
    type: "setShippingError",
    payload: boolean,
  });
};
