import { format } from "date-fns";

export const formatAmazonOrders = (amazonOrders) => {
  let array =
    amazonOrders && amazonOrders.length
      ? amazonOrders.map((item) => ({
          amazon_order_id: item.AmazonOrderId,
          timestamp: format(new Date(item.PurchaseDate), "yyyy-MM-dd HH:mm:ss"),
          customer_name: "",
          shipping_price: 0,
          total_price: item.OrderTotal.Amount,
          notes_to_seller: "",
          items: item.items.map((orderItem) => ({
            AmazonOrderItemID: orderItem?.OrderItemId,
            ordered_graphic: orderItem?.icp_details?.graphic_image
              ? orderItem?.icp_details?.graphic_image?.search("image") > 1
                ? orderItem?.icp_details?.graphic_image
                    .split(".com/")[1]
                    .split("?")[0]
                : orderItem?.icp_details?.graphic_image
              : "",
            notecard_graphic: orderItem?.icp_details?.notecard_image
              ? orderItem?.icp_details?.notecard_image?.search("image") > 1
                ? orderItem?.icp_details?.notecard_image
                    ?.split(".com/")[1]
                    .split("?")[0]
                : orderItem?.icp_details?.notecard_image
              : "",
            preview_image: orderItem?.icp_details?.preview_image,
            quantity: orderItem?.QuantityOrdered,
            description: orderItem?.icp_details?.description,
            catalog_id: orderItem?.icp_details?.catalog?.id,
            personalization_details: "",
            item_price: bulkDiscountOnSave(orderItem?.icp_details),
          })),

          info: {
            billToName: "",
            shipToName: "",
            company: "",
            street1: "",
            street2: "",
            city: item?.ShippingAddress?.City,
            state: item?.ShippingAddress?.StateOrRegion,
            postal_code: item?.ShippingAddress?.PostalCode,
            country: item?.ShippingAddress?.CountryCode,
            phone: "",
          },
        }))
      : [];

  return array;
};

export const bulkDiscountOnSave = (item) => {
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

export const checkTitle = (string) => {
  const searchString = "tumbler";
  const regex = new RegExp(searchString, "i");

  if (string.match(regex)) {
    return true;
  } else {
    return false;
  }
};
