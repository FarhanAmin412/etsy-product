import React from "react";
import EtsyLogo from "../../assets/img/etsy.svg";

const ConnectStore = () => {
  return (
    <div className="footer-newsletter section-clr">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center">
            <h2>Connect your store</h2>
            <p>Easily integrate your Storefront to Inner Circle Prints</p>

            <section id="clients" className="clients">
              <div className="container">
                <div className="row" data-aos="zoom-in">
                  <div className="col-lg-4 col-md-4 col-0 d-flex align-items-center justify-content-center"></div>

                  <div className="col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center">
                    <img src={EtsyLogo} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectStore;
