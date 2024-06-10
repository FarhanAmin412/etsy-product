import React from "react";
import Header from "./header";
import {
  Box,
  Typography,
  TextField,
  Button,
  styled,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { toastify } from "src/utils/toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loadingAction } from "src/redux/actions/userActions";
import request from "src/utils/request";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: theme.palette.primary.main,

  "& .card": {
    width: "80%",
    marginTop: "64px",
  },

  "& .form-container": {
    width: "50%",
    margin: "0 auto",
  },

  "& .button-container": {
    textAlign: "end",
  },
}));

const schema = yup.object().shape({
  name: yup.string().min(3).max(32).required(),
  email: yup.string().email().required(),
  phone: yup.number().typeError("Phone must be a number").nullable(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

const ContactUs = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (formData) => {
    sendEmailToSupport(formData);
  };

  const sendEmailToSupport = async (formData) => {
    dispatch(loadingAction(true));

    try {
      const res = await request.post("/contactus", formData);
      if (res) {
        dispatch(loadingAction(false));
        toastify("success", res.data.message);
        reset();
      }
    } catch (e) {
      dispatch(loadingAction(false));
      toastify("error", e.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Card className="card">
          <CardContent>
            <Typography variant="h2" align="center" gutterBottom>
              Contact Us
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="form-container"
            >
              <TextField
                {...register("name")}
                label="Name"
                type="text"
                className="mb-3"
                fullWidth
                required
              />
              {errors.name?.message && (
                <Alert severity="error">{errors.name?.message}</Alert>
              )}

              <TextField
                {...register("email")}
                label="Email"
                type="text"
                className="mb-3"
                fullWidth
                required
              />
              {errors.email?.message && (
                <Alert severity="error">{errors.email?.message}</Alert>
              )}

              <TextField
                {...register("phone")}
                label="Phone"
                type="text"
                className="mb-3"
                fullWidth
                required
              />
              {errors.phone?.message && (
                <Alert severity="error">{errors.phone?.message}</Alert>
              )}
              <TextField
                {...register("subject")}
                label="Subject"
                type="text"
                className="mb-3"
                fullWidth
                required
              />
              {errors.subject?.message && (
                <Alert severity="error">{errors.subject?.message}</Alert>
              )}
              <TextField
                {...register("message")}
                label="Message"
                type="text"
                multiline
                rows={3}
                className="mb-3"
                fullWidth
                required
              />
              {errors.message?.message && (
                <Alert severity="error">{errors.message?.message}</Alert>
              )}

              <div className="button-container">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ContactUs;
