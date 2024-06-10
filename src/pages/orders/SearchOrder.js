import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton } from "@mui/material";
import { StyledSearch } from "src/sections/@dashboard/user/UserListToolbar.styles";
import { Close } from "@mui/icons-material";
import Iconify from "src/components/iconify/Iconify";
import { searchOrder } from "./requests/local/searchOrder";
import { getAllOrdersList } from "./requests/local";

const SearchOrder = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const userType = useSelector((state) => state.user.user.type);
  const searched = useSelector((state) => state.orders.searched);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target.elements.search.value;

    if (inputValue === "") {
      getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
    } else {
      searchOrder(dispatch, inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledSearch
        inputRef={inputRef}
        placeholder={"Search order..."}
        name="search"
        onBlur={(e) => {
          if (e.target.value === "" && searched) {
            getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
          }
        }}
        endAdornment={
          <>
            {searched && (
              <IconButton
                onClick={() => {
                  getAllOrdersList(
                    dispatch,
                    userType,
                    page,
                    rowsPerPage,
                    tabValue
                  );
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                <Close />
              </IconButton>
            )}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mr: 2, bgcolor: "secondary.light" }}
            />

            <IconButton type="submit">
              <Iconify
                icon="eva:search-fill"
                cursor="pointer"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </IconButton>
          </>
        }
      />
    </form>
  );
};

export default SearchOrder;
