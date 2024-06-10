import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Paper } from "@mui/material";
import { AppWidgetSummary } from "../../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { setModalState } from "src/redux/actions/modalActions";
import box from "../../assets/icons/box.svg";
import approved from "../../assets/icons/approved.svg";
import delivery from "../../assets/icons/delivery.svg";
import pending from "../../assets/icons/pending.svg";
import { setEtsyOrderList } from "src/redux/actions/orderActions";
import { myClock } from "./utils";
import ProcessingTime from "./ProcessingTime";
import { getAllOrdersList } from "../orders/requests/local";
import { formatOrderList } from "../orders/requests/local/format";
import { getEtsyShop } from "../Stores/request";
import { getMessages } from "../chat/request";
import { getApps } from "../apps/request";
import { getScopesData } from "../scopes";
import Update from "./Update";

export default function DashboardAppPage() {
  const dispatch = useDispatch();
  const orderStats = useSelector((state) => state.orders.orderStats);
  const userType = useSelector((state) => state.user.user.type);
  const user = useSelector((state) => state.user.user);
  const firstName = user?.name?.split(" ")[0];
  const apps = useSelector((state) => state.oAuth.apps);
  const scopes = useSelector((state) => state.oAuth.scopes);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  useEffect(() => {
    if (userType === "Developer") {
      getApps(dispatch);
      getScopesData(dispatch);
    } else {
      dispatch(setEtsyOrderList([]));
      getAllOrdersList(dispatch, userType, 1, 5, "1");
      getMessages(dispatch, userType, false, selectedFilter);
      if (userType === "Seller") {
        getEtsyShop(dispatch);
      }
    }
    dispatch(setModalState(undefined));
    myClock();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Grid container spacing={3} sx={{ mb: 5 }} alignItems={"center"}>
        <Grid item xs={6}>
          <Typography variant="h4">Hi {firstName}, Welcome</Typography>
        </Grid>

        <Grid item xs={6} textAlign={"end"}>
          <Typography variant="p">
            {format(new Date(), "MMM dd,yyyy")} <span id="time"></span>
          </Typography>
        </Grid>
      </Grid>

      {userType === "Developer" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title="Total Scopes"
              total={scopes ? parseFloat(scopes?.length) : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={box}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title="Total Applications"
              total={apps ? parseFloat(apps?.length) : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={box}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title="Total Revenue"
              total={orderStats ? parseFloat(orderStats.revenue) : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={box}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title={
                userType === "Seller"
                  ? "On Hold Orders"
                  : "Awaiting Approval Orders"
              }
              total={orderStats ? orderStats?.on_hold : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={pending}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title={
                userType === "Seller"
                  ? "In Production Orders"
                  : "Awaiting Shipment Orders"
              }
              total={orderStats ? orderStats?.in_prod : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={delivery}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6} xl={3}>
            <AppWidgetSummary
              sx={{ height: "100%" }}
              title={
                userType === "Seller" ? "Fulfilled Orders" : "Shipped Orders"
              }
              total={orderStats ? orderStats?.shipped : 0}
              card_color="card_one"
              icon_color="icon_one"
              icon={approved}
            />
          </Grid>
        </Grid>
      )}

      {userType === "Developer" ? (
        ""
      ) : (
        <>
          <ProcessingTime />
          <Update />
        </>
      )}
    </Container>
  );
}
