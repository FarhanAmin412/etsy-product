import { Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/img/innerlogo.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 footer-contact">
              <div className="d-flex justify-content-center">
                <img src={Logo} alt="logo" />
              </div>

              <p>10807 E Montgomery Drive Spokane Valley, WA 99206</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom clearfix text-center">
        <div className="copyright text-center">
          2023 {" "}
          <strong>
            <span>Inner Circle Prints</span>
          </strong>
          . All Rights Reserved
        </div>
        <Typography variant="caption" color="initial">
          The term 'Etsy' is a trademark of Etsy, Inc. This application uses the
          Etsy API but is not endorsed or certified by Etsy, Inc.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
