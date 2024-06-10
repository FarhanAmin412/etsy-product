import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./nav";
import Header from "./header";
import GuestFooter from "src/sections/footer";
import { getMessages } from "src/pages/chat/request";

// const APP_BAR_MOBILE = 64;
// const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  maxHeight: "100vh",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "50vh",
  maxHeight: "84vh",
  paddingTop: 24,
  paddingBottom: theme.spacing(6),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  "::-webkit-scrollbar": {
    width: "12px",
    height: "4px",
  },

  "::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: "grey",
    borderRadius: "20px",
  },
}));

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const myDivRef = useRef(null);
  const userType = useSelector((state) => state.user.user.type);
  const selectedFilter = useSelector((state) => state.chat.selectedFilter);

  const [open, setOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const handleScroll = () => {
    const scrollTop = myDivRef.current.scrollTop;
    setShowScrollButton(scrollTop > 0);
  };

  useEffect(() => {
    getMessages(dispatch, userType, false, selectedFilter);
    const node = myDivRef.current;
    node.addEventListener("scroll", handleScroll);
    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    myDivRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Helmet>
        <title> Inner Circle Prints </title>
      </Helmet>

      <Header onOpenNav={() => setOpen(true)} />

      <StyledRoot>
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Main ref={myDivRef}>
          <Outlet />
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className="back-to-top-btn d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-arrow-up-short"></i>
            </button>
          )}
        </Main>
      </StyledRoot>
      <GuestFooter />
    </>
  );
}
