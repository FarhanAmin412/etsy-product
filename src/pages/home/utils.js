export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  border: "none",
  boxShadow: "none",
  outline: 0,

  "&:focus-visible": {
    outline: 0,
  },
};

export const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

export const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

export const fetchEtsyVideo = async (setEtsyVideo) => {
  fetch("https://api.innercircleprints.com/assets/vid.mp4")
    .then((response) => response.blob())
    .then((videoData) => {
      setEtsyVideo(videoData);
    });
};

export const fetchVideoPoster = async (setVideoPoster) => {
  fetch("https://api.innercircleprints.com/assets/video.svg")
    .then((response) => response.text())
    .then((svgData) => {
      setVideoPoster(svgData);
    });
};
