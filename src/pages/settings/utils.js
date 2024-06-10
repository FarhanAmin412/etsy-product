import { setWalletAmount } from "src/redux/actions/paymentActions";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";

export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#212B36" : "rgba(145, 158, 171, 0.32)",
    height: "55px",
    borderRadius: "6px",
    zIndex: 9999,
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    maxHeight: "180px",
  }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

export const getWalletAmount = async (dispatch) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get("/payments/funds");

    if (res) {
      let wallet = res.data.data.wallet[0];
      dispatch(loadingAction(false));
      dispatch(setWalletAmount(wallet.amount));
    }
  } catch (e) {
    if (e.response.status === 404) {
      dispatch(setWalletAmount(0));
    }
    dispatch(loadingAction(false));
  }
};
