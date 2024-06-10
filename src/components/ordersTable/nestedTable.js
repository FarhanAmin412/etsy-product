import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  checkURL,
  getLink,
  getUploadedImage,
} from "src/sections/modals/order/utils";
import Variations from "./variations";
import request from "src/utils/request";
import ImageViewPopup from "../image-viewer";
import UploadGraphics from "src/sections/modals/order/uploadGraphics";
import OrderGraphics from "src/sections/modals/order/orderGraphics";
import { toastify } from "src/utils/toast";
import { BackupSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction } from "src/redux/actions/userActions";
import { getAllOrdersList } from "src/pages/orders/requests/local";
import { updateOrder } from "src/pages/orders/requests/local/updateOrder";

function NestedTable({ order, orderStatus }) {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  const [orders, setOrders] = useState(
    order.orderDetails ? order.orderDetails : []
  );

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

  useEffect(() => {
    if (order.orderDetails) {
      setOrders(order.orderDetails);
    }
  }, [order.orderDetails, setOrders]);

  async function onUploading(e, id, type) {
    const file = e.target.files[0];
    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention =
        tempExtention[tempExtention.length - 1].toLowerCase();

      const allowedFileExtentions = ["png"];
      if (!allowedFileExtentions.includes(fileExtention)) {
        toastify(
          "warning",
          "Please upload valid file type. File type allowed: PNG"
        );
        return;
      }

      if (file.size > 20000000) {
        toastify("warning", "File size should be less than 20MB");
        return;
      }
      const image = new Image();
      image.onload = function () {
        const width = (image.width / 96) * 25.4; // convert pixels to mm
        const height = (image.height / 96) * 25.4; // convert pixels to mm
        const minWidth = 239;
        const minHeight = 208;

        if (width < minWidth || height < minHeight) {
          toastify(
            "warning",
            `Image dimensions must be atleast ${minWidth}mm x ${minHeight}mm`
          );
          return;
        }
      };

      updateOrder(file, id, dispatch, userType, type);
    }
  }

  const handleClick = async (e, item) => {
    setOrders(
      orders.map((order) => {
        return order.id === item.id
          ? { ...order, ready_for_approval: e.target.checked ? 1 : 0 }
          : order;
      })
    );

    const payload = {
      order_details_id: item.id,
      ready_for_approval: e.target.checked ? 1 : 0,
    };

    try {
      const res = await request.post(`/orders/ready/approval`, payload);
      if (res) {
        getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "& th:first-of-type": {
                borderTopLeftRadius: "16px",
              },
              "& th:last-of-type": {
                borderTopRightRadius: "16px",
              },
            }}
          >
            <TableCell align="center">Preview image</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Graphic</TableCell>
            <TableCell align="center">Upload Graphic</TableCell>
            <TableCell align="center">Ready for Approval</TableCell>
            <TableCell align="center">Finalized Graphic</TableCell>
            <TableCell sx={{ maxWidth: "220px" }}>Variations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((item) => {
            return (
              <TableRow key={item.id} hover>
                <TableCell>
                  <center>
                    <ImageViewPopup
                      imageSRC={[
                        item.preview_image === null
                          ? item.catalog.images[0]
                          : item.preview_image,
                      ]}
                    />
                  </center>
                </TableCell>
                <TableCell align="center">
                  <h6>{item.catalog.title}</h6>
                </TableCell>
                <TableCell align="center">
                  {item?.catalog?.no_of_graphics === 0 ? (
                    ""
                  ) : item?.catalog?.no_of_graphics === 1 ? (
                    checkURL(item.graphic_image) === "url" ? (
                      <center>
                        <a
                          href={getLink(item.graphic_image)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button variant="contained" size="small">
                            Edit Graphic
                          </Button>
                        </a>
                      </center>
                    ) : (
                      <center>
                        <ImageViewPopup
                          imageSRC={[getUploadedImage(item, "graphic")]}
                          overlap
                        />
                      </center>
                    )
                  ) : (
                    item?.catalog?.no_of_graphics === 2 && (
                      <>
                        {checkURL(item.graphic_image) === "url" ||
                        checkURL(item.notecard_image) === "url" ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                              dispatch(
                                setModalState(<OrderGraphics item={item} />)
                              )
                            }
                          >
                            View Graphics
                          </Button>
                        ) : (
                          <center>
                            <ImageViewPopup
                              imageSRC={getUploadedImage(item)}
                              overlap
                            />
                          </center>
                        )}
                      </>
                    )
                  )}
                </TableCell>

                <TableCell align="center">
                  {item?.catalog?.no_of_graphics === 0 ? (
                    ""
                  ) : item?.catalog?.no_of_graphics === 1 ? (
                    <>
                      <input
                        accept="image/*"
                        id={`${item.id}-icon-button-file`}
                        type="file"
                        disabled={orderStatus === "on hold" ? false : true}
                        hidden
                        onChange={(e) => {
                          dispatch(loadingAction(true));
                          onUploading(e, item.id, "graphic_image");
                        }}
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                      />
                      <label
                        htmlFor={`${item.id}-icon-button-file`}
                        style={{
                          cursor:
                            orderStatus === "on hold"
                              ? "pointer"
                              : "not-allowed",
                          color:
                            orderStatus === "on hold" ? "#02B2FE" : "#919EAB",
                        }}
                      >
                        <BackupSharp />
                      </label>
                    </>
                  ) : (
                    item?.catalog?.no_of_graphics === 2 && (
                      <IconButton
                        sx={{
                          cursor:
                            orderStatus === "on hold"
                              ? "pointer"
                              : "not-allowed",
                          color:
                            orderStatus === "on hold" ? "#02B2FE" : "#919EAB",
                        }}
                        onClick={() =>
                          dispatch(
                            setModalState(<UploadGraphics item={item} />)
                          )
                        }
                      >
                        <BackupSharp />
                      </IconButton>
                    )
                  )}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    id={`row-${item.id}`}
                    sx={{
                      "& span": {
                        cursor:
                          item.order_status === "on_hold"
                            ? "pointer"
                            : "not-allowed",
                      },
                    }}
                    disabled={orderStatus === "on hold" ? false : true}
                    checked={item.ready_for_approval === 1 ? true : false}
                    onChange={(event) => handleClick(event, item)}
                  />
                </TableCell>

                <TableCell align="center">
                  <center>
                    <ImageViewPopup imageSRC={getUploadedImage(item)} overlap />
                  </center>
                </TableCell>

                <TableCell sx={{ maxWidth: "220px" }}>
                  <Variations item={item} />
                </TableCell>
              </TableRow>
            );
          })}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={order?.is_etsy === 1 ? 7 : 6} align="center">
                <Typography variant="h6" paragraph>
                  There are no items in this order.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NestedTable;
