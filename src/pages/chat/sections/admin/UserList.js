import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import MarkAsUnread from "./MarkAsUnread";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { updateChatMessages } from "../../request";
import { formatDate, getLastMessage } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setChatSearched } from "src/redux/actions/chatActions";

const StyledCard = styled(Card)(({ theme }) => ({
  my: 1,
  padding: "16px 12px",
  borderRadius: "16px",
  cursor: "pointer",
  marginBottom: "16px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const UserList = ({ chatList, search }) => {
  const dispatch = useDispatch();
  const skeletonLoading = useSelector((state) => state.user.skeletonLoading);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const userType = useSelector((state) => state.user.user.type);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  let array = userType === "Seller" ? [1] : [1, 2, 3];
  return (
    <PerfectScrollbar
      style={{
        height: search ? "auto" : "57vh",
        width: userType === "Seller" ? "100%" : "98%",
        position: "relative",
        marginBottom: "16px",
      }}
    >
      {skeletonLoading
        ? array.map((index) => (
            <StyledCard
              sx={{
                width: userType === "Seller" ? "90%" : "86%",
              }}
              key={index}
            >
              <Grid container>
                <Grid item xs={12} md={6} lg={1.5}>
                  <Box>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mr: 2 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8} lg={6} textAlign={"start"}>
                  <Skeleton width={120} />
                  <Skeleton width={320} />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Skeleton width={20} sx={{ float: "right" }} />
                </Grid>
              </Grid>
            </StyledCard>
          ))
        : chatList?.map((chat, index) => {
            let lastIndex = chat?.data[chat?.data?.length - 1];

            let time = lastIndex?.updated_at
              ? formatDate(lastIndex?.updated_at)
              : "-";

            let last_msg = lastIndex ? getLastMessage(lastIndex) : "";

            let last_messages = lastIndex
              ? {
                  message_id: lastIndex.id,
                  user_id: lastIndex?.user_details?.id,
                  user_name: lastIndex?.user_details?.name,
                  user_image: lastIndex?.user_details?.image,
                  message: last_msg,
                  media: null,
                }
              : {};

            return (
              <Stack key={index} direction={"row"} alignItems={"center"}>
                <StyledCard
                  sx={{
                    width: userType === "Seller" ? "90%" : "86%",
                    backgroundColor:
                      activeChat?.user_id == chat?.user_id ? "#fff" : "#f1f1f1",
                  }}
                  onClick={() => {
                    dispatch(setActiveChat(chat));
                    if (search) {
                      dispatch(setChatSearched(true));
                    }

                    let unreadIDS = chat.data.map((item) =>
                      userType === "Seller"
                        ? item?.seller_read === 0 && item.id
                        : item.admin_read === 0 && item.id
                    );

                    let cleanArray = unreadIDS.filter((item) => item);
                    const payload = { message_id: cleanArray, status: 1 };

                    if (cleanArray && cleanArray.length) {
                      updateChatMessages(
                        dispatch,
                        userType,
                        payload,
                        selectedFilter
                      );
                    }
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6} lg={2}>
                      <Box>
                        <Avatar
                          alt={chat?.user_details?.name}
                          src={chat?.avatarUrl}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={8}
                      lg={6}
                      textAlign={"start"}
                      sx={{
                        display: last_msg ? "" : "flex",
                        alignItems: last_msg ? "" : "center",
                      }}
                    >
                      <Typography variant="subtitle2" mb={0.5}>
                        {chat?.user_details?.name}
                      </Typography>

                      {last_msg ? (
                        <Typography
                          variant="body2"
                          sx={{
                            width: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {last_msg}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    {time && (
                      <Grid item xs={12} md={4} lg={4} textAlign={"end"}>
                        <Typography variant="body2">{time}</Typography>

                        <Badge
                          badgeContent={chat?.count ? chat.count : 0}
                          color="primary"
                          sx={{ mr: 1, mt: 0.5 }}
                        ></Badge>
                      </Grid>
                    )}
                  </Grid>
                </StyledCard>
                {userType === "Seller" ? (
                  ""
                ) : (
                  <MarkAsUnread
                    last_messages={last_messages}
                    id={chat?.user_id}
                  />
                )}
              </Stack>
            );
          })}
    </PerfectScrollbar>
  );
};

export default UserList;
