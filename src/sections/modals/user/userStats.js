import React from "react";
import products from "../../../assets/icons/total_products.svg";
import tumblers from "../../../assets/icons/tumblers.svg";
import ornaments from "../../../assets/icons/ornaments.svg";
import { Avatar, Grid, Paper, Stack } from "@mui/material";
import { Typography } from "@mui/material";

const UserStats = ({ user, avatarUrl }) => {
  const StatWidget = ({ title, value, card_color, icon }) => {
    return (
      <Grid item sx={{ width: "100%" }}>
        <Paper
          sx={{
            color: (theme) => theme.palette[card_color].contrastText,
            backgroundColor: (theme) => theme.palette[card_color].main,
            padding: "16px",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Paper
                sx={{
                  backgroundColor: (theme) => theme.palette[card_color].main,
                }}
              >
                <img src={icon} alt="stat-icon"/>
              </Paper>

              <Typography variant="h6"> {title} </Typography>
            </Stack>
            <Typography variant="h6">{value}</Typography>
          </Stack>
        </Paper>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Stats
      </Typography>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Avatar
          alt={"user_avatar"}
          src={avatarUrl}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h6">{user.name}</Typography>
      </Stack>

      <Grid
        container
        spacing={3}
        direction={"column"}
        alignItems="center"
        justifyContent="center"
        my={2}
      >
        <StatWidget
          title={"Total Products"}
          value={user ? user.totalProducts : 0}
          card_color="card_one"
          icon={products}
        />
        <StatWidget
          title={"Ornaments Sold"}
          value={user ? user.ornamentSold : 0}
          card_color="card_three"
          icon={ornaments}
        />
        <StatWidget
          title={"Tumblers Sold"}
          value={user ? user.tumblerSold : 0}
          card_color="card_four"
          icon={tumblers}
        />
      </Grid>
    </>
  );
};

export default UserStats;
