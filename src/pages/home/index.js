import React, { useEffect, useState } from "react";
import { onscroll, select } from "./utils";
import Footer from "./footer";
import AOS from "aos";
import "./home.styles.css";
import "aos/dist/aos.css";
import Header from "./header";
import Hero from "./hero";
import WhyUs from "./WhyUs";
import Products from "./products";
import Skills from "./skills";
import ConnectStore from "./ConnectStore";
import ApplyNow from "./ApplyNow";
import { loadingAction } from "src/redux/actions/userActions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const EtsyVideo = "https://api.innercircleprints.com/assets/vid.mp4";
  const VideoAsset = "https://api.innercircleprints.com/assets/video.svg";

  useEffect(() => {
    dispatch(loadingAction(false));

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    let backtotop = select(".back-to-top");

    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <>
      <Header />

      <Hero
        open={open}
        setOpen={setOpen}
        EtsyVideo={EtsyVideo}
        VideoAsset={VideoAsset}
      />
      <WhyUs />
      <Products />
      <Skills EtsyVideo={EtsyVideo} VideoAsset={VideoAsset} />
      <ConnectStore />
      <ApplyNow />

      <Footer />

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Home;
