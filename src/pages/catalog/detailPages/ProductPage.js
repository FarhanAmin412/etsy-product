import { styled } from "@mui/material/styles";
import { Breadcrumbs, Typography, Container } from "@mui/material";
import ProductPageCard from "../../../components/product-page-card/ProductPageCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  textTransform: "capitalize",
  color: "#000",
}));

export default function ProductPage() {
  const CatalogDetails = useSelector((state) => state.orders.catalogDetails);

  return (
    <Container maxWidth="2xl">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink
          underline="hover"
          color="inherit"
          to={`/dashboard/${CatalogDetails.breadCrumb}`}
        >
          {CatalogDetails.breadCrumb}
        </StyledLink>
        <Typography color="text.primary">{CatalogDetails.name}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 5 }}>
        Product Details
      </Typography>
      <ProductPageCard CatalogDetails={CatalogDetails} />
    </Container>
  );
}
