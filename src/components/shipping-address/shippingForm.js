import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import {
  Stack,
  TextField,
  Alert,
  Typography,
  FormControl,
  Container,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styles } from "./utils";
import { loadingBtnAction } from "src/redux/actions/userActions";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(32).required(),
  lastName: yup.string().min(3).max(32).required(),
  company: yup.string(),
  phone: yup.string(),
  state: yup.string().min(1).max(32).required(),
  street1: yup.string().min(3).max(32).required(),
  street2: yup.string(),
  city: yup.string().min(3).max(32).required(),
  postal_code: yup.string().required(),
});

const ShippingForm = ({ shippingAddress, onSubmit }) => {
  const dispatch = useDispatch();
  const options = useMemo(() => countryList().getData(), []);
  const loading = useSelector((state) => state.user.loadingButton);
  const [country, setCountry] = useState({
    value: shippingAddress.country,
    label: options.filter((item) => item.value === shippingAddress.country)[0]
      .label,
  });

  const firstName = shippingAddress?.billToName
    ? shippingAddress?.billToName?.split(" ")[0]
    : "";
  const lastName = shippingAddress?.billToName
    ? shippingAddress?.billToName?.split(" ")[1]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: shippingAddress?.billToName ? firstName : "",
      lastName: shippingAddress?.state ? lastName : "",
      company: shippingAddress?.company ? shippingAddress?.company : "",
      phone: shippingAddress?.phone ? shippingAddress?.phone : "",

      state: shippingAddress?.state ? shippingAddress?.state : "",
      street1: shippingAddress?.street1 ? shippingAddress?.street1 : "",
      street2: shippingAddress?.street2 ? shippingAddress?.street2 : "",
      city: shippingAddress?.city ? shippingAddress?.city : "",
      postal_code: shippingAddress?.postal_code
        ? shippingAddress?.postal_code
        : "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    dispatch(loadingBtnAction(true));
    reset();
    onSubmit(data, country);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Typography variant="h4" gutterBottom>
          Recipient
        </Typography>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent="space-between">
            <TextField
              fullWidth
              {...register("firstName")}
              type="text"
              label="First Name"
              required
            />
            {errors.firstName?.message && (
              <Alert severity="error">{errors.firstName?.message}</Alert>
            )}
            <Stack direction="column" sx={{ mx: 2 }}></Stack>
            <TextField
              fullWidth
              {...register("lastName")}
              type="text"
              label="Last Name"
              required
            />
            {errors.lastName?.message && (
              <Alert severity="error">{errors.lastName?.message}</Alert>
            )}
          </Stack>

          <Stack direction={"row"} justifyContent="space-between">
            <TextField
              fullWidth
              {...register("company")}
              type="text"
              label="Company"
            />

            <Stack direction="column" sx={{ mx: 2 }}></Stack>
            <TextField
              fullWidth
              {...register("phone")}
              type="number"
              label="Phone"
            />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ my: 2 }}></Stack>
        <Typography variant="h4" gutterBottom>
          Shipping address
        </Typography>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent="space-between">
            <FormControl fullWidth>
              <Select
                options={options}
                defaultValue={country}
                onChange={(e) => setCountry(e)}
                placeholder="Select a country..."
                styles={styles}
              />
            </FormControl>
            <Stack direction="column" sx={{ mx: 2 }}></Stack>
            <TextField
              fullWidth
              {...register("state")}
              type="text"
              label="State"
              required
            />
            {errors.state?.message && (
              <Alert severity="error">{errors.state?.message}</Alert>
            )}
          </Stack>

          <Stack direction={"row"} justifyContent="space-between">
            <TextField
              fullWidth
              {...register("street1")}
              type="text"
              label="Street 1"
              required
            />
            {errors.street1?.message && (
              <Alert severity="error">{errors.street1?.message}</Alert>
            )}
            <Stack direction="column" sx={{ mx: 2 }}></Stack>
            <TextField
              fullWidth
              {...register("street2")}
              type="text"
              label="Street 2"
            />
          </Stack>

          <Stack direction={"row"} justifyContent="space-between">
            <TextField
              fullWidth
              {...register("city")}
              type="text"
              label="City"
              required
            />
            {errors.city?.message && (
              <Alert severity="error">{errors.city?.message}</Alert>
            )}
            <Stack direction="column" sx={{ mx: 2 }}></Stack>
            <TextField
              fullWidth
              {...register("postal_code")}
              type="text"
              label="ZIP Code"
              required
            />
            {errors.postal_code?.message && (
              <Alert severity="error">{errors.postal_code?.message}</Alert>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ my: 2 }}></Stack>
        <Stack direction="row" justifyContent={"end"}>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator={<CircularProgress size={12} color="inherit" />}
            variant="contained"
          >
            Update
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default ShippingForm;
