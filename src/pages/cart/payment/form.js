import React, { useState } from "react";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import CreditCardInput from "react-credit-card-input";
import creditCardType from "credit-card-type";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { LoadingButton } from "@mui/lab";

const PaymentForm = ({ getCards }) => {
  const [isLoading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const [cardValue, setCardValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const type = creditCardType(e.target.elements[0].value);
    if (cardError === "") {
      addCard(e.target.elements, type[0].niceType);
    } else {
      toastify("error", cardError);
      setCardError("");
    }
  };

  const addCard = async (data, type) => {
    const payload = {
      name: data.name.value,
      card_cvc: data.cvc.value,
      card_number: data[0].value,
      card_expiry_month: data[1].value.split("/")[0],
      card_expiry_year: data[1].value.split("/")[1],
      card_type: type,
    };

    setLoading(true);
    try {
      const res = await request.post("/card", payload);

      if (res) {
        toastify("success", res.data.message);
        setLoading(false);
        document.paymentForm.reset();
        setCardError("");
        getCards();
      }
    } catch (e) {
      setLoading(false);
      toastify("error", e.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} name="paymentForm">
      <Typography variant="h5" sx={{ mb: 5 }}>
        Add Card
      </Typography>
      <CreditCardInput
        containerClassName="card-input"
        name="credit-card"
        cardNumberInputProps={{
          onChange: (e) => {
            if (e.target.value === "") {
              setCardValue("");
            }
          },

          onError: (err) => {
            if (cardValue === "") {
              setCardError("");
            } else {
              setCardError(err);
            }
          },
        }}
      />
      <Stack direction="row" sx={{ my: 2 }}></Stack>

      <TextField
        fullWidth
        type="text"
        label="Cardholder name"
        name="name"
        required
      />

      <Stack direction="row" sx={{ my: 1 }}></Stack>
      <div className="button-container">
        <LoadingButton
          variant="contained"
          type="submit"
          loading={isLoading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          + Add Card
        </LoadingButton>
      </div>
    </form>
  );
};

export default PaymentForm;
