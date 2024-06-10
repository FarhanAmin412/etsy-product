import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import { CartContainer } from "../Cart.styles";
import { amcard, discover, mastercard, visaCard } from "../cartTypes";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import DeleteCard from "src/sections/modals/cards/deleteCard";
import request from "src/utils/request";
import PaymentForm from "./form";
import Iconify from "src/components/iconify/Iconify";
import { checkIfExpiresSoon } from "./utils";

const PaymentCards = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [checked, setChecked] = useState(false);
  const newOrder = useSelector((state) => state.orders.newOrder);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    cards.map((card) => {
      if (card.is_default === 1) {
        setChecked(true);
      }
    });
  }, [cards]);

  const getCards = async () => {
    dispatch(loadingAction(true));
    try {
      const res = await request.get(`/card`);

      if (res) {
        const response = res.data.data.Cards.map((card) => {
          return card.is_default === 1
            ? { ...card, checked: false }
            : { ...card, checked: true };
        });
        dispatch(loadingAction(false));
        setCards(response);
      }
    } catch (e) {
      // toastify("error", e.response.data.message);
      dispatch(loadingAction(false));
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await request.post(`/orders`, newOrder);

      if (res) {
        toastify("success", res.data.message);
        setLoading(false);
        navigate("/dashboard/orders");
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      setLoading(false);
    }
  };

  const handleChange = (event, id) => {
    setChecked(event.target.checked);
    setDefaultCard(id);
  };

  const setDefaultCard = async (id) => {
    try {
      const res = await request.post(`/card/default/${id}`);

      if (res) {
        getCards();
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  const handleonDelete = async (id) => {
    dispatch(loadingAction(true));
    try {
      const res = await request.delete(`/card/${id}?_method=Delete`);

      if (res) {
        dispatch(loadingAction(false));
        dispatch(setModalState(undefined));
        toastify("success", res.data.message);
        getCards();
      }
    } catch (e) {
      dispatch(loadingAction(false));
      toastify("error", e.response.data.message);
    }
  };

  return (
    <CartContainer>
      <PaymentForm getCards={getCards} />
      {cards.length ? (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            My Cards
          </Typography>
          {cards.map((card, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                className="card-item"
              >
                <img
                  src={
                    card.card_type === "Visa"
                      ? visaCard
                      : card.card_type === "Mastercard"
                      ? mastercard
                      : card.card_type === "Discover"
                      ? discover
                      : amcard
                  }
                  width={40}
                  height={40}
                />
                <Stack direction="column">
                  <Typography variant="h6">
                    {card.card_type} **** **** ****
                    {card.card_number.replace(/\s/g, "").slice(12)}
                  </Typography>
                  <Typography variant="p" color={"GrayText"}>
                    Expires {card.card_expiry_month}/{card.card_expiry_year}
                    {checkIfExpiresSoon(card.card_expiry_year)}
                  </Typography>
                </Stack>
              </Stack>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={card.is_default === 1 ? true : false}
                      disabled={card.is_default === 1 ? false : checked}
                      onChange={(e) => handleChange(e, card.id)}
                    />
                  }
                  label="Set as Default"
                />
              </FormGroup>

              <Iconify
                icon={"eva:trash-2-outline"}
                color={"red"}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(
                    setModalState(
                      <DeleteCard deleteCard={() => handleonDelete(card.id)} />
                    )
                  )
                }
              />
            </Stack>
          ))}
          <Stack direction="row" sx={{ my: 2 }}></Stack>
          {props.orderIsPlaced && (
            <div className="button-container">
              <LoadingButton
                variant="contained"
                type="submit"
                onClick={placeOrder}
                loading={loading}
                loadingIndicator={
                  <CircularProgress color="inherit" size={16} />
                }
              >
                Place Order
              </LoadingButton>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </CartContainer>
  );
};

export default PaymentCards;
