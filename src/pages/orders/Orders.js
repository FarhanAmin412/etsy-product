import React, { useEffect, useState } from "react";
import SellerTable from "./SellerTable";
import AdminTable from "./AdminTable";
import UploadFiles from "./UploadFiles";
import { getWalletAmount } from "../settings/utils";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { setEtsyOrderList } from "src/redux/actions/orderActions";
import { loadingBtnAction } from "src/redux/actions/userActions";
import { Button, Container, Stack, Tooltip, Typography } from "@mui/material";
import { getAmazonOrdersList } from "./requests/amazon";
import { getEtsyOrdersList } from "./requests/etsy";
import { getAllOrdersList } from "./requests/local";
import { getCards } from "../cart/payment/setDefaultCard";
import { formatOrderList } from "./requests/local/format";
import Iconify from "src/components/iconify";

export default function Orders() {
  const dispatch = useDispatch();

  const [ORDERLIST, setOrderList] = useState([]);
  const [disableEtsy, setDisableEtsy] = useState(false);
  const [disableAmazon, setDisableAmazon] = useState(false);

  const [value, setValue] = useState(
    sessionStorage.getItem("activeTabIndex") || "1"
  );
  const ordersList = useSelector((state) => state.orders.ordersList);
  const userType = useSelector((state) => state.user.user.type);

  const page =
    sessionStorage.getItem("page") !== null
      ? sessionStorage.getItem("page")
      : 1;

  const rowsPerPage =
    sessionStorage.getItem("rowsPerPage") !== null
      ? sessionStorage.getItem("rowsPerPage")
      : 25;

  const tabValue = sessionStorage.getItem("activeTabIndex")
    ? sessionStorage.getItem("activeTabIndex")
    : "1";

  useEffect(() => {
    dispatch(setEtsyOrderList([]));
    getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
    dispatch(setModalState(undefined));
    dispatch(loadingBtnAction(false));

    if (userType === "Seller") {
      getCards(dispatch);
      getWalletAmount(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrderList(formatOrderList(ordersList, userType));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sessionStorage.setItem("activeTabIndex", newValue);
    getAllOrdersList(dispatch, userType, page, rowsPerPage, newValue);
  };

  const handleClick = (type) => {
    if (type === "Etsy") {
      getEtsyOrdersList(userType, dispatch);

      setDisableEtsy(true);
      setTimeout(() => {
        setDisableEtsy(false);
      }, 5 * 60 * 1000);
    } else {
      getAmazonOrdersList(userType, dispatch);

      setDisableAmazon(true);
      setTimeout(() => {
        setDisableAmazon(false);
      }, 5 * 60 * 1000);
    }
  };

  return (
    <Container maxWidth="2xl">
      <Stack
        direction={"row"}
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ mb: 5 }}
        spacing={3}
      >
        <Typography variant="h4">My Orders</Typography>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          spacing={2}
        >
          {userType === "Super Admin" ? (
            <UploadFiles />
          ) : (
            <>
              <Tooltip title="If the order isn't saved correctly, simply delete it and fetch it again from Etsy ">
                <Iconify icon={"mdi:question-mark-circle-outline"} />
              </Tooltip>
              <Button
                variant="contained"
                size="small"
                disabled={disableEtsy}
                onClick={() => handleClick("Etsy")}
              >
                Fetch Orders from Etsy
              </Button>

              <Button
                variant="contained"
                size="small"
                disabled={disableAmazon}
                onClick={() => handleClick("Amazon")}
              >
                Fetch Orders from Amazon
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      {userType === "Seller" ? (
        <SellerTable
          value={value}
          handleChange={handleChange}
          ORDERLIST={ORDERLIST}
          userType={userType}
        />
      ) : (
        <AdminTable
          value={value}
          handleChange={handleChange}
          ORDERLIST={ORDERLIST}
          userType={userType}
        />
      )}
    </Container>
  );
}
