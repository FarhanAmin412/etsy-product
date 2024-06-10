import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
import useResponsive from "../../../hooks/useResponsive";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
import navConfig from "./config";
import { useSelector } from "react-redux";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");
  const userType = useSelector((state) => state.user.user.type);

  const NavRoutes =
    userType === "Seller"
      ? navConfig.filter(
          (_, index) => index !== 3 && index !== 8 && index !== 9
        )
      : userType === "Developer"
      ? navConfig.filter(
          (_, index) => index === 0 || index === 8 || index === 9
        )
      : navConfig.filter(
          (_, index) => index !== 4 && index !== 6 && index !== 9
        );

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <NavSection data={NavRoutes} />
    </Scrollbar>
  );

  return (
    <Box
      className="testing-wrapper"
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          className="Drawer-test-1"
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "white",
              margin: "0 10px",
              borderRadius: 3,
              height: "80vh",
              borderRightStyle: "dashed",
              position: "relative",
              zIndex: 0,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          className="Drawer-test-2"
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
