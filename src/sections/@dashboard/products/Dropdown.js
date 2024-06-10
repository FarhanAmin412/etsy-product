import React, { useState } from "react";
import Iconify from "src/components/iconify/Iconify";
import DeleteProduct from "src/sections/modals/products/deleteProduct";
import { MenuItem, Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { deleteProduct, getProductList } from "src/pages/products/request";
import { toastify } from "src/utils/toast";
import { loadingAction } from "src/redux/actions/userActions";
import logosrc from "../../../assets/logo.svg";
import ShippingProfiles from "src/sections/modals/products/shippingProfiles";
import request from "src/utils/request";
import SetLaunchState from "src/sections/modals/products/setLaunchState";
import LinkEtsyProduct from "src/sections/modals/products/LinkEtsyProduct";
import LinkAmazonProduct from "src/sections/modals/products/LinkAmazonProduct";

const Dropdown = ({ id, listingID, amazonSKU, product, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const loading = useSelector((state) => state.user.loadingButton);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const getShipingProfiles = async () => {
    dispatch(loadingAction(true));
    try {
      const res = await request.get("etsy/get/shipping/profiles/");

      if (res) {
        const response = res.data.data.results;

        if (response.length > 1) {
          dispatch(loadingAction(false));
          dispatch(
            setModalState(
              <ShippingProfiles
                shippingProfiles={response}
                launchToEtsy={launchToEtsy}
                loading={loading}
              />
            )
          );
        } else {
          dispatch(loadingAction(false));
          launchToEtsy(response[0].shipping_profile_id);
        }
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(loadingAction(false));
    }
  };

  const launchToEtsy = async (shipping_profile_id) => {
    let formData = new FormData();
    formData.append("quantity", "1");
    formData.append("description", product.desc);
    formData.append("title", product.name);
    formData.append("price", product.price);
    formData.append("shipping_profile_id", shipping_profile_id);
    formData.append("product_id", product.id);
    dispatch(
      setModalState(
        <SetLaunchState
          formData={formData}
          page={page}
          rowsPerPage={rowsPerPage}
          reset={() => {
            return;
          }}
        />
      )
    );
  };

  const launchToAmazon = async () => {
    const payload = {
      product_id: product.id,
    };

    try {
      const res = await request.post("/amazon/add/product", payload);

      if (res) {
        toastify("success", res.data.message);
        getProductList(dispatch, page + 1, rowsPerPage);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  const unLinkProduct = async (type) => {
    const formData = new FormData();
    formData.append("product_id", product.id);

    try {
      const res = await request.post(`/products/unlink/${type}`, formData);

      if (res) {
        toastify("success", res.data.message);
        getProductList(dispatch, page + 1, rowsPerPage);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  return (
    <>
      <img
        src={logosrc}
        style={{ cursor: "pointer" }}
        alt="logo"
        onClick={(e) => setOpen(e.currentTarget)}
      />
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 260,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: "primary.main" }}
          disabled={listingID === null ? false : true}
          onClick={() => {
            handleCloseMenu();
            getShipingProfiles();
          }}
        >
          <Iconify icon={"bi:box-arrow-up-right"} sx={{ mr: 1 }} />
          {listingID === null ? "Launch to Etsy" : "Already Launched to Etsy"}
        </MenuItem>

        <MenuItem
          sx={{ color: "primary.main" }}
          disabled={amazonSKU === null ? false : true}
          onClick={() => {
            handleCloseMenu();
            launchToAmazon();
          }}
        >
          <Iconify icon={"bi:box-arrow-up-right"} sx={{ mr: 1 }} />
          {amazonSKU === null
            ? "Launch to Amazon"
            : "Already Launched to Amazon"}
        </MenuItem>

        <MenuItem
          sx={{ color: "primary.main" }}
          onClick={() => {
            if (listingID === null) {
              handleCloseMenu();
              dispatch(
                setModalState(
                  <LinkEtsyProduct
                    id={id}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                )
              );
            } else {
              unLinkProduct("etsy");
            }
          }}
        >
          <Iconify icon={"eva:link-outline"} sx={{ mr: 1 }} />
          {listingID === null ? "Link Etsy Product" : "Unlink Etsy product"}
        </MenuItem>

        <MenuItem
          sx={{ color: "primary.main" }}
          onClick={() => {
            if (amazonSKU === null) {
              handleCloseMenu();
              dispatch(
                setModalState(
                  <LinkAmazonProduct
                    id={id}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                )
              );
            } else {
              unLinkProduct("amazon");
            }
          }}
        >
          <Iconify icon={"eva:link-outline"} sx={{ mr: 1 }} />
          {amazonSKU === null ? "Link Amazon Product" : "Unlink Amazon Product"}
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            handleCloseMenu();
            dispatch(
              setModalState(
                <DeleteProduct
                  deleteProduct={() =>
                    deleteProduct(id, dispatch, page, rowsPerPage)
                  }
                />
              )
            );
          }}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default Dropdown;
