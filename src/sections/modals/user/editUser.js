import { React } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// @mui
import {
  Stack,
  TextField,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

import Request from "../../../utils/request";
import { toastify } from "src/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { getUsers, loadingBtnAction } from "src/redux/actions/userActions";
import { StyledLoadingButton } from "src/pages/auth/login/Login.styles";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(32).required(),
  lastName: yup.string(),
});

export default function EditUser(props) {
  const isLoading = useSelector((state) => state.user.loadingButton);
  const dispatch = useDispatch();
  const updateUser = props.updateUser;

  const firstName = updateUser.name ? updateUser.name.split(" ")[0] : "";
  const lastName = updateUser.name ? updateUser.name.split(" ")[1] : "";
  const userEmail = updateUser && updateUser.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUserData = async (data) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await Request.post(`/users/edit/${updateUser.id}`, data);

      if (res) {
        dispatch(setModalState(undefined));
        dispatch(loadingBtnAction(false));
        dispatch(getUsers(true));
        toastify("success", res.data.message);
      }
    } catch (e) {
      dispatch(loadingBtnAction(false));
      toastify("error", e.response.data.message);
    }
  };
  const onSubmitHandler = (data) => {
    const payload = {
      name: data.firstName + " " + data.lastName,
    };
    updateUserData(payload);
  };

  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={3}>
          <TextField
            {...register("firstName")}
            label="First Name"
            defaultValue={firstName}
            type="text"
            required
          />
          {errors.firstName?.message && (
            <Alert severity="error">{errors.firstName?.message}</Alert>
          )}

          <TextField
            {...register("lastName")}
            label="Last Name"
            defaultValue={lastName}
            type="text"
          />

          <TextField
            label="Email"
            defaultValue={userEmail}
            type="email"
            disabled={true}
          />
        </Stack>

        <StyledLoadingButton
          sx={{ marginTop: "30px" }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          Update
        </StyledLoadingButton>
      </form>
    </Box>
  );
}
