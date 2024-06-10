import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Typography,
  TableContainer,
  Checkbox,
  Grid,
  Paper,
} from "@mui/material";
import he from "he";
import { UserListToolbar } from "../../sections/@dashboard/user";
import { applySortFilter, getComparator } from "src/pages/users/helpers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  formatTableData,
  handleImagesToDownload,
  handleOnHoldOrder,
  Item,
} from "./utils";
import { setModalState } from "src/redux/actions/modalActions";
import { StyledRootScrollbar } from "../scrollbar/styles";
import DisplayNote from "src/pages/orders/DisplayNote";
import NestedTable from "./nestedTable";
import ActionIcons from "src/pages/orders/ActionIcons";
import Pagination from "src/pages/orders/TablePagination";
import AddNote from "src/sections/modals/order/note/AddNote";
import OrderDetails from "src/pages/orders/OrderDetails";
import PriorityShippingCheckbox from "src/pages/orders/PriorityShippingCheckbox";
import { getAllOrdersList } from "src/pages/orders/requests/local";

export default function CustomTable({ ORDERLIST, orderStatus, recent }) {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const ordersMetaData = useSelector((state) => state.orders.ordersMetaData);

  const [currentPage, setCurrentpage] = useState(1);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orderBy, setOrderBy] = useState(
    userType === "Seller" ? "date" : "approval_date"
  );
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(recent ? 5 : 25);

  const tabValue = sessionStorage.getItem("activeTabIndex")
    ? sessionStorage.getItem("activeTabIndex")
    : "1";

  useEffect(() => {
    if (recent) {
      setRowsPerPage(5);
    } else {
      if (sessionStorage.getItem("rowsPerPage") !== null) {
        setRowsPerPage(sessionStorage.getItem("rowsPerPage"));
      } else {
        setRowsPerPage(25);
      }

      if (sessionStorage.getItem("page") !== null) {
        setPage(sessionStorage.getItem("page") - 1);
      } else {
        setPage(0);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ordersMetaData?.current_page) {
      setCurrentpage(ordersMetaData?.current_page);
    } else {
      setCurrentpage(1);
    }
  }, [ordersMetaData]);

  useEffect(() => {
    const filteredArray = filteredOrders.filter((item) =>
      selected.includes(item.id)
    );
    setSelectedOrder(filteredArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, ORDERLIST]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ORDERLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, row) => {
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

  const handleChangePage = (event, newPage, select) => {
    const selectPage = select ? event.target.value - 1 : newPage;
    setPage(selectPage);
    setCurrentpage(selectPage + 1);
    sessionStorage.setItem("page", selectPage);
    getAllOrdersList(dispatch, userType, selectPage + 1, rowsPerPage, tabValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    sessionStorage.setItem("rowsPerPage", parseInt(event.target.value));
    getAllOrdersList(
      dispatch,
      userType,
      page,
      parseInt(event.target.value, 10),
      tabValue
    );
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredOrders = applySortFilter(
    ORDERLIST,
    getComparator(order, orderBy)
  );

  const isNotFound = !filteredOrders.length && !!filterName;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Paper className="table-container">
      <UserListToolbar
        placeholder={"Search order..."}
        numSelected={selected.length}
        filterName={filterName}
        rowCount={ORDERLIST.length}
        onFilterName={handleFilterByName}
        orderStatus={orderStatus}
        userType={userType}
        onSelectAllClick={handleSelectAllClick}
        handleImagesToDownload={() =>
          handleImagesToDownload({}, selectedOrder, dispatch)
        }
        handleOnHoldOrder={() =>
          handleOnHoldOrder({}, selectedOrder, setSelected, userType, dispatch)
        }
        Pagination={
          <Pagination
            recent={recent}
            page={page}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            direction={"bottom"}
          />
        }
      />

      <StyledRootScrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          {!isNotFound && ORDERLIST.length === 0 ? (
            <Card variant="outlined" className="card-container not-found">
              <Typography variant="h6" paragraph>
                No order is {orderStatus}
              </Typography>
              {userType === "Seller" && (
                <Typography variant="body2">
                  Go to <Link to="/dashboard/catalog">Catalogs</Link> to place
                  an order.
                </Typography>
              )}
            </Card>
          ) : (
            filteredOrders.map((row) => {
              const { id, notes, priorty_mail_shipping, notes_to_seller } = row;

              let TableData = formatTableData(row, userType);
              const selectedUser = selected.indexOf(id) !== -1;

              return (
                <Card
                  variant="outlined"
                  className="card-container"
                  key={id}
                  style={{ zIndex: "auto" }}
                >
                  <Grid container>
                    <Grid item xs={0.5}>
                      <Item>
                        {orderStatus === "on hold" ||
                        orderStatus === "awaiting approval" ||
                        orderStatus === "awaiting shipment" ||
                        orderStatus === "shipped" ? (
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) =>
                              handleClick(event, row.id, row)
                            }
                          />
                        ) : (
                          <></>
                        )}
                      </Item>
                    </Grid>
                    <Grid item xs={6.5} mt={1}>
                      <Item>
                        <OrderDetails
                          row={row}
                          order={order}
                          orderBy={orderBy}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          orderStatus={orderStatus}
                          createSortHandler={createSortHandler}
                          TableData={TableData}
                        />

                        <PriorityShippingCheckbox
                          id={id}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          orderStatus={orderStatus}
                          priorty_mail_shipping={priorty_mail_shipping}
                        />
                      </Item>
                    </Grid>

                    <Grid item xs={3} mt={1} mb={2}>
                      {userType === "Super Admin" && notes && (
                        <DisplayNote id={id} notes={notes} />
                      )}
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <ActionIcons
                        row={row}
                        orderStatus={orderStatus}
                        selectedOrder={selectedOrder}
                        setSelected={setSelected}
                        notes={notes}
                        openAddNotePopup={() =>
                          dispatch(
                            setModalState(<AddNote id={id} notes={notes} />)
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={10.5} textAlign="right">
                      <Item sx={{ mb: 2 }}>
                        <NestedTable order={row} orderStatus={orderStatus} />
                      </Item>
                      {notes_to_seller === null ||
                      notes_to_seller === "No Notes" ||
                      notes_to_seller === "" ? (
                        <></>
                      ) : (
                        <Item sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle1"
                            className="notes-container"
                          >
                            {he.decode(notes_to_seller)}
                          </Typography>
                        </Item>
                      )}
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </Card>
              );
            })
          )}

          {isNotFound && (
            <Card variant="outlined" className="card-container not-found">
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for &nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>
            </Card>
          )}
        </TableContainer>
      </StyledRootScrollbar>
      <Pagination
        recent={recent}
        page={page}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        direction={"top"}
      />
    </Paper>
  );
}
