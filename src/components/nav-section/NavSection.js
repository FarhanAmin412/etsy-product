import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Badge, Box, List, ListItemText, Stack } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { updateChatMessages } from "src/pages/chat/request";

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const dispatch = useDispatch();
  const { title, path, icon, info } = item;
  const userType = useSelector((state) => state.user.user.type);
  const chatList = useSelector((state) => state.chat.chatList);
  const totalUnreadCount = useSelector((state) => state.chat.totalUnreadCount);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        borderRadius: "40px",
        "&.active": {
          color: "#02B2FE",
          bgcolor: "#D1E9FC",
          fontWeight: "fontWeightBold",
        },
      }}
      onClick={() => {
        if (title === "Inbox") {
          let unreadIDS = chatList.map((item) =>
            item.seller_read === 0 ? item.id : null
          );
          let cleanArray = unreadIDS.filter((item) => item);
          const payload = { message_id: cleanArray, status: 1 };
          if (cleanArray && cleanArray.length) {
            updateChatMessages(dispatch, userType, payload, selectedFilter);
          }
        }
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <ListItemText disableTypography primary={title} />
        {title === "Inbox" && (
          <Badge badgeContent={totalUnreadCount} color="primary" />
        )}
      </Stack>

      {info && info}
    </StyledNavItem>
  );
}
