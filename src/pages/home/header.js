import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/innerlogo.png";
import { useState } from "react";
import { useEffect } from "react";
import { onscroll, select } from "./utils";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const handleShowNavbar = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    let selectHeader = select("#header");

    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add("header-scrolled");
        } else {
          selectHeader.classList.remove("header-scrolled");
        }
      };
      window.addEventListener("load", headerScrolled);
      onscroll(document, headerScrolled);
    }

    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <a href="#" className="logo me-auto">
          <img src={Logo} alt="" className="img-fluid" />
        </a>

        <nav
          id="navbar"
          className={`navbar ${showNav ? "navbar-mobile" : " "}`}
        >
          <ul>
            <li>
              <Link className="nav-link scrollto active" to="/">
                Home
              </Link>
            </li>
            <li>
              <a className="nav-link scrollto" href="#products">
                Products
              </a>
            </li>
            <li>
              <Link className="nav-link scrollto" to="/about">
                About
              </Link>
            </li>
            {/* <li>
            <a className="nav-link   scrollto" href="#services">
              Services
            </a>
          </li> */}
            <li>
              <Link className="nav-link scrollto" to="/contact">
                Contact
              </Link>
            </li>

            <li>
              <Link className="getstarted scrollto load" to="/login">
                Log in
              </Link>
            </li>
            <li>
              <Link className="getsend scrollto load" to="/signup">
                Apply Now
              </Link>
            </li>
          </ul>
          <i
            onClick={handleShowNavbar}
            className={`bi  mobile-nav-toggle ${showNav ? "bi-x" : "bi-list"}`}
          ></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
