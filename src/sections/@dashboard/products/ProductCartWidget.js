import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import Iconify from "../../../components/iconify";
import { Link } from "react-router-dom";
import { setActiveStep } from "src/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 40,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

export default function CartWidget() {
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.product.productsInCart);

  return (
    <Link to={"/dashboard/checkout"} onClick={() => dispatch(setActiveStep(0))}>
      <StyledRoot>
        <Badge
          showZero
          badgeContent={productsInCart}
          color={"primary"}
          max={99}
        >
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>
    </Link>
  );
}
