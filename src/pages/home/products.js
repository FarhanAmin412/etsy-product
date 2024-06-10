import React from "react";
import Ashley from "../../assets/img/ashley.png";
import Christmas from "../../assets/img/christmas.png";
import First from "../../assets/img/first.png";
import Senor from "../../assets/img/senor.png";

const Products = () => {
  return (
    <section id="products" className="product section-clr">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-xl-12 col-md-12 d-flex align-items-stretch justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="section-title">
              <h2>Featured Products</h2>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div
            className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 responsive-col"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="icon-box">
              <div className="icon">
                <img src={Ashley} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 responsive-col"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="icon-box">
              <div className="icon">
                <img src={Christmas} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 responsive-col"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="icon-box">
              <div className="icon">
                <img src={First} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

          <div
            className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 responsive-col"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="icon-box">
              <div className="icon">
                <img src={Senor} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
