import { format } from "date-fns";
import { formatDate } from "src/utils/formatDate";

const getItemsInOrder = (orderDetails) => {
  let items_quantity = orderDetails?.map((item) => item.quantity);
  const totalItems = items_quantity?.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return totalItems;
};

const orderStatus = (order, userType) => {
  if (order?.orderDetails[0]?.order_status === "shipped") {
    return userType === "Seller" ? "fulfilled" : "shipped";
  } else {
    if (userType === "Seller") {
      if (order?.seller_approved === 1) {
        return "In Production";
      } else if (order?.seller_approved === 0) {
        return "On Hold";
      }
    } else {
      if (order?.admin_approved === 1) {
        return "awaiting shipment";
      } else if (order?.admin_approved === 0) {
        return "awaiting approval";
      }
    }
  }
};

export const formatOrderList = (ordersList, userType) => {
  const formatInnerOrders =
    ordersList && ordersList.length
      ? ordersList.map((item) => ({
          id: item?.id ? item?.id : 0,
          etsy_order_id: item?.etsy_order_id ? item?.etsy_order_id : null,
          amazon_order_id: item?.amazon_order_id? item?.amazon_order_id : null,
          tracking_id: item?.tracking_id ? item?.tracking_id: null,
          user_name: item.user ? item.user : "",
          notes: item.notes ? item.notes : "",
          priorty_mail_shipping: item?.priorty_mail_shipping ? item?.priorty_mail_shipping : null,
          name:
          item?.customer_name  && item?.customer_name === null &&
            JSON.parse(item?.orderDetails[0]?.shipping_details)?.billToName
              ? JSON.parse(item?.orderDetails[0]?.shipping_details)?.billToName
              : item.customer_name,
          date: item?.date ? formatDate(item?.date) : null,
          total_items: item?.orderDetails && item?.orderDetails
            ? getItemsInOrder(item?.orderDetails)
            : 0,
          link: item?.orderDetails ? item?.orderDetails[0]?.graphic_image : "",
          approval_date:
          item?.approval_date_seller && item?.approval_date_seller === null
              ? "-"
              : format(
                  new Date(item?.approval_date_seller),
                  "MMMM dd | HH:mm | yyyy"
                ),
          amount: item?.amount ? item?.amount : 0,
          discounted_price: item?.discounted_price ? item?.discounted_price : 0,
          etsy_cost:
            item?.is_etsy === 1 && item?.etsy_cost
              ? item?.etsy_cost?.shipping_price + item?.etsy_cost?.total_price
              : 0,
          amazon_cost:
            item?.is_amazon === 1 && item?.amazon_cost?.total_price
              ? item?.amazon_cost?.total_price
              : 0,
          is_deleted: item?.is_deleted,
          is_refunded: item?.is_refunded,
          refunded_amount: item?.refunded_amount,
          status: item ? orderStatus(item, userType) : "",
          type:
            item?.is_etsy === 1
              ? "Etsy"
              : item?.is_amazon === 1
              ? "Amazon"
              : "InnerCircle",
          is_etsy: item?.is_etsy,
          is_amazon: item?.is_amazon,
          orderDetails: item?.orderDetails ? item.orderDetails : [],
          notes_to_seller: item?.notes_to_seller,
        }))
      : [];

  return formatInnerOrders;
};
