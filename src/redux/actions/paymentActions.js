export const setWalletAmount = (amount) => async (dispatch) => {
  dispatch({
    type: "setWalletAmount",
    payload: amount,
  });
};

export const setDefaultCard = (card) => async (dispatch) => {
  dispatch({
    type: "setDefaultCard",
    payload: card,
  });
};
