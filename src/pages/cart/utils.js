export const bulkDiscount = (item) => {
  let ornament_total_price = 0;
  let tumbler_total_price = 0;
  let jewelery_total_price = 0;

  let item_type =
    item?.catalog.id === 5
      ? "tumbler"
      : item.catalog?.id === 6
      ? "ornament"
      : item.catalog?.id === 27
      ? "jewelery"
      : "";

  let item_price = parseFloat(item?.catalog.price);

  let item_ship_price = 0;

  if (item_type === "tumbler") {
    if (item?.quantity < 3) {
      item_ship_price = item?.catalog.shipping_price;
    } else if (item?.quantity === 3) {
      item_ship_price = item?.catalog.shipping_price - 1;
    } else if (item?.quantity > 3) {
      item_ship_price = item?.catalog.shipping_price - 2;
    }
  } else if (item_type === "ornament" || item_type === "jewelery") {
    if (item?.quantity === 1) {
      item_ship_price = 4.2;
    } else if (item?.quantity > 1) {
      item_ship_price = 4.2 + (item?.quantity - 1 ) * 1.99;
    }
  }

  let ship_price = parseFloat(item_ship_price)

  console.log(
    item?.catalog.id,
    item_price ,
    ship_price,
    parseFloat(item_price + ship_price).toFixed(2),
    item_type,
    item?.quantity
  );

  return parseFloat(item_price + ship_price).toFixed(2);
};
