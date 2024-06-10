import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @mui
import { Box, Card, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
import { setCatalogDetails } from "src/redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "src/components/iconify/Iconify";
import { setModalState } from "src/redux/actions/modalActions";
import DeleteCatalog from "src/sections/modals/catalog/deleteCatalog";
import Dropdown from "./Dropdown";
import { deleteCatalog } from "src/pages/catalog/request";
import MyImage from "src/components/lazy-load-image/LazyLoadImage";
import UpdateCatalogForm from "src/sections/modals/catalog/updateCatalog";

const StyledLink = styled(Link)({
  textDecoration: "none",
});

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, page, rowsPerPage }) {
  const dispatch = useDispatch();
  const {
    id,
    name,
    cover,
    price,
    priceSale,
    shipPrice,
    breadCrumb,
    listing_id,
    amazon_sku,
  } = product;

  const userType = useSelector((state) => state.user.user.type);

  return (
    <Card onClick={() => dispatch(setCatalogDetails(product))}>
      <StyledLink to={`/dashboard/product/${id}`}>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <MyImage
            image={cover}
            sx={{
              top: 0,
              position: "absolute",
              width: "100% ",
              height: "100%",
            }}
          />
        </Box>
      </StyledLink>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="h6" noWrap>
          {name}
        </Typography>

        <Stack
          direction="row"
          sx={{ color: "#02B2FE" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            <div>Price {fCurrency(price)}</div>
            {shipPrice && <div>Shipping {fCurrency(shipPrice)}</div>}
          </Typography>
          {userType === "Super Admin" ? (
            <div>
              <Iconify
                icon="eva:edit-fill"
                sx={{ mr: 1, cursor: "pointer" }}
                onClick={() =>
                  dispatch(
                    setModalState(
                      <Box sx={{ width: "70%", margin: "auto" }}>
                        <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
                          Update Product
                        </Typography>
                        <UpdateCatalogForm product={product} />
                      </Box>
                    )
                  )
                }
              ></Iconify>

              <Iconify
                icon={"eva:trash-2-outline"}
                sx={{ cursor: "pointer" }}
                color={"red"}
                onClick={() =>
                  dispatch(
                    setModalState(
                      <DeleteCatalog
                        deleteCatalog={() =>
                          deleteCatalog(dispatch, id, userType)
                        }
                      />
                    )
                  )
                }
              />
            </div>
          ) : breadCrumb === "products" ? (
            <Dropdown
              id={id}
              listingID={listing_id}
              amazonSKU={amazon_sku}
              product={product}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
