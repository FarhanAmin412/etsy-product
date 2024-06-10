import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import CustomTable from "../../components/ordersTable/table";
import FilterDropdown from "src/components/filter-dropdown";

const SellerTable = ({ value, handleChange, ORDERLIST }) => {
  const orderStats = useSelector((state) => state.orders.orderStats);
  const [orderData, setOrderData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const filterOptions = ["All Orders", "Etsy Orders", "Amazon Orders"];

  const EtsyOrders =
    ORDERLIST && ORDERLIST?.filter((item) => item?.is_etsy === 1);
  const AmazonOrders =
    ORDERLIST && ORDERLIST?.filter((item) => item?.is_amazon === 1);

  useEffect(() => {
    if (selectedFilter === "All Orders") {
      setOrderData(ORDERLIST);
    } else if (selectedFilter === "Etsy Orders") {
      setOrderData(EtsyOrders);
    } else if (selectedFilter === "Amazon Orders") {
      setOrderData(AmazonOrders);
    } else {
      setOrderData(ORDERLIST);
    }
  }, [selectedFilter, ORDERLIST]);

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
  };

  const ORDERS_ON_HOLD =
    orderData && orderData?.filter((item) => item.status === "On Hold");

  const ORDERS_IN_PROD =
    orderData && orderData?.filter((item) => item.status === "In Production");

  const ORDERS_FULFILLED =
    orderData && orderData?.filter((item) => item.status === "fulfilled");

  const total = orderStats?.on_hold + orderStats?.in_prod + orderStats?.shipped;

  return (
    <Paper sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "white",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            // wrapped
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab label={`All Orders (${total})`} value="1" />

            <Tab label={`On Hold (${orderStats?.on_hold})`} value="2" />

            <Tab label={`In Production (${orderStats?.in_prod})`} value="3" />

            <Tab label={`Fulfilled  (${orderStats?.shipped})`} value="4" />

            <Tab label={`Refunded (${orderStats?.refunded})`} value="5" />
          </TabList>
          <FilterDropdown
            options={filterOptions}
            selectedOption={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="1">
          <CustomTable //all orders
            ORDERLIST={orderData}
            orderStatus="placed"
          />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="2">
          <CustomTable ORDERLIST={ORDERS_ON_HOLD} orderStatus="on hold" />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="3">
          <CustomTable ORDERLIST={ORDERS_IN_PROD} orderStatus="in production" />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="4">
          <CustomTable ORDERLIST={ORDERS_FULFILLED} orderStatus="fulfilled" />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="5">
          <CustomTable ORDERLIST={ORDERLIST} orderStatus="Refunded" />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default SellerTable;
