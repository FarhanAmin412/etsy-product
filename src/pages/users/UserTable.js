import React, { useState } from "react";
import { sentenceCase } from "change-case";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Button,
  Tooltip,
} from "@mui/material";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import {
  applySortFilter,
  getComparator,
  getUserStats,
  TABLE_HEAD,
} from "./helpers";
import { setModalState } from "src/redux/actions/modalActions";
import { changeStatus, onDeleteUser } from "./requests";
import EditUser from "src/sections/modals/user/editUser";
import UserStatus from "src/sections/modals/user/userStatus";
import DeleteUsers from "src/sections/modals/user/deleteUsers";
import { useDispatch } from "react-redux";

const UserTable = ({userList, setUserList}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userID, setUserID] = useState();
  const [user, setUser] = useState({});
  
  const USERLIST =
    userList &&
    userList.map((user, index) => ({
      id: user.id,
      avatarUrl:
        index > 23
          ? "/assets/images/avatars/avatar_default.jpg"
          : `/assets/images/avatars/avatar_${index + 1}.jpg`,
      name: user.name,
      email: user.email,
      // isVerified: faker.datatype.boolean(),
      status: user.status ? "Active" : "Blocked",
      role: user.user_type,
    }));

  const handleOpenMenu = (event, id, name, email) => {
    setUserID(id);
    setUser({ id: id, name: name, email: email });
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;
  return (
    <>
      <Card>
        <UserListToolbar
          placeholder={"Search user..."}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          user
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const {
                      id,
                      name,
                      role,
                      status,
                      email,
                      avatarUrl,
                      isVerified,
                    } = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow
                        hover
                        key={index}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, email)}
                            /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}

                        <TableCell align="left">
                          <Button
                            variant="contained"
                            style={{
                              color:
                                status === "Active" ? "#229A16" : "#b72136",
                              backgroundColor:
                                status === "Active"
                                  ? "rgba(84, 214, 44, 0.16)"
                                  : "rgba(255, 72, 66, 0.16)",
                            }}
                            onClick={() =>
                              dispatch(
                                setModalState(
                                  <UserStatus
                                    status={status}
                                    changeStatus={() =>
                                      changeStatus(dispatch, id, setUserList)
                                    }
                                  />
                                )
                              )
                            }
                          >
                            {sentenceCase(status)}
                          </Button>
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip title="User Stats" arrow>
                            <Iconify
                              icon={"ic:baseline-remove-red-eye"}
                              sx={{ mr: 2, cursor: "pointer" }}
                              onClick={() =>
                                getUserStats(row, dispatch, avatarUrl)
                              }
                            />
                          </Tooltip>
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => handleOpenMenu(e, id, name, email)}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            dispatch(setModalState(<EditUser updateUser={user} />));
          }}
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            handleCloseMenu();
            dispatch(
              setModalState(
                <DeleteUsers
                  deleteUser={() => onDeleteUser(dispatch, userID, setUserList)}
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

export default UserTable;
