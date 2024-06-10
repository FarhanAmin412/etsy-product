import { combineReducers } from "redux";
import modalReducer from "./modal/modalReducer";
import orderReducer from "./order/orderReducer";
import productReducer from "./product/productReducer";
import userReducer from "./user/userReducer";
import paymentReducer from "./payment/paymentReducer";
import mockupsReducer from "./mockups/mockupsReducer";
import chatReducer from "./chat/chatReducer";
import OAuthReducer from "./oAuth/oAuthReducer";

const RootReducer = combineReducers({
  user: userReducer, //user
  orders: orderReducer,
  modal: modalReducer,
  product: productReducer,
  payment: paymentReducer,
  mockups: mockupsReducer,
  chat: chatReducer,
  oAuth: OAuthReducer,
});

const rootReducer = (state, action) =>
  RootReducer(action.type === "Logout" ? undefined : state, action);
export default rootReducer;
