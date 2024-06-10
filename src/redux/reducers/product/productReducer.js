const defaultState = {
  productsInCart: 0,
  productList: [],
  productsMeta: {},
  productSearched: false,
};

const productReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "addTocart":
      return {
        ...state,
        productsInCart: action.payload,
      };

    case "setProductsList":
      return {
        ...state,
        productList: action.payload,
      };

    case "setProductsMeta":
      return {
        ...state,
        productsMeta: action.payload,
      };

    case "setProductSearched":
      return {
        ...state,
        productSearched: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
