import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  amcard,
  discover,
  mastercard,
  visaCard,
} from "src/pages/cart/cartTypes";
import Iconify from "src/components/iconify/Iconify";
import wallet_icon from "../../../assets/svg/wallet.svg";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { LoadingButton } from "@mui/lab";
import { setWalletAmount } from "src/redux/actions/paymentActions";
import { checkIfExpiresSoon } from "src/pages/cart/payment/utils";
import { isEmpty } from "lodash";

const PaymentMethods = ({ amount, paymentMode, setPaymentMode }) => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultCard = useSelector((state) => state.payment.defaultCard);
  const walletAmount = useSelector((state) => state.payment.walletAmount);
  const wallet_amount = walletAmount ? parseFloat(walletAmount) : 0;
  const form = document.getElementById("form");

  const handleChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const getFormValue = (e) => {
    e.preventDefault();
    let payload = {
      amount: e.target.elements.amount.value,
    };
    addFunds(payload);
  };

  const addFunds = async (payload) => {
    setLoading(true);
    try {
      const res = await request.post("/payments/funds", payload);
      if (res) {
        getWalletAmount();
        toastify("success", res.data.message);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  const getWalletAmount = async () => {
    try {
      const res = await request.get("/payments/funds");

      if (res) {
        let wallet = res.data.data.wallet[0];
        setLoading(false);
        dispatch(setWalletAmount(wallet.amount));
        form.reset();
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      setLoading(false);
    }
  };

  return (
    <FormControl sx={{ width: "85%" }}>
      <Box sx={{width:"80%", margin:"0 auto"}}>

      <Typography variant="body2">Select a payment method:</Typography>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="card"
        name="radio-buttons-group"
        sx={{ mt: 1 }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          className="card-item"
          spacing={2}
          onClick={() => {
            setPaymentMode("card");
            setShowInput(false);
          }}
          sx={{
            border:
              paymentMode === "card"
                ? "2px solid #02b2fe"
                : "1px solid #02b2fe",
            margin: paymentMode === "card" ? "7.2px 0px" : "8px 0px",
            padding: "8px 0px",
            maxWidth: "460px",
          }}
        >
          <Radio
            checked={paymentMode === "card"}
            onChange={handleChange}
            value="card"
            name="radio-buttons1"
            inputProps={{ "aria-label": "A" }}
          />

          {!isEmpty(defaultCard) ? (
            <>
              <img
                src={
                  defaultCard?.card_type === "Visa"
                    ? visaCard
                    : defaultCard?.card_type === "Mastercard"
                    ? mastercard
                    : defaultCard?.card_type === "Discover"
                    ? discover
                    : amcard
                }
                width={40}
                height={40}
              />
              <Stack direction="column">
                <Typography variant="h6">
                  {defaultCard?.card_type} **** **** ****
                  {defaultCard?.card_number?.replace(/\s/g, "").slice(12)}
                </Typography>
                <Typography variant="p" color={"GrayText"}>
                  Expires {defaultCard?.card_expiry_month}/
                  {defaultCard?.card_expiry_year}
                  {checkIfExpiresSoon(defaultCard?.card_expiry_year)}
                </Typography>
              </Stack>
            </>
          ) : (
            <Typography variant="h6">No card added</Typography>
          )}
        </Stack>
        <Box
          className="radio-container"
          onClick={() => setPaymentMode("wallet")}
          sx={{
            border:
              paymentMode === "wallet"
                ? "2px solid #02b2fe"
                : "1px solid #02b2fe",
            margin: paymentMode === "wallet" ? "7.2px 0px" : "8px 0px",
            padding: "8px 0px",
            maxWidth: "460px",
          }}
        >
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={1.5}>
              <Radio
                checked={paymentMode === "wallet"}
                onChange={handleChange}
                value="wallet"
                name="radio-buttons2"
                inputProps={{ "aria-label": "B" }}
              />
            </Grid>
            <Grid item xs={7.5}>
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <img
                  height={35}
                  width={35}
                  src={wallet_icon}
                  alt="wallet icon"
                />
                <Typography variant="h6">Wallet</Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant="h4" color="#9aac58">
                  ${walletAmount ? parseFloat(walletAmount)?.toFixed(2) : 0}
                </Typography>
                <Iconify
                  icon="ic:round-plus"
                  sx={{ width: 30, height: 30, cursor: "pointer", ml: 1 }}
                  color="primary.main"
                  onClick={() => setShowInput(true)}
                >
                  +
                </Iconify>
              </Stack>
            </Grid>
          </Grid>
          {wallet_amount < amount && paymentMode === "wallet" ? (
            <Alert severity="error" mx={2}>
              The total amount is less then the amount in your wallet. Add funds
              to your wallet to approve.
            </Alert>
          ) : (
            ""
          )}
          {showInput && (
            <form id="form" onSubmit={(e) => getFormValue(e)}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
                sx={{ margin: "16px" }}
              >
                <TextField
                  type="text"
                  label="Amount"
                  name="amount"
                  size="small"
                  fullWidth
                  required
                />

                <LoadingButton
                  variant="contained"
                  type="submit"
                  size="small"
                  loading={loading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                >
                  Add
                </LoadingButton>
              </Stack>
            </form>
          )}
        </Box>
      </RadioGroup>
      </Box>
    </FormControl>
  );
};

export default PaymentMethods;
