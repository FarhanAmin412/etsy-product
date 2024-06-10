import React from "react";
import { Box, Modal } from "@mui/material";
import { style } from "./utils";
import Sensor from "../../assets/img/sensor.png";

const Hero = ({
  open,
  setOpen,
  EtsyVideo,
  VideoAsset,
}) => {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-5 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1>Workflow & Personalization Ease For Our Exclusive Clients.</h1>
            <div className="d-flex justify-content-center justify-content-lg-start flex-wrap">
              <a href="/signup" className="btn-get-started scrollto load">
                Apply Now
              </a>
              <a
                onClick={() => setOpen(true)}
                className="btn-watch-video scrollto load"
              >
                <span>Learn More</span>
                <i className="bi bi-play-circle"></i>
              </a>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="lightbox"
              >
                <Box sx={style}>
                  <video
                    id="my-video"
                    className="video-js"
                    controls
                    preload="auto"
                    width="800"
                    height="570"
                    poster={VideoAsset}
                    data-setup="{}"
                  >
                    <source src={EtsyVideo} type="video/mp4" />
                  </video>
                </Box>
              </Modal>
            </div>
          </div>
          <div
            className="col-lg-7 order-1 order-lg-2 hero-img"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img src={Sensor} className="img-fluid animated" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
