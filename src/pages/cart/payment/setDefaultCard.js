import request from "src/utils/request";
import { setDefaultCard } from "src/redux/actions/paymentActions";

export const getCards = async (dispatch) => {
  try {
    const res = await request.get(`/card`);

    if (res) {
      const response = res.data.data.Cards;
      const filterDefaultCard = response.filter(
        (item) => item.is_default === 1
      );

      dispatch(setDefaultCard(filterDefaultCard[0]));
    }
  } catch (e) {
    if (e.response.status === 404) {
      dispatch(setDefaultCard({}));
    }
  }
};
