import PropTypes from "prop-types";
import {
  Tooltip,
  IconButton,
  InputAdornment,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import SearchOrder from "src/pages/orders/SearchOrder";
import { StyledRoot, StyledSearch } from "./UserListToolbar.styles";
import FilterDropdown from "src/components/filter-dropdown";

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  placeholder,
  numSelected,
  filterName,
  rowCount,
  onFilterName,
  orderStatus,
  userType,
  onSelectAllClick,
  handleOnHoldOrder,
  handleImagesToDownload,
  user,
  Pagination,
}) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {orderStatus === "on hold" ||
      orderStatus === "awaiting approval" ||
      orderStatus === "awaiting shipment" ||
      orderStatus === "shipped" ? (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            }
            label={numSelected ? `${numSelected} selected ` : "Select all"}
          />
        </FormGroup>
      ) : (
        <></>
      )}
      {numSelected > 0 ? (
        <div>
          {orderStatus === "on hold" || orderStatus === "awaiting approval" ? ( //approve orders
            <Button
              variant="contained"
              size="small"
              onClick={handleOnHoldOrder}
            >
              Approve Orders
            </Button>
          ) : (
            ""
          )}
          {userType === "Super Admin" ? ( //download orders
            orderStatus === "awaiting shipment" || orderStatus === "shipped" ? (
              <IconButton onClick={handleImagesToDownload}>
                <Tooltip title="Download">
                  <Iconify icon="bi:cloud-download" color="#02B2FE" />
                </Tooltip>
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      ) : user ? (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          disabled={rowCount === 0 ? true : false}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      ) : (
        <>
          <SearchOrder />
          {Pagination}
        </>
      )}
    </StyledRoot>
  );
}
