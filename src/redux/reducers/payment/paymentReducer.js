const defaultState = {
  walletAmount: "",
  defaultCard: {},
};

const paymentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setWalletAmount":
      return {
        ...state,
        walletAmount: action.payload,
      };

    case "setDefaultCard":
      return {
        ...state,
        defaultCard: action.payload,
      };

    default:
      return state;
  }
};

export default paymentReducer;
