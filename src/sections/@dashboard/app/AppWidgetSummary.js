// @mui
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { fShortenNumber } from "../../../utils/formatNumber";

const StyledIcon = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: "10px",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  card_color,
  icon_color,
  icon,
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        px: 5,
        textAlign: "left",
        boxShadow: 0,
        color: (theme) => theme.palette[card_color].contrastText,
        bgcolor: (theme) => theme.palette[card_color].main,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[icon_color].main,
          // backgroundImage: (theme) =>
          //   `linear-gradient(135deg, ${alpha(theme.palette[icon_color].contrastText, 1)} 0%, ${alpha(theme.palette[icon_color].contrastText,1)} 100%)`,
          backgroundColor: (theme) => theme.palette[icon_color].main,
        }}
      >
        <img src={icon} />
      </StyledIcon>

      <Typography variant="h4">{title}</Typography>
      <Typography variant="h1" className="stats-responsive">
        {title === "Total Revenue"
          ? `$ ${fShortenNumber(total)}`
          : fShortenNumber(total)}
      </Typography>
    </Card>
  );
}
