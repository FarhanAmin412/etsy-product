import React from "react";

const WhyUs = () => {
  return (
    <section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
            <div className="content">
              {/* <span className="top_heading">About Us</span> */}
              <h2>
                You Personalize Your Designs and <br></br>
                We Help Hand-make Your Products
              </h2>
              <p>
                We understand that many sellers do not have access to the
                equipment or space needed to complete their one of a kind
                handmade products, and that is where we come in.
              </p>
              <p>
                Our software is designed by sellers for sellers, with a majority
                focus on personalization ease. We want the personalization
                process to be easy to do and accurate so that your buyers get
                exactly what they order.
              </p>
              <p>
                We have a team of experienced artisans who are ready to bring
                your one of a kind products to life, with every aspect of
                personalization and fine detail displayed. The best part is we
                pride ourselves on the quality of your products and our
                efficient 1-2 business day production time.
              </p>

              <strong>
                Please note, we currently only work with 50 clients and our #1
                job is to serve them. If you would like to work with us in the
                future please click the "Apply Now" button.
              </strong>
            </div>

            <div className="accordion-list"></div>
          </div>

          <div
            className="col-lg-6 align-items-stretch order-1 order-lg-2 img services-img"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            &nbsp;
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
