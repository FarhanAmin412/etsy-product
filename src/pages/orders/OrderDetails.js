import React from "react";
import { Box, Grid, Stack, TableSortLabel, Typography } from "@mui/material";
import { visuallyHidden } from "src/components/ordersTable/utils";

const OrderDetails = ({ order, orderBy, createSortHandler, TableData }) => {
  const chunkData = (data, size) => {
    const result = [];
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }

    return result;
  };

  const gridsData = chunkData(TableData, 3);

  return (
    <Grid container>
      {gridsData.map((gridData, index) => (
        <Grid item xs={4} key={index}>
          {gridData.map((item, key) => (
            <Stack direction="column" mb={2} key={`${index} - ${key}`}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : "asc"}
                  onClick={createSortHandler(item.id)}
                >
                  {item.label}
                  {orderBy === item.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </Typography>

              <Typography variant="body1" component="span">
                {item?.value ? item?.value : "-"}
              </Typography>
            </Stack>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderDetails;
