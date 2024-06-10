import request from "src/utils/request";
import { Paper, styled } from "@mui/material";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import { fToNow } from "src/utils/formatTime";
import ApproveOrder from "src/sections/modals/order/approveOrder";
import { getUploadedImage } from "src/sections/modals/order/utils";

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

export const TABLE_HEAD = [
  { label: "Order ID #", id: "etsy_order_id" },
  { label: "Customer Name", id: "name" },
  { label: "Total Items", id: "total_items" },
  { label: "Amount", id: "amount" },
  { label: "Order Date", id: "date" },
  { label: "Approval Date", id: "approval_date" },
];

export const formatTableData = (row, userType) => {
  const {
    id,
    etsy_order_id,
    amazon_order_id,
    user_name,
    name,
    date,
    approval_date,
    total_items,
    amount,
    etsy_cost,
    tracking_id,
    is_amazon,
    is_etsy,
    amazon_cost,
  } = row;

  let calculatedAmount = row ? calculateAmount(row) : 0;

  const TABLE_DATA = [
    {
      label: "Order ID #",
      id: "etsy_order_id",
      value: etsy_order_id ? (
        <a
          href={` https://www.etsy.com/your/orders/sold/new?order_id=${etsy_order_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {etsy_order_id}
        </a>
      ) : amazon_order_id ? (
        amazon_order_id
      ) : (
        id
      ),
    },
    { label: "Customer Name", id: "name", value: name },
    { label: "Seller Name", id: "user_name", value: user_name },
    {
      label: "Total Items",
      id: "total_items",
      value: total_items,
    },
    {
      label: "Amount",
      id: "amount",
      value: `$${parseFloat(calculatedAmount).toFixed(2)}`,
    },

    {
      label: `${
        is_etsy === 1 ? " Etsy" : is_amazon === 1 ? "Amazon" : "ICP"
      } Cost`,
      id: "etsy_cost",
      value: `$${
        is_etsy === 1 && etsy_cost
          ? parseFloat(etsy_cost).toFixed(2)
          : is_amazon === 1
          ? parseFloat(amazon_cost).toFixed(2)
          : amount
      }`,
    },
    { label: "Order Date", id: "date", value: fToNow(date) },
    {
      label: "Approval Date",
      id: "approval_date",
      value: approval_date,
    },
    {
      label: "Tracking ID",
      id: "tracking_id",
      value: tracking_id ? tracking_id : "-",
    },
  ];

  let tableData =
    userType === "Seller"
      ? TABLE_DATA.filter(
          (item) => item.id !== "approval_date" && item.id !== "user_name"
        )
      : TABLE_DATA;

  return tableData;
};

const checkimageURL = (url) => {
  if (typeof url === "string") {
    const canvaUrl = url.search("canva");
    const kittlUrl = url.search("kittl");
    const adobeUrl = url.search("adobe");

    if (canvaUrl > 0 || kittlUrl > 0 || adobeUrl > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    const canvaUrl = url[0].search("canva");
    const kittlUrl = url[0].search("kittl");
    const adobeUrl = url[0].search("adobe");

    if (canvaUrl > 0 || kittlUrl > 0 || adobeUrl > 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const calculateAmount = (order) => {
  let additionalUnits = order?.orderDetails?.length - 1;
  let additionalShippingCost = additionalUnits * 2.5;

  let discounted_amount = order ? bulkDiscount(order) : 0;

  let amount =
    discounted_amount === order?.amount ? order.amount : discounted_amount;

  let subTotal =
    order?.priorty_mail_shipping === 1
      ? parseFloat(amount) + 5.99 + additionalShippingCost
      : parseFloat(amount);

  return parseFloat(subTotal).toFixed(2);
};

export const bulkDiscount = (order) => {
  let ornament_total_price = 0;
  let tumbler_total_price = 0;
  let jewelery_total_price = 0;
  let standard_shipping_total_price = 0;
  let priority_shipping_total_price = 0;
  let tumbler_lid_total_price = 0;
  let tumbler_straw_total_price = 0;

  let tumblers = order?.orderDetails?.filter((item) => item?.catalog?.id === 5);
  let ornaments = order?.orderDetails?.filter((item) => item.catalog?.id === 6);
  let jewelery = order?.orderDetails?.filter((item) => item.catalog?.id === 27);
  let standard_shipping = order?.orderDetails?.filter(
    (item) => item.catalog?.id === 28
  );
  let priority_shipping = order?.orderDetails?.filter(
    (item) => item.catalog?.id === 29
  );
  let tumbler_lid = order?.orderDetails?.filter(
    (item) => item.catalog?.id === 30
  );
  let tumbler_straw = order?.orderDetails?.filter(
    (item) => item.catalog?.id === 31
  );

  const ornament_price = 6.09;
  const tumbler_price = 9.67;
  const jewelery_price = 8.79;
  const tumbler_lid_price = 1.99;
  const tumbler_straw_price = 1;

  const ornament_initial_ship_price = 4.2;
  const ornament_additional_ship_price = 1.99;

  const tumbler_ship_price =
    tumblers?.length < 3
      ? 5.83
      : tumblers?.length === 3
      ? 4.83
      : tumblers?.length > 3
      ? 3.83
      : 0;

  const jewelery_initial_ship_price = 4.2;
  const jewelery_additional_ship_price = 1.99;

  const standard_shipping_ship_price = 5.83;
  const priority_shipping_ship_price = 11.82;
  const tumbler_lid_ship_price = 3.99;
  const tumbler_straw_ship_price = 3.99;

  if (ornaments?.length === 1) {
    ornament_total_price = ornament_price + ornament_initial_ship_price;
  } else if (ornaments?.length > 1) {
    let ornament_shippingCost =
      ornament_initial_ship_price +
      ornament_additional_ship_price * (ornaments?.length - 1);
    ornament_total_price =
      ornament_price * ornaments?.length + ornament_shippingCost;
  }

  if (jewelery?.length === 1) {
    jewelery_total_price = jewelery_price + jewelery_initial_ship_price;
  } else if (jewelery?.length > 1) {
    let jewelery_shippingCost =
      jewelery_initial_ship_price +
      jewelery_additional_ship_price * (jewelery?.length - 1);
    jewelery_total_price =
      jewelery_price * jewelery?.length + jewelery_shippingCost;
  }

  for (let i = 0; i < tumblers?.length; i++) {
    tumbler_total_price =
      tumbler_total_price + tumbler_price + tumbler_ship_price;
  }

  for (let i = 0; i < standard_shipping?.length; i++) {
    standard_shipping_total_price =
      standard_shipping_total_price + standard_shipping_ship_price;
  }

  for (let i = 0; i < priority_shipping?.length; i++) {
    priority_shipping_total_price =
      priority_shipping_total_price + priority_shipping_ship_price;
  }

  for (let i = 0; i < tumbler_lid?.length; i++) {
    tumbler_lid_total_price =
      tumbler_lid_total_price + tumbler_lid_price + tumbler_lid_ship_price;
  }

  for (let i = 0; i < tumbler_straw?.length; i++) {
    tumbler_straw_total_price =
      tumbler_straw_total_price +
      tumbler_straw_price +
      tumbler_straw_ship_price;
  }

  return (
    ornament_total_price +
    tumbler_total_price +
    jewelery_total_price +
    standard_shipping_total_price +
    priority_shipping_total_price +
    tumbler_lid_total_price +
    tumbler_straw_total_price
  );
};

const checkVariationsTitle = (orderDetail) => {
  if (Array.isArray(orderDetail?.personalization_details)) {
    if (orderDetail?.catalog.id === 27) {
      let title1 = orderDetail?.personalization_details[0]
        ? orderDetail?.personalization_details[0].formatted_name?.toLowerCase()
        : "";
      let title2 = orderDetail?.personalization_details[1]
        ? orderDetail?.personalization_details[1].formatted_name?.toLowerCase()
        : "";
      if (title1 === "color" && title2 === "size") {
        return false;
      } else {
        return true;
      }
    } else {
      if (orderDetail?.personalization_details === null) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (orderDetail?.catalog.id === 27) {
      if (orderDetail?.personalization_details === null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export const handleOnHoldOrder = (
  order,
  selectedOrder,
  setSelected,
  userType,
  dispatch
) => {
  let hasCanvaUrl;
  let displayMessage = "";
  let payload = [];
  let totalAmount = "";
  let totalOrders = 0;
  let addressIncomplete;
  let variationNotUpdated;

  if (Object.keys(order).length === 0 && selectedOrder.length > 0) {
    let finalised_graphics = selectedOrder.map((order) =>
      order?.orderDetails?.map((item) => getUploadedImage(item))
    );
    let checkcanva = finalised_graphics[0].map((imageURL) =>
      imageURL.map((url) => checkimageURL(url))
    );
    hasCanvaUrl = checkcanva.some((subArr) => subArr.includes(true));

    let shippingAddress = selectedOrder.map((order) =>
      order?.orderDetails[0]?.shipping_details
        ? JSON.parse(order?.orderDetails[0]?.shipping_details)
        : {}
    );
    let checkAddresses = shippingAddress.map((address) =>
      address.billToName || address.shipToName || address.street1 ? false : true
    );

    addressIncomplete = checkAddresses.includes(true);

    let checkIfVariationNotUpdated = selectedOrder.map((order) =>
      order?.orderDetails?.map((item) => checkVariationsTitle(item))
    );

    variationNotUpdated = checkIfVariationNotUpdated.some((subArr) =>
      subArr.includes(true)
    );

    totalOrders = selectedOrder.length;

    displayMessage =
      "Some of these orders contain Canva Urls. Please upload Graphic Images";

    let allAmounts = selectedOrder.map((order) => calculateAmount(order));

    totalAmount = allAmounts
      ? allAmounts
          .map(Number)
          .reduce((partialSum, a) => partialSum + a, 0)
          .toFixed(2)
      : 0;

    //bulk payload
    if (userType === "Seller") {
      payload = selectedOrder.map((order) => ({
        order_id: order.id,
        amount: calculateAmount(order),
      }));
    } else {
      payload = selectedOrder.map((order) => ({
        order_id: order.id,
        order_status: "awaiting_shipment",
      }));
    }
  } else {
    let shippingAddress = order?.orderDetails[0]?.shipping_details
      ? JSON.parse(order?.orderDetails[0]?.shipping_details)
      : {};

    displayMessage = "Please upload Graphic Image";
    totalOrders = 1;
    totalAmount = calculateAmount(order);

    let checkIfVariationNotUpdated = order?.orderDetails?.map((item) =>
      checkVariationsTitle(item)
    );

    variationNotUpdated = checkIfVariationNotUpdated.some((item) => item);

    let finalised_graphics = order?.orderDetails?.map((item) =>
      getUploadedImage(item)
    );
    let checkcanva = finalised_graphics[0].map((imageURL) =>
      checkimageURL(imageURL)
    );
    hasCanvaUrl = checkcanva.some((item) => item);

    if (
      shippingAddress.billToName ||
      shippingAddress.shipToName ||
      shippingAddress.street1
    ) {
      addressIncomplete = false;
    } else {
      addressIncomplete = true;
    }

    //single payload
    if (userType === "Seller") {
      payload = [
        {
          order_id: order.id,
          amount: totalAmount,
        },
      ];
    } else {
      payload = [
        {
          order_id: order.id,
          order_status: "awaiting_shipment",
        },
      ];
    }
  }
  if (userType === "Seller") {
    if (hasCanvaUrl) {
      toastify("warning", displayMessage);
    } else if (addressIncomplete) {
      toastify("warning", "Please complete shipping address first");
    } else if (variationNotUpdated) {
      toastify("warning", "Please update variations first");
    } else {
      dispatch(
        setModalState(
          <ApproveOrder
            amount={totalAmount}
            totalOrders={totalOrders}
            payload={payload}
            setSelected={setSelected}
          />
        )
      );
    }
  } else {
    dispatch(
      setModalState(
        <ApproveOrder
          amount={totalAmount}
          totalOrders={totalOrders}
          payload={payload}
          setSelected={setSelected}
        />
      )
    );
  }
};

export const handleImagesToDownload = async (
  order,
  selectedOrder,
  dispatch
) => {
  var orderIDs;
  dispatch(loadingAction(true));

  if (Object.keys(order).length === 0 && selectedOrder.length > 0) {
    orderIDs = selectedOrder.map((order) => order.id);
  } else if (Object.keys(order).length) {
    orderIDs = [order.id];
  }

  const payload = {
    order_ids: orderIDs,
  };

  try {
    const res = await request.post(`/orders/bulk/download`, payload);

    if (res) {
      const url = res.data.data[1];
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch(loadingAction(false));
      toastify("success", res.data.message);
    }
  } catch (e) {
    toastify("error", e.response.data.message);
    dispatch(loadingAction(false));
  }
};

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
