import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateAmount,
  handleImagesToDownload,
  handleOnHoldOrder,
} from "src/components/ordersTable/utils";
import Iconify from "src/components/iconify/Iconify";
import DeleteOrder from "src/sections/modals/order/deleteOrder";
import ShippingForm from "src/components/shipping-address/shippingForm";
import RefundOrder from "src/sections/modals/order/RefundOrder";
import Icon from "src/components/svg-icons/icon";
import etsy_icon from "../../assets/icons/etsy.svg";
import amazon_icon from "../../assets/icons/Amazon_icon.png";
import innercircle_logo from "../../assets/logo.png";
import { setModalState } from "src/redux/actions/modalActions";
import { updateShippingAddress } from "./requests/local/updateShippingAddress";
import { onDeleteOrder } from "./requests/local/deleteOrder";

export const StyledButton = styled(Button)(() => ({
  borderRadius: 12,
  fontWeight: 800,
}));

const ActionIcons = ({
  row,
  orderStatus,
  selectedOrder,
  setSelected,
  openAddNotePopup,
  notes,
}) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const total = calculateAmount(row);
  const [addressInComplete, setAddressIncomplete] = useState(false);
  const shippingAddress = row?.orderDetails[0]?.shipping_details
    ? JSON.parse(row?.orderDetails[0]?.shipping_details)
    : {};

  useEffect(() => {
    if (
      shippingAddress.billToName ||
      shippingAddress.shipToName ||
      shippingAddress.street1
    ) {
      setAddressIncomplete(false);
    } else {
      setAddressIncomplete(true);
    }
  }, [addressInComplete, shippingAddress]);

  const onSubmitHandler = (data, country) => {
    const payload = {
      order_id: row.id,
      shipping_info: {
        billToName: data.firstName + " " + data.lastName,
        shipToName: data.firstName + " " + data.lastName,
        country: country.value,
        ...data,
      },
    };
    updateShippingAddress(dispatch, payload, userType);
  };

  return (
    <Box p={2}>
      <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={2}
      >
        {orderStatus === "on hold" ? (
          <IconButton
            color="inherit"
            onClick={() =>
              dispatch(
                setModalState(
                  <ShippingForm
                    shippingAddress={shippingAddress}
                    onSubmit={onSubmitHandler}
                  />
                )
              )
            }
          >
            <Tooltip title="Edit shipping address">
              {addressInComplete ? (
                <Badge badgeContent="!" color="error">
                  <Iconify icon="tabler:home-edit" />
                </Badge>
              ) : (
                <Iconify icon="tabler:home-edit" />
              )}
            </Tooltip>
          </IconButton>
        ) : (
          <></>
        )}

        {orderStatus === "on hold" ||
        orderStatus === "awaiting approval" ||
        orderStatus === "awaiting shipment" ||
        orderStatus === "shipped" ? (
          <Tooltip title="Delete" arrow>
            <Iconify
              icon={"eva:trash-2-outline"}
              sx={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(
                  setModalState(
                    <DeleteOrder
                      deleteOrder={() =>
                        onDeleteOrder(row.id, userType, dispatch)
                      }
                    />
                  )
                )
              }
            />
          </Tooltip>
        ) : (
          <></>
        )}

        {userType === "Super Admin" ? (
          orderStatus === "awaiting shipment" || orderStatus === "shipped" ? (
            <Tooltip title="Download">
              <Iconify
                sx={{ cursor: "pointer" }}
                color="primary.main"
                icon="bi:cloud-download"
                onClick={() =>
                  handleImagesToDownload(row, selectedOrder, dispatch)
                }
              />
            </Tooltip>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {orderStatus === "awaiting approval" ||
        orderStatus === "awaiting shipment" ||
        orderStatus === "shipped" ? (
          <Tooltip title="Refund">
            <Iconify
              icon="mdi:credit-card-refund-outline"
              color="primary.main"
              sx={{ width: 24, height: 24, cursor: "pointer" }}
              onClick={() =>
                dispatch(setModalState(<RefundOrder order={row} />))
              }
            />
          </Tooltip>
        ) : (
          ""
        )}

        {row?.is_refunded === 1 ? (
          <Stack direction={"column"}>
            <StyledButton size="small" variant="outlined">
              {row?.refunded_amount < total
                ? "Partially Refunded"
                : row?.refunded_amount === total
                ? "Fully Refunded"
                : "Refunded"}
              <br />
              Amount: ${row?.refunded_amount}
            </StyledButton>
          </Stack>
        ) : (
          <></>
        )}

        {!notes && userType === "Super Admin" && (
          <Tooltip title="Add Notes">
            <Iconify
              icon="ic:baseline-plus"
              sx={{ cursor: "pointer" }}
              onClick={openAddNotePopup}
            />
          </Tooltip>
        )}
        <Icon
          icon={
            row?.type === "Etsy"
              ? etsy_icon
              : row?.type === "Amazon"
              ? amazon_icon
              : innercircle_logo
          }
          style={{ width: "26px" }}
        />
      </Stack>

      {orderStatus === "on hold" || orderStatus === "awaiting approval" ? (
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 3 }}
          //  endIcon={<Iconify icon="eva:diagonal-arrow-right-up-outline"/>}
          onClick={() =>
            handleOnHoldOrder(
              row,
              selectedOrder,
              setSelected,
              userType,
              dispatch
            )
          }
        >
          Approve Order
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ActionIcons;
