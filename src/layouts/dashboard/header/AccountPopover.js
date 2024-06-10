import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingBtnAction, logoutAction } from "src/redux/actions/userActions";
import { toastify } from "src/utils/toast";
import request from "src/utils/request";
import { CircularProgress } from "@mui/material";
import { onLogout } from "./request";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    path: "/dashboard",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: "/dashboard/profile",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    path: "/dashboard/settings",
  },
];

export default function AccountPopover() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const account = useSelector((state) => state.user.user);
  const userType = useSelector((state) => state.user.user.type);
  const isLoading = useSelector((state) => state.user.loadingButton);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const MenuOptions =
    userType === "Seller"
      ? MENU_OPTIONS
      : MENU_OPTIONS.filter((_, index) => index !== 2);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.image} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MenuOptions.map((option) => (
            <MenuItem
              component={Link}
              to={option.path}
              key={option.label}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        {isLoading ? (
          <MenuItem
            onClick={() => onLogout(dispatch, navigate, setOpen)}
            sx={{ mt: 1, ml: 8 }}
          >
            <CircularProgress color="inherit" size={16} />
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => onLogout(dispatch, navigate, setOpen)}
            sx={{ m: 1 }}
          >
            Logout
          </MenuItem>
        )}
      </Popover>
    </>
  );
}
