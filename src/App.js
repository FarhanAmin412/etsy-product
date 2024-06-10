import React, { useEffect } from "react";
import Router from "./routes";
import ThemeProvider from "./theme";
import Pusher from "pusher-js";
import ScrollToTop from "./components/scroll-to-top";
import ModalProvider from "./components/modal/modal";

import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

import { Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { setModalState } from "./redux/actions/modalActions";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { adminToSeller, sellerToAdmin } from "./utils/pusher";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { getMessages } from "./pages/chat/request";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.user.isLoading);

  const account = useSelector((state) => state.user.user);
  const chatList = useSelector((state) => state.chat.chatList);
  const userType = useSelector((state) => state.user.user.type);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const replyMessage = useSelector((state) => state.chat.replyMessage);
  const chatSearched = useSelector((state) => state.chat.chatSearched);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setModalState(undefined));
      getMessages(dispatch, userType, false, selectedFilter);
    }

    const pusher = new Pusher(
      "e209b1d0800937ca9227",
      {
        cluster: "ap2",
        useTLS: true,
      },
      []
    );

    const channel = pusher.subscribe("icp");

    channel.bind("seller-to-admin", (data) => {
      sellerToAdmin(
        data,
        dispatch,
        userType,
        chatSearched,
        activeChat,
        chatList,
        location, selectedFilter
      );
    });

    channel.bind("admin-to-seller", (data) => {
      adminToSeller(
        data,
        dispatch,
        userType,
        chatSearched,
        activeChat,
        account,
        replyMessage, selectedFilter
      );
    });

    return () => {
      channel.unbind("admin-to-seller");
      channel.unbind("seller-to-admin");
      channel.unsubscribe();
    };
  }, [activeChat, replyMessage]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastContainer />
        <ModalProvider />
        <ScrollToTop />
        {isLoading && (
          <div className="loader">
            <Backdrop sx={{ zIndex: 2000 }} open={true}>
              <Loader color="#fff" size={16} />
            </Backdrop>
          </div>
        )}

        <React.Suspense
          fallback={
            <div className="over-lay">
              <div>
                <span>Loading</span>
              </div>
            </div>
          }
        >
          <Router />
        </React.Suspense>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
