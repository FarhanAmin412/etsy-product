const defaultState = {
  ordersList: [],
  orderStats: {},
  etsyOrdersList: {},
  catalogList: [],
  catalogDetails: {},
  newOrder: {},
  orderWithImages: [],
  totalPages: 0,
  rowsPerPage: 25,
  searched: false,
  ordersMetaData: {},
  shippingError: false,
};

const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setOrderList":
      return {
        ...state,
        ordersList: action.payload,
      };

    case "setOrderStats":
      return {
        ...state,
        orderStats: action.payload,
      };

    case "setTotalPages":
      return {
        ...state,
        totalPages: action.payload,
      };

    case "setRowsPerPage":
      return {
        ...state,
        rowsPerPage: action.payload,
      };

    case "setEtsyOrderList":
      return {
        ...state,
        etsyOrdersList: action.payload,
      };

    case "setCatalogList":
      return {
        ...state,
        catalogList: action.payload,
      };

    case "setCatalogDetails":
      return {
        ...state,
        catalogDetails: action.payload,
      };

    case "placeOrder":
      return {
        ...state,
        newOrder: action.payload,
      };

    case "insertImages":
      return {
        ...state,
        orderWithImages: action.payload,
      };

    case "setSearched":
      return {
        ...state,
        searched: action.payload,
      };

    case "setOrdersMeta":
      return {
        ...state,
        ordersMetaData: action.payload,
      };

    case "setShippingError":
      return {
        ...state,
        shippingError: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
