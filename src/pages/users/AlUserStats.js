import React from "react";
import { Grid } from "@mui/material";
import { AppWidgetSummary } from "../../sections/@dashboard/app";
import products from "../../assets/icons/total_products.svg";
import tumblers from "../../assets/icons/tumblers.svg";
import ornaments from "../../assets/icons/ornaments.svg";
import Users from "../../assets/icons/navbar/users.svg";

const AllUserStats = ({ inActiveUsers, userStats }) => {
  return (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          sx={{ height: "100%" }}
          title="Total Products"
          total={userStats ? userStats.products : 0}
          card_color="card_one"
          icon_color="icon_one"
          icon={products}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          sx={{ height: "100%" }}
          title={"Ornaments Sold"}
          total={userStats ? userStats.ornaments : 0}
          card_color="card_three"
          icon_color="icon_three"
          icon={ornaments}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          sx={{ height: "100%" }}
          title={"Tumblers Sold"}
          total={userStats ? userStats.tumblers : 0}
          card_color="card_four"
          icon_color="icon_four"
          icon={tumblers}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          sx={{ height: "100%" }}
          title={"Inactive Users"}
          total={inActiveUsers ? inActiveUsers?.length : 0}
          card_color="card_two"
          icon_color="icon_two"
          icon={Users}
        />
      </Grid>
    </Grid>
  );
};

export default AllUserStats;
