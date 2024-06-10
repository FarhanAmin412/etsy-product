import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomTable from "../../components/ordersTable/table";
import FilterDropdown from "src/components/filter-dropdown";
import { Box, Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersList } from "./requests/local";
import { filterOrdersByCatalog } from "./requests/local/filterOrdersByCatalog";

const AdminTable = ({ value, handleChange, ORDERLIST }) => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const userType = useSelector((state) => state.user.user.type);
  let catalog_id = sessionStorage.getItem("selectedCatalogID");

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

  const orderStats = useSelector((state) => state.orders.orderStats);
  const filterOptions = ["All Orders", "Ornaments", "Tumblers", "Jewelery"];

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
    let catalog_id =
      option === "Ornaments"
        ? 6
        : option === "Tumblers"
        ? 5
        : option === "Jewelery"
        ? 27
        : "";
    sessionStorage.setItem("selectedCatalogID", catalog_id);
    if (option === "All Orders") {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
    } else {
      filterOrdersByCatalog(
        dispatch,
        userType,
        catalog_id,
        page,
        rowsPerPage,
        tabValue
      );
    }
  };

  const ORDERS_AWAIT_APPROVAL =
    ORDERLIST &&
    ORDERLIST?.filter((item) => item.status === "awaiting approval");

  const ORDERS_AWAIT_SHIP =
    ORDERLIST &&
    ORDERLIST?.filter((item) => item.status === "awaiting shipment");

  const ORDERS_SHIPPED =
    ORDERLIST && ORDERLIST?.filter((item) => item.status === "shipped");

  const total = orderStats?.on_hold + orderStats?.in_prod + orderStats?.shipped;

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
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
            <Tab
              label={`Awaiting Approval (${orderStats?.on_hold})`}
              value="2"
            />
            <Tab
              label={`Awaiting Shipment (${orderStats?.in_prod})`}
              value="3"
            />
            <Tab label={`Shipped (${orderStats?.shipped})`} value="4" />

            <Tab label={`Refunded (${orderStats?.refunded})`} value="5" />
          </TabList>
        
        <Stack direction={"row"} alignItems={"center"}>


          <FilterDropdown
            options={filterOptions}
            selectedOption={selectedFilter}
            onFilterChange={handleFilterChange}
          />
            <Chip
              label={selectedFilter}
              variant="filled"
              size="small"
            
            />
        </Stack>
        </Box>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="1">
          <CustomTable //all orders
            ORDERLIST={ORDERLIST}
            orderStatus="placed"
          />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="2">
          <CustomTable
            ORDERLIST={ORDERS_AWAIT_APPROVAL}
            orderStatus="awaiting approval"
          />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="3">
          <CustomTable
            ORDERLIST={ORDERS_AWAIT_SHIP}
            orderStatus="awaiting shipment"
          />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="4">
          <CustomTable ORDERLIST={ORDERS_SHIPPED} orderStatus="shipped" />
        </TabPanel>

        <TabPanel sx={{ margin: "0px", padding: "0px" }} value="5">
          <CustomTable ORDERLIST={ORDERLIST} orderStatus="Refunded" />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AdminTable;
