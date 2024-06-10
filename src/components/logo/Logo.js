import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Box } from "@mui/material";
import logosrc from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";

const Logo = forwardRef(({ disabledLink = false, sx, href, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: "150px",
        height: 40,
        display: "inline-flex",
        color: "#02B2FE",
        ...sx,
      }}
      {...other}
    >
      <NavLink to={href} >
        <img src={logosrc} alt="logo" />
      </NavLink>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return logo;
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
