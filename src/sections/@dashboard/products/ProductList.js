import { useEffect } from "react";
import PropTypes from "prop-types";
import ShopProductCard from "./ProductCard";
import request from "src/utils/request";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "src/redux/actions/productActions";

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, page, rowsPerPage, ...other }) {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  useEffect(() => {
    if (userType === "Seller") {
      getCartItems();
    }
  }, []);

  const getCartItems = async () => {
    try {
      const res = await request.get(`/cart`);

      if (res) {
        dispatch(addProductToCart(res.data.data.items.length));
      }
    } catch (e) {
      if (e.response.status === 404) {
        dispatch(addProductToCart(0));
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} {...other}>
        {products.map((product) => (
          <Grid
            key={product.id}
            item
            xs={8}
            sm={4}
            md={2}
            sx={{ minWidth: "250px" }}
          >
            <ShopProductCard
              product={product}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
