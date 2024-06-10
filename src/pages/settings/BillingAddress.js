import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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

const schema = yup.object().shape({
  state: yup.string().min(3).max(32).required(),
  street1: yup.string().min(3).max(32).required(),
  street2: yup.string().min(3).max(32).required(),
  city: yup.string().min(3).max(32).required(),
  zipcode: yup.string().required(),
});

const BillingAddress = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
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

    //data
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Billing address
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent="space-between">
            <FormControl fullWidth>
              <Select
                options={options}
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
              required
            />
            {errors.street2?.message && (
              <Alert severity="error">{errors.street2?.message}</Alert>
            )}
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
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator={<CircularProgress size={12} />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default BillingAddress;
