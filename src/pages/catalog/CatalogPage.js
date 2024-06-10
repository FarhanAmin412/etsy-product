import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify/Iconify";
import AddCatalogForm from "src/sections/modals/catalog/addCatalog";
import { Container, Stack, Typography, Box, Button, Grid } from "@mui/material";
import { ProductList } from "../../sections/@dashboard/products";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { getCatalogsList } from "./request";
import { getEtsyShop } from "../Stores/request";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const catalogList = useSelector((state) => state.orders.catalogList);
  const userType = useSelector((state) => state.user.user.type);
  const [message, setMessage] = useState("");
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    getCatalogsList(dispatch, userType);
    dispatch(setModalState(undefined));
    if (userType === "Seller") {
      getEtsyShop(dispatch);
    }
  }, []);

  useEffect(() => {
    if (catalogList?.length) {
      let catalog = catalogList.map((item) => {
        return {
          id: item?.id,
          cover: item?.images[0],
          images: item?.images,
          name: item?.title,
          desc: item?.description,
          price: item?.price,
          comparPrice: item?.compare_price,
          shipPrice: item?.shipping_price,
          sku: item?.sku,
          quantity: item?.quantity,
          url:item?.url,
          no_of_graphics:item?.no_of_graphics,
          breadCrumb: "Catalog",
        };
      });
      setCatalog(catalog);
    } else {
      setMessage("There are no products in the catalog.");
    }
  }, [catalogList]);

  return (
    <Container maxWidth="2xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={0}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Catalog
        </Typography>
        {userType === "Super Admin" && (
          <Button
            variant={"contained"}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() =>
              dispatch(
                setModalState(
                  <Box sx={{ width: "70%", margin: "auto" }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
                      Add Product
                    </Typography>
                    <AddCatalogForm button_title="create new product" />
                  </Box>
                )
              )
            }
          >
            Add Product
          </Button>
        )}
      </Stack>
      {catalog.length ? (
        <ProductList products={catalog} />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={3}>
            {message}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
