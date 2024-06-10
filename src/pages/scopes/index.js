import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Container,
  Stack,
  Button,
  Card,
  TableContainer,
} from "@mui/material";
import request from "src/utils/request";
import Iconify from "src/components/iconify";
import AddScope from "src/sections/modals/scopes/AddScope";
import { setModalState } from "src/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import { setScopes } from "src/redux/actions/oAuthActions";

export const getScopesData = async (dispatch) => {
  dispatch(loadingAction(true));

  try {
    const res = await request.get("/scopes");
    if (res) {
      dispatch(loadingAction(false));
      dispatch(setScopes(res.data.data));
    }
  } catch (e) {
    dispatch(loadingAction(false));
    if (e.response.status === 404) {
      setScopes([]);
    } else {
      toastify("error", e.response.data.message);
    }
  }
};

const Scopes = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const scopes = useSelector((state) => state.oAuth.scopes);

  useEffect(() => {
    getScopesData(dispatch);
  }, []);

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Scopes</Typography>

        {userType === "Super Admin" && (
          <Button
            variant={"contained"}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => dispatch(setModalState(<AddScope />))}
          >
            Add Scopes
          </Button>
        )}
      </Stack>

      <TableContainer>
        <Card
          className="card-container"
          style={{ height: "100%", zIndex: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Is Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scopes?.length ? (
                scopes?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row?.id}</TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.is_active === 1 ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ height: "50vh" }} colSpan={2} align="center">
                    <Typography variant="h6" paragraph>
                      No scopes added...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </TableContainer>
    </Container>
  );
};

export default Scopes;
