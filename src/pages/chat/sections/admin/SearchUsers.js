import React, { useState, useEffect } from "react";
import request from "src/utils/request";
import Iconify from "src/components/iconify/Iconify";
import UserList from "./UserList";
import { StyledSearch } from "./utils";
import { useDispatch } from "react-redux";
import { Box, InputAdornment } from "@mui/material";
import { applySortFilter, getComparator } from "src/pages/users/helpers";
import { loadingAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";

const SearchUsers = ({ CHATLIST }) => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [filterName, setFilterName] = useState("");

  const filteredUsers = filterName
    ? applySortFilter(userList, getComparator("asc", "name"), filterName)
    : [];

  useEffect(() => {
    getActiveUsers(dispatch, setUserList);
  }, []);

  const getActiveUsers = async (dispatch, setUserList) => {
    dispatch(loadingAction(true));
    try {
      const res = await request.get("/users/active");

      if (res) {
        setUserList(res.data.data.users);
        dispatch(loadingAction(false));
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(loadingAction(false));
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const getData = (user) => {
    let userExists = CHATLIST.filter((item) => item.user_id === user?.id);

    return userExists.length ? userExists[0].data : [];
  };

  const USERLIST =
    filteredUsers &&
    filteredUsers?.map((user) => ({
      user_id: user?.id,
      user_details: { ...user },
      avatarUrl: user?.image
        ? user?.image
        : "../assets/images/avatars/avatar_default.jpg",
      data: getData(user),
      count: 0,
    }));

  return (
    <>
      <StyledSearch
        value={filterName}
        onChange={handleFilterByName}
        placeholder={"Search users.."}
        disabled={userList?.length === 0 ? true : false}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
      <Box sx={{ mb: 2 }}></Box>
      {filterName && <UserList chatList={USERLIST} search />}
    </>
  );
};

export default SearchUsers;
