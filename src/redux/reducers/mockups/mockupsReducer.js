const defaultState = {
  mockupList: undefined,
  mockupsMeta: {},
  sections: [],
};

const mockupsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setMockups":
      return {
        ...state,
        mockupList: action.payload,
      };

    case "setMockupsMeta":
      return {
        ...state,
        mockupsMeta: action.payload,
      };

    case "setSections":
      return {
        ...state,
        sections: action.payload,
      };

    default:
      return state;
  }
};

export default mockupsReducer;
