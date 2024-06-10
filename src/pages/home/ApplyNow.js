import React from "react";
import PLogo from "../../assets/img/plogo.png";

const ApplyNow = () => {
  return (
    <section id="cta" className="cta">
      <div className="container" data-aos="zoom-in">
        <div className="row ">
          <div className="col-lg-9 text-center text-lg-start d-flex">
            <div className="cta-img me-5">
              <img src={PLogo} className="img-fluid" alt="" />
            </div>
            <div className="cta-content align-self-center">
              <h3>We are Ready to Serve You</h3>
              <p>
                Click the “Apply Now” Button to see if you qualify to work with
                us.
              </p>
            </div>
          </div>
          <div className="col-lg-3 cta-btn-container text-center">
            <a className="cta-btn align-middle load" href="/signup">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
