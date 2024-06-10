import { format } from "date-fns";

export const formatedEtsyOrders = (etsyOrders) => {
  let array =
    etsyOrders && etsyOrders.length
      ? etsyOrders.map((etsyOrder) => ({
          etsy_order_id: etsyOrder?.receipt_id,
          customer_name: etsyOrder?.name,
          shipping_price: etsyOrder?.total_shipping_cost
            ? etsyOrder?.total_shipping_cost.amount /
              etsyOrder?.total_shipping_cost.divisor
            : 0,
          total_price: etsyOrder?.total_price
            ? etsyOrder?.total_price.amount / etsyOrder?.total_price.divisor
            : 0,
          notes_to_seller: etsyOrder?.message_from_buyer
            ? etsyOrder?.message_from_buyer
            : "",
          timestamp: etsyOrder?.created_timestamp
            ? format(
                new Date(etsyOrder?.created_timestamp * 1000),
                "yyyy-MM-dd HH:mm:ss"
              )
            : null,
          items: etsyOrder?.transactions?.map((item) => ({
            catalog_id: item?.icp_details[0]?.catalog.id,
            ordered_graphic: item?.icp_details[0]?.graphic_image
              ? item?.icp_details[0]?.graphic_image?.search("image") > 1
                ? item?.icp_details[0]?.graphic_image
                    .split(".com/")[1]
                    .split("?")[0]
                : item?.icp_details[0]?.graphic_image
              : "",
            notecard_graphic: item?.icp_details[0]?.notecard_image
              ? item?.icp_details[0]?.notecard_image?.search("image") > 1
                ? item?.icp_details[0]?.notecard_image
                    ?.split(".com/")[1]
                    .split("?")[0]
                : item?.icp_details[0]?.notecard_image
              : "",
            preview_image: item?.icp_details[0]?.preview_image
              ? item?.icp_details[0]?.preview_image
              : "",
            quantity: item?.quantity ? item?.quantity : 0,
            description: item?.icp_details[0]?.description
              ? item?.icp_details[0]?.description
              : "",
            variations: item?.variations ? item?.variations : [],
            item_price: item ? bulkDiscountOnSave(item?.icp_details[0]) : 0,
          })),
          info: {
            billToName: etsyOrder?.name,
            shipToName: etsyOrder?.name,
            company: "",
            street1: etsyOrder?.first_line,
            street2: etsyOrder?.second_line,
            city: etsyOrder?.city,
            state: etsyOrder?.state === null ? "NA" : etsyOrder?.state,
            postal_code: etsyOrder?.zip,
            country: etsyOrder?.country_iso,
            phone: "",
          },
        }))
      : [];

  return array;
};

const bulkDiscountOnSave = (item) => {
  let item_type =
    item?.catalog.id === 5 && checkTitle(item?.catalog.title)
      ? "tumbler"
      : "ornament";

  let item_price = parseFloat(item?.catalog.price);
  let item_ship_price =
    item_type === "tumbler"
      ? item?.quantity < 3
        ? item?.catalog.shipping_price
        : item?.quantity === 3
        ? item?.catalog.shipping_price - 1
        : item?.quantity > 3
        ? item?.catalog.shipping_price - 2
        : 0
      : item?.catalog.shipping_price;

  return parseFloat(item_price + parseFloat(item_ship_price)).toFixed(2);
};

const checkTitle = (string) => {
  const searchString = "tumbler";
  const regex = new RegExp(searchString, "i");

  if (string.match(regex)) {
    return true;
  } else {
    return false;
  }
};
