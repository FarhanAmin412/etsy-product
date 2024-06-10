import React, { useMemo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import {
  Stack,
  TextField,
  Alert,
  CircularProgress,
  Typography,
  FormControl,
  Button,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { CartContainer } from "../Cart.styles";
import { LoadingButton } from "@mui/lab";
import countryList from "react-select-country-list";
import { setActiveStep } from "src/redux/actions/userActions";
import { placeOrder } from "src/redux/actions/orderActions";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(32).required(),
  lastName: yup.string().min(3).max(32).required(),
  company: yup.string(),
  phone: yup.string(),

  state: yup.string().min(1).max(32).required(),
  street1: yup.string().min(3).max(32).required(),
  street2: yup.string(),
  city: yup.string().min(3).max(32).required(),
  zipcode: yup.string().required(),
});

const ShippingForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    value: "US",
    label: "United States",
  });
  const options = useMemo(() => countryList().getData(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    setLoading(true);
    reset();

    const payload = {
      billToName: data.firstName + " " + data.lastName,
      shipToName: data.firstName + " " + data.lastName,
      company: data.company,
      phone: data.phone ? data.phone : "5555555555",
      country: country.value,
      state: data.state,
      street1: data.street1,
      street2: data.street2,
      city: data.city,
      postal_code: data.zipcode,
    };

    dispatch(placeOrder(payload));
    dispatch(setActiveStep(2));
  };

  return (
    <CartContainer>
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
            {errors.company?.message && (
              <Alert severity="error">{errors.company?.message}</Alert>
            )}
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
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "#212B36"
                      : "rgba(145, 158, 171, 0.32)",
                    height: "55px",
                    borderRadius: "6px",
                    zIndex: 999,
                  }),
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    maxHeight: "249px",
                  }),
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
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
              {...register("zipcode")}
              type="text"
              label="ZIP Code"
              required
            />
            {errors.zipcode?.message && (
              <Alert severity="error">{errors.zipcode?.message}</Alert>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ my: 2 }}></Stack>

        <Stack direction="row" justifyContent={"end"}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => dispatch(setActiveStep(0))}
          >
            Back
          </Button>
          <Stack direction="column" sx={{ mx: 1 }}></Stack>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator={<CircularProgress size={12} />}
            variant="contained"
          >
            Continue to Payment
          </LoadingButton>
        </Stack>
      </form>
    </CartContainer>
  );
};

export default ShippingForm;
