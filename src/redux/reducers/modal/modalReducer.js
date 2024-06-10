const defaultState = {
  openModal: undefined,
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "openModal":
      return {
        ...state,
        openModal: action.payload,
      };

    default:
      return state;
  }
};

export default modalReducer;
