import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Select from "react-select";
import { toastify } from "src/utils/toast";
import request from "src/utils/request";

const OrderStatus = (props) => {
  const [orders, setOrderList] = useState();
  useEffect(() => {
    getOrderStatus();
  }, []);

  const getOrderStatus = async () => {
    try {
      const res = await request.get("/orders/status/all");

      if (res) {
        setOrderList(res.data.data.orders);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };
  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Select Order Status
      </Typography>
      <Select options={orders} />
    </Box>
  );
};

export default OrderStatus;
