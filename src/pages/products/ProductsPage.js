import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatProductsList } from "./utils";
import { getProductList } from "./request";
import { useDispatch, useSelector } from "react-redux";
import { applySortFilter, getComparator } from "../users/helpers";
import { ProductList } from "../../sections/@dashboard/products";
import SearchProducts from "./SearchProducts";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.product.productList);
  const productsMeta = useSelector((state) => state.product.productsMeta);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [PRODUCTS, setProductsList] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    getProductList(dispatch, page + 1, rowsPerPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (productsList?.length) {
      setProductsList(formatProductsList(productsList));
    }
  }, [productsList]);

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredProducts = applySortFilter(
    PRODUCTS,
    getComparator("desc", "id"),
    filterName
  );

  const isNotFound = !filteredProducts.length && !!filterName;

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Products</Typography>
        {PRODUCTS?.length ? (
          <SearchProducts page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <></>
        )}
      </Stack>

      {PRODUCTS?.length ? (
        <ProductList
          products={filteredProducts}
          page={page}
          rowsPerPage={rowsPerPage}
        />
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
            <Typography variant="h6" paragraph>
              There are no products.
            </Typography>
          </Grid>
          <Typography variant="body2">
            Go to <Link to="/dashboard/catalog">Catalogs</Link> to add a
            product.
          </Typography>
        </Grid>
      )}

      {isNotFound && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={3}>
            <Typography variant="h6" paragraph>
              Not found
            </Typography>
          </Grid>
          <Paper
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{filterName}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        </Grid>
      )}

      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={productsMeta?.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
