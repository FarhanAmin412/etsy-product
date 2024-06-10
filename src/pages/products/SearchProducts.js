import React, { useRef } from "react";
import Iconify from "src/components/iconify/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { Divider, IconButton } from "@mui/material";
import { StyledSearch } from "src/sections/@dashboard/user/UserListToolbar.styles";
import { Close } from "@mui/icons-material";
import { getProductList, searchProducts } from "./request";

const SearchProducts = ({ page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const searched = useSelector((state) => state.product.productSearched);

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target.elements.search.value;

    if (inputValue === "") {
      getProductList(dispatch, page + 1, rowsPerPage);
    } else {
      searchProducts(dispatch, inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledSearch
        inputRef={inputRef}
        placeholder={"Search product..."}
        name="search"
        onBlur={(e) => {
          if (e.target.value === "" && searched) {
            getProductList(dispatch, page + 1, rowsPerPage);
          }
        }}
        endAdornment={
          <>
            {searched && (
              <IconButton
                onClick={() => {
                  getProductList(dispatch, page + 1, rowsPerPage);
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

export default SearchProducts;
