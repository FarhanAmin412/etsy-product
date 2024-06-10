import React, { useEffect, useState } from "react";
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";
import { format } from "date-fns";
import Toolbar from "./Toolbar";
import Iconify from "../iconify/Iconify";
import { toastify } from "src/utils/toast";

const ChargeHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    getChargeHistory();
  }, []);

  const getChargeHistory = async () => {
    dispatch(loadingAction(true));

    try {
      const res = await request.get("/payments");

      if (res) {
        const data = res.data.data.payments;
        const formattedData = [];

        data.forEach((item) => {
          if (item?.order_id) {
            if (item.is_refunded === 0) {
              formattedData.push({
                order_id: item.order_id,
                date: item?.created_at,
                is_refunded: item.is_refunded,
                amount: item?.amount,
                refund_amount: null,
                type: "debit",
              });
            } else if (item.is_refunded === 1) {
              formattedData.push(
                {
                  order_id: item.order_id,
                  date: item?.updated_at,
                  is_refunded: item.is_refunded,
                  amount: item?.amount,
                  refund_amount: item?.refund_amount,
                  type:
                    item?.refund_amount === item?.amount
                      ? "full refund"
                      : "partial refund",
                },
                {
                  order_id: item.order_id,
                  date: item?.created_at,
                  is_refunded: 0,
                  amount: item?.amount,
                  refund_amount: null,
                  type: "debit",
                }
              );
            }
          } else {
            formattedData.push({
              order_id: item.order_id,
              date: item?.created_at,
              is_refunded: item.is_refunded,
              refund_amount: null,
              amount: item?.amount,
              type: "credit",
            });
          }
        });

        formattedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setHistory(formattedData);
        dispatch(loadingAction(false));
      }
    } catch (e) {
      dispatch(loadingAction(false));
      toastify("error", e.response.data.message);
      if (e.response.status === 404) {
        setHistory([]);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Card className="table">
      <Toolbar
        history={history}
        setHistory={setHistory}
        getChargeHistory={getChargeHistory}
      />
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID #</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Amount Charged</TableCell>
              <TableCell align="center">Refunded Amount</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length === 0 ? (
              <TableRow sx={{ my: 3 }}>
                <TableCell align="center" colSpan={5}>
                  <Typography variant="body2">No results found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              history?.map((item) => {
                return (
                  <TableRow hover>
                    <TableCell align="center">
                      {item.order_id ? item.order_id : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {format(new Date(item?.date), "MMMM dd, yyyy")}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="p"
                        color={
                          item?.type === "credit"
                            ? "success.dark"
                            : "error.dark"
                        }
                      >
                        {item?.type === "credit" ? (
                          <Iconify icon="eva:plus-fill" />
                        ) : (
                          <Iconify icon="heroicons:minus-small-20-solid" />
                        )}
                        ${item.amount}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="p" color={"success.dark"}>
                        {item.refund_amount ? (
                          <>
                            <Iconify icon="eva:plus-fill" />$
                            {item.refund_amount}
                          </>
                        ) : (
                          "-"
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography
                        variant="p"
                        color={
                          item?.type === "debit" ? "error.dark" : "success.dark"
                        }
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item?.type}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={history?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ChargeHistory;
