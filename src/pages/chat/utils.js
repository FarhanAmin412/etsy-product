import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const formatChatList = (chatList, userUnreadCount) => {
  const CHATLIST =
    chatList &&
    chatList?.map((user) => ({
      ...user,
      user_id: user?.user_details ? user?.user_details?.id : 0,
      avatarUrl:
        user?.user_details?.image !== null
          ? user?.user_details?.image
          : "../assets/images/avatars/avatar_default.jpg",
      user_details: user?.user_details ? user?.user_details : {},
    }));

  const formattedData = {};

  CHATLIST?.forEach((item) => {
    const userId = item?.user_id;
    const avatar = item?.avatarUrl;
    const user_details = item?.user_details;

    if (!formattedData[userId]) {
      formattedData[userId] = {
        user_id: userId,
        user_details: user_details,
        avatarUrl: avatar,

        data: [],
      };
    }

    const { user_id, ...userData } = item;
    formattedData[userId].data.push(userData);
  });

  const formattedArray = Object.values(formattedData);

  const userCountsMap = formattedArray.map((item) => {
    const userId = item.user_id;
    const count = userUnreadCount[userId] || 0;
    let lastIndex = item?.data[item?.data?.length - 1];

    let updated_at = lastIndex?.updated_at ? lastIndex?.updated_at : "-";
    return {
      ...item,
      count,
      updated_at: updated_at,
    };
  });

  let sortData = userCountsMap.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return sortData;
};

export const StyledContainer = styled("div")({
  position: "fixed",
  bottom: "36px",
  right: "100px",
  zIndex: 996,
});

export const StyledButton = styled(Button)({
  backgroundColor: "#02B2FE",
  outline: "none",
  border: "transparent",
  color: "#fff",
});

export const StyledIconButton = styled(IconButton)({
  marginRight: "16px",
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  backgroundColor: "#02B2FE",

  "&:hover": {
    backgroundColor: "#103996",
  },
});
