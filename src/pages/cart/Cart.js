import React, { useEffect, useState } from "react";
import request from "src/utils/request";
import CartItem from "./CartItem";
import { toastify } from "src/utils/toast";
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CartContainer } from "./Cart.styles";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "src/redux/actions/productActions";
import { loadingAction, setActiveStep } from "src/redux/actions/userActions";
import { bulkDiscount } from "./utils";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const productsInCart = useSelector((state) => state.product.productsInCart);

  const CARTITEMS = cartItems?.map((item) => {
    return {
      catalog: item?.catalog,
      id: item?.id,
      title: item?.catalog
        ? item?.catalog.title
        : item?.description.substring(0, 10),
      quantity: item?.quantity,
      price: item?.price,
      image: item?.graphic_image,
      notecard_image: item?.notecard_image,
    };
  });

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    dispatch(loadingAction(true));
    try {
      const res = await request.get(`/cart`);

      if (res) {
        setCartItems(res.data.data);
        dispatch(loadingAction(false));
      }
    } catch (e) {
      if (e.response.data.message === "Cart is empty") {
        dispatch(addProductToCart(0));
      }
      // toastify("error", e.response.data.message);
      dispatch(loadingAction(false));
    }
  };

  const deleteItem = async (id) => {
    dispatch(loadingAction(true));
    try {
      const res = await request.delete(`/cart/${id}`);

      if (res) {
        dispatch(loadingAction(false));
        dispatch(addProductToCart(productsInCart - 1));

        toastify("success", res.data.message);
      }
    } catch (e) {
      dispatch(loadingAction(false));
      toastify("error", e.response.data.message);
    }
  };

  const addToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev?.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        updateCart(clickedItem.id, clickedItem.quantity + 1);
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev?.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            deleteItem(id);
            return acc;
          }

          updateCart(id, item.quantity - 1);
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  const updateCart = async (id, quantity) => {
    let formData = new FormData();

    formData.append("catalog_id", id);
    formData.append("quantity", quantity);

    try {
      const res = await request.post(`/cart/${id}?_method=PATCH`, formData);

      if (res) {
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };

  const calculateTotal = (items) =>
    items?.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <CartContainer>
      {cartItems?.length === 0 ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "40vh" }}
        >
          <Grid item xs={2}>
            <h3>Cart is empty.</h3>
          </Grid>
        </Grid>
      ) : (
        <>
          <h2>Your Cart</h2>
          {CARTITEMS?.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
          <h2 className="mt-3">
            Total: ${CARTITEMS ? calculateTotal(CARTITEMS).toFixed(2) : 0}
          </h2>
        </>
      )}
      <div className="button-container">
        {cartItems?.length === 0 ? (
          <NavLink to={"/dashboard/catalog"}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(setActiveStep(1));
              }}
            >
              Continue Shopping
            </Button>
          </NavLink>
        ) : (
          <Button
            variant="contained"
            disabled={cartItems?.length > 0 ? false : true}
            onClick={() => {
              dispatch(setActiveStep(1));
            }}
          >
            Continue to Shipping
          </Button>
        )}
      </div>
    </CartContainer>
  );
};

export default Cart;
