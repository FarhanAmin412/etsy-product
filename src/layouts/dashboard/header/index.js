import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";
import Logo from "../../../components/logo";
import AccountPopover from "./AccountPopover";
import { Box, Stack, IconButton } from "@mui/material";
import { StyledRoot, StyledToolbar } from "./header.styles";

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <Logo href="/dashboard/app" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
