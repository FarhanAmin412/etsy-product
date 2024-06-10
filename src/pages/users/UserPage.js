import { useEffect, useState } from "react";
import {
  Stack,
  Paper,
  Container,
  Typography,
  Button,
  Box,
  Tab,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import CreateUsers from "src/sections/modals/user/createUsers";
import AllUserStats from "./AlUserStats";
import { getAllUserStats, getUsers } from "./requests";
import UserTable from "./UserTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function UserPage() {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [userStats, setUserStats] = useState();
  const [value, setValue] = useState("1");
  const allUsers = useSelector((state) => state.user.getUsers);
  const activeUsers = userList?.filter((item) => item.status === 1);
  const inActiveUsers = userList?.filter((item) => item.status === 0);

  useEffect(() => {
    getUsers(dispatch, setUserList);
    getAllUserStats(dispatch, setUserStats);
    dispatch(setModalState(undefined));
  }, [allUsers]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>

          <Button
            variant={"contained"}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => dispatch(setModalState(<CreateUsers />))}
          >
            New User
          </Button>
        </Stack>

        <AllUserStats inActiveUsers={inActiveUsers} userStats={userStats} />

        <Paper sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "white",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                // wrapped
                variant="scrollable"
                allowScrollButtonsMobile
              >
                <Tab label={`Active Users`} value="1" />
                <Tab label={`Inactive Users`} value="2" />
              </TabList>
            </Box>

            <TabPanel sx={{ margin: "0px", padding: "0px" }} value="1">
              <UserTable userList={activeUsers} setUserList={setUserList} />
            </TabPanel>

            <TabPanel sx={{ margin: "0px", padding: "0px" }} value="2">
              <UserTable userList={inActiveUsers} setUserList={setUserList} />
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </>
  );
}
