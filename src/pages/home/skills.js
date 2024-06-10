import React from "react";

const Skills = ({ EtsyVideo, VideoAsset }) => {
  return (
    <section id="skills" className="skills">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 pt-4 pt-lg-0 content align-self-center"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <h3>Learn More About Inner Circle Prints</h3>
            <p>
              Click the video to see how Inner Circle Prints hand-makes products
              for exclusive clients who do not have access to the space or
              equipment necessary to complete their one of a kind handmade
              products.
            </p>
          </div>
          <div
            className="col-lg-6 d-flex align-items-center"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <video
              id="my-video"
              className="video-js"
              controls
              preload="auto"
              width="600"
              height="370"
              poster={VideoAsset}
              data-setup="{}"
            >
              <source src={EtsyVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
