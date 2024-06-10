import React, { useState } from "react";
import {
  Checkbox,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { UserListHead } from "src/sections/@dashboard/user";
import { LoadingButton } from "@mui/lab";

const TABLE_HEAD = [
  { label: "Shipping Profile ID", id: "profile_id" },
  { label: "Profile name", id: "profile_name" },
  { label: "Processing time", id: "processing_time" },
];

const ShippingProfiles = ({ shippingProfiles, launchToEtsy, loading }) => {
  const [selected, setSelected] = useState([]);
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <div style={{ maxHeight: "600px" }}>
      <Typography variant="h4" gutterBottom>
        Select Shipping Profile
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <UserListHead
            headLabel={TABLE_HEAD}
            rowCount={shippingProfiles.length}
            numSelected={selected.length}
          />

          <TableBody>
            {shippingProfiles.map((row) => {
              const selectedUser =
                selected.indexOf(row.shipping_profile_id) !== -1;
              return (
                <TableRow key={row.shipping_profile_id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUser}
                      onChange={(event) =>
                        handleClick(event, row.shipping_profile_id)
                      }
                    />
                  </TableCell>
                  <TableCell>{row.shipping_profile_id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {row.min_processing_days} to {row.max_processing_days}{" "}
                    business days
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent={"end"} sx={{ mt: 2 }}>
        <LoadingButton
          variant="contained"
          disabled={selected.length ? false : true}
          onClick={() => launchToEtsy(selected[0])}
          loading={loading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Launch
        </LoadingButton>
      </Stack>
    </div>
  );
};

export default ShippingProfiles;
