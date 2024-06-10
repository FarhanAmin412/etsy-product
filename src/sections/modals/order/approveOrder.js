import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import wallet_icon from "../../../assets/svg/wallet.svg";
import PaymentMethods from "./PaymentMethods";
import { approveOrder } from "../../../pages/orders/requests/local/approveOrder";

const ApproveOrder = ({ amount, totalOrders, payload, setSelected }) => {
  const dispatch = useDispatch();
  const [paymentMode, setPaymentMode] = useState("card");
  const isLoading = useSelector((state) => state.user.loadingButton);
  const walletAmount = useSelector((state) => state.payment.walletAmount);
  const userType = useSelector((state) => state.user.user.type);
  const wallet_amount = walletAmount ? parseFloat(walletAmount) : 0;

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
    >
      <img height={80} width={80} src={wallet_icon} alt="wallet icon" />
      <Typography variant="h4" color={"primary.main"} gutterBottom>
        Are you sure you want to approve this order?
      </Typography>
      {userType === "Seller" ? (
        <>
          <Typography variant="subtitle1" textAlign={"center"}>
            The total amount to be charged is ${amount}
          </Typography>

          <PaymentMethods
            amount={amount}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
          />
        </>
      ) : (
        <Typography variant="subtitle1" textAlign={"center"}>
          Total number of orders being approved: {totalOrders}
        </Typography>
      )}

      <Stack direction="row" justifyContent={"center"} style={{ width: "50%" }}>
        <Button
          variant="contained"
          color="inherit"
          fullWidth
          onClick={() => dispatch(setModalState(undefined))}
        >
          Cancel
        </Button>
        <Box sx={{ ml: 2 }} />
        <LoadingButton
          variant="contained"
          fullWidth
          onClick={() =>
            approveOrder(
              payload,
              amount,
              paymentMode,
              userType,
              setSelected,
              dispatch
            )
          }
          disabled={
            paymentMode === "wallet" && wallet_amount < amount ? true : false
          }
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Approve
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ApproveOrder;
