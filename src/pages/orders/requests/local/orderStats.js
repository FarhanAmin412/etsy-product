import { setOrderStats } from "src/redux/actions/orderActions";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";

export const getOrderStats = async (dispatch, userType) => {
  dispatch(loadingAction(true));
  try {
    const res = await request.get(
      userType === "Super Admin"
        ? "/orders/stats/admin"
        : "/orders/stats/seller"
    );
    if (res) {
      const data = res.data.data.stats;
      const stats = {
        revenue: data?.revenue,
        on_hold:
          userType === "Seller" ? data?.on_hold : data?.awaiting_approval,
        in_prod:
          userType === "Seller" ? data?.in_production : data?.awaiting_shipment,
        refundable: data?.refundable ? data?.refundable : 0,
        refunded: data?.refunded ? data?.refunded : 0,
        shipped: data?.shipped,
      };

      dispatch(setOrderStats(stats));
      dispatch(loadingAction(false));
    }
  } catch (e) {
    dispatch(loadingAction(false));
  }
};
