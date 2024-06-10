import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { StyledRoot } from "src/sections/@dashboard/user/UserListToolbar.styles";
import { DatePicker } from "@mui/x-date-pickers";
import { CSVLink } from "react-csv";

const Toolbar = ({ history, setHistory, getChargeHistory }) => {
  const exportData = [];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const headers = [
    { label: "Order ID #", key: "order_id" },
    { label: "Order Date", key: "date" },
    { label: "Amount Charged", key: "amount" },
  ];

  history.forEach((item) => {
    const newItem = {};
    headers.forEach((header) => {
      newItem[header.key] = item[header.key];
    });
    exportData.push(newItem);
  });

  const csvReport = {
    data: exportData,
    headers: headers,
    filename: "Charge History.csv",
  };

  const getFilteredDates = () => {
    const filteredDates = history.filter((item) => {
      const date = new Date(item?.date);
      return date >= startDate && date <= endDate;
    });

    setHistory(filteredDates);
  };

  return (
    <StyledRoot>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <DatePicker
          label={"From"}
          disableFuture
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label={"To"}
          disableFuture
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />

        <Button
          variant="contained"
          size="small"
          color="inherit"
          disabled={startDate && endDate ? false : true}
          onClick={getFilteredDates}
        >
          Filter
        </Button>

        <Button
          variant="contained"
          size="small"
          color="inherit"
          disabled={startDate && endDate ? false : true}
          onClick={() => {
            getChargeHistory();
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Reset
        </Button>
      </Stack>

      <CSVLink {...csvReport} target="_blank">
        <Button variant="contained" size="small">
          Export to CSV
        </Button>
      </CSVLink>
    </StyledRoot>
  );
};

export default Toolbar;
