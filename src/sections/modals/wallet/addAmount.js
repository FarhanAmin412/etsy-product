import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { setModalState } from "src/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { getWalletAmount } from "src/pages/settings/utils";
import wallet_icon from "../../../assets/svg/wallet.svg";

const AddAmount = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loadingButton);

  const getFormValue = (e) => {
    e.preventDefault();
    let payload = {
      amount: e.target.elements.amount.value,
    };
    addFunds(payload);
  };

  const addFunds = async (payload) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post("/payments/funds", payload);
      if (res) {
        toastify("success", res.data.message);
        dispatch(loadingBtnAction(false));
        dispatch(setModalState(undefined));
        getWalletAmount(dispatch);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(setModalState(undefined));
      dispatch(loadingBtnAction(false));
    }
  };

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
    >
      <img height={80} width={80} src={wallet_icon} alt="wallet icon" />
      <Typography variant="h4" color={"primary.main"} gutterBottom>
        Add funds to your wallet
      </Typography>
      <Typography variant="subtitle2" gutterBottom sx={{ width: "80%" }}>
        The funds in your wallet will be used to approve orders. If you don't
        have sufficient funds the remaining amount will be deducted from your
        card.
      </Typography>
      <form onSubmit={(e) => getFormValue(e)} style={{ width: "50%" }}>
        <TextField
          fullWidth
          type="text"
          label="Amount"
          name="amount"
          required
        />

        <Stack direction="row" justifyContent={"center"} sx={{ mt: 2 }}>
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
            type="submit"
            fullWidth
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddAmount;
