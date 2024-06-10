import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Container,
  Stack,
  Typography,
  FormControl,
  TextField,
  Box,
  Grid,
  CircularProgress,
  Paper,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { EditIconContainer, StyledGrid } from "./Profile.styles";
import { toastify } from "src/utils/toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledLoadingButton } from "../auth/login/Login.styles";
import request from "src/utils/request";
import { loginAction } from "src/redux/actions/userActions";
import defaultAvatar from "../../assets/images/avatars/avatar_default.jpg";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
});

export default function Profile() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const firstName = account.name.split(" ")[0]
    ? account.name.split(" ")[0]
    : "";
  const lastName = account.name.split(" ")[1] ? account.name.split(" ")[1] : "";

  const [file, setFile] = useState();
  const [preview, setPreview] = useState(account.image);
  const [loading, setLoading] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { firstName: firstName, lastName: lastName },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!file) {
      setPreview(account.image);
      return;
    }

    const objectUrl = window.URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleUploadClick = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(account.image);
      return;
    }

    const file = e.target.files[0];
    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention = tempExtention[tempExtention.length - 1];
      const allowedFileExtentions = ["png", "jpg", "jpeg"];
      if (!allowedFileExtentions.includes(fileExtention)) {
        toastify("warning", "Please upload valid file type");
        return;
      }

      if (file.size > 10000000) {
        toastify("warning", "Profile picture size should be less than 10MB");
        return;
      } else {
        setFile(e.target.files[0]);
      }
    }
  };

  const editProfile = async (data) => {
    try {
      const res = await request.post(`/profile`, data);

      if (res) {
        const userData = res.data.data;
        toastify("success", res.data.message);

        dispatch(
          loginAction(
            token,
            userData.id,
            userData.name,
            userData.email,
            file ? userData.image : defaultAvatar,
            userData.user_type
          )
        );
        setLoading(false);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      setLoading(false);
    }
  };

  const onSubmitHandler = (data) => {
    setLoading(true);
    reset();
    const name = data.firstName + " " + data.lastName;
    let formData = new FormData();

    formData.append("name", name);
    if (file) {
      formData.append("image", file);
    }
    editProfile(formData);
  };

  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <Container maxWidth="xl" sx={{ margin: "0px", padding: "0px" }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>
        <Container
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
          maxWidth={false}
        >
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Grid container justifyContent="space-between">
                  <StyledGrid item xs={7}>
                    {!enableEdit && (
                      <EditIconContainer component="label">
                        <Edit />
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          onChange={handleUploadClick}
                        />
                      </EditIconContainer>
                    )}

                    <img
                      height={200}
                      width={200}
                      style={{ borderRadius: "10px" }}
                      src={preview}
                      alt="profile image"
                    />
                  </StyledGrid>
                  <Grid item xs={5} sx={{ textAlign: "right" }}>
                    <StyledLoadingButton
                      size="large"
                      variant="contained"
                      loading={loading}
                      type={enableEdit ? "submit" : "button"}
                      onClick={() => setEnableEdit(!enableEdit)}
                      loadingIndicator={
                        <CircularProgress color="inherit" size={16} />
                      }
                    >
                      {enableEdit ? "Edit" : "Save"}
                    </StyledLoadingButton>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      {...register("firstName")}
                      sx={{ width: "100%" }}
                      type="text"
                      label="First Name"
                      defaultValue={firstName}
                      disabled={enableEdit}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...register("lastName")}
                      sx={{ width: "100%" }}
                      type="text"
                      label="Last Name"
                      defaultValue={lastName}
                      disabled={enableEdit}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ width: "100%" }}
                      type="email"
                      label="Email"
                      defaultValue={account.email}
                      disabled={true}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </form>
        </Container>
      </Container>
    </>
  );
}
