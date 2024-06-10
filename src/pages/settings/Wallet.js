import React, { useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { getWalletAmount } from "./utils";
import { loadingBtnAction } from "src/redux/actions/userActions";
import AddAmount from "src/sections/modals/wallet/addAmount";
import Iconify from "src/components/iconify/Iconify";

const Wallet = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.user);
  const amount = useSelector((state) => state.payment.walletAmount);

  useEffect(() => {
    dispatch(loadingBtnAction(false));
    getWalletAmount(dispatch);
  }, []);

  return (
    <Container sx={{ my: 3 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Stack direction={"row"}  flexWrap={"wrap"} >
          <img
            height={80}
            width={80}
            style={{ borderRadius: "50%" }}
            src={account.image}
            alt="profile image"
          />
          <Stack direction={"column"}sx={{ ml: 2 }}>
            <Typography variant="h6">{account.name}</Typography>
            <Typography variant="subtitle1">{account.email}</Typography>
            <Typography variant="subtitle1"> ID No: # {account.id}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} sx={{ ml: 2 }}>
            <Typography variant="h2" color="#9aac58">
              ${amount ? parseFloat(amount)?.toFixed(2) : 0}
            </Typography>
            <Typography variant="subtitle1">Current Balance</Typography>
          </Stack>
          <Iconify
            icon="ic:round-plus"
            sx={{ width: 40, height: 40, cursor: "pointer", mt: 1 }}
            color="primary.main"
            onClick={() => dispatch(setModalState(<AddAmount />))}
          >
            +
          </Iconify>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Wallet;
