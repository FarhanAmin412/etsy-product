import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { calculateAmount } from "src/components/ordersTable/utils";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { refundOrders } from "src/pages/orders/requests/local/refundOrders";

const RefundOrder = ({ order }) => {
  const dispatch = useDispatch();
  const [showTextField, setShowTextField] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const loading = useSelector((state) => state.user.loadingButton);
  const userType = useSelector((state) => state.user.user.type);
  const total = calculateAmount(order);

  const onSubmit = (e) => {
    e.preventDefault();
    let amount = e.target.elements.amount.value;
    const form = document.getElementById("form");
    setLoading(true);

    let payload = {
      orders: [
        {
          order_id: order.id,
          amount: amount,
        },
      ],
    };

    refundOrders(dispatch, payload, setLoading, userType);
    form.reset();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Refund Order
      </Typography>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="column" mb={2}>
          <Typography variant="body1" component="span">
            <b>Order ID #:</b>{" "}
            {order.etsy_order_id ? order.etsy_order_id : order.id}
          </Typography>

          <Typography variant="body1" component="span">
            <b>Customer Name: </b> {order.name}
          </Typography>

          <Typography variant="body1" component="span">
            <b>Total Amount:</b> ${total}
          </Typography>
        </Stack>
        <Box>
          <LoadingButton
            variant="contained"
            size="small"
            loading={loading}
            loadingIndicator={<CircularProgress size={12} color="inherit" />}
            onClick={() => {
              dispatch(loadingBtnAction(true));
              let payload = {
                orders: [
                  {
                    order_id: order.id,
                    amount: total,
                  },
                ],
              };
              refundOrders(dispatch, payload, setLoading, userType);
            }}
          >
            Full Refund
          </LoadingButton>
        </Box>
      </Stack>

      <Typography
        variant="body1"
        component="span"
        color={"primary.main"}
        sx={{ cursor: "pointer" }}
        onClick={() => setShowTextField(true)}
      >
        + Add an amount to refund
      </Typography>
      {showTextField && (
        <form id="form" onSubmit={(e) => onSubmit(e)}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            spacing={2}
            alignItems={"center"}
            mt={3}
          >
            <TextField
              label="Amount"
              type="text"
              name="amount"
              size="small"
              fullWidth
              required
            />
            <Box>
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingIndicator={
                  <CircularProgress size={12} color="inherit" />
                }
                variant="contained"
              >
                Refund
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      )}
    </>
  );
};

export default RefundOrder;
