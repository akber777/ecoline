import React from "react";

// css

import "./css/_footer.scss";

// tools

// reactstrap
import { Container } from "reactstrap";

// react router dom
import { NavLink } from "react-router-dom";

// react query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// baseUrl
import { baseUrl } from "../api/api";

// react whatsapp
import ReactWhatsapp from "react-whatsapp";

// jquery
import $ from "jquery";

const Footer = () => {
  // settings
  let settings = useQuery(
    ["settings", ""],
    async () => {
      const res = await axios.get(baseUrl + "setting");

      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  $(window).scroll(function () {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - $(".footer__end").height()
    ) {
      $(".header__navGetMobile").css({
        bottom: $(".footer__end").height() + 50,
      });
    } else {
      $(".header__navGetMobile").css({
        bottom: 10,
      });
    }
  });

  return (
    <footer className="footer">
      <ReactWhatsapp
        className="header__navGetMobile wpBox"
        number="+994502765599"
        message=""
      >
        <div className="whatsap_div">
          <a target="_blank" rel="noreferrer" title="" href="2#">
            <img
              className="full"
              src={require("../images/whatsapp.png").default}
              alt=""
            />
          </a>
        </div>
      </ReactWhatsapp>
      <Container>
        <div className="footer__top">
          <div className="footer__logo">
            <img src={require("../images/logoHeader.png").default} alt="" />
          </div>
          <div className="footer__content">
            <p>© 2021. All Rights Reserved.</p>
            <div className="footer__social">
              {settings.isLoading === false &&
                settings.data !== undefined &&
                settings.data.data.social.map((item) => (
                  <a target="_blank" rel="noreferrer" href={item.url}>
                    <i className={item.icon}></i>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="footer__end">
        <Container>
          <div className="footer__wrapEnd">
            <div className="footer__end--left">
              <NavLink to={"/blog"}> Blog</NavLink>
              <NavLink to={"/xidmetlerimiz"}>Xidmətlər </NavLink>
              <NavLink to={"/contact"}>Əlaqə</NavLink>
            </div>
            <div className="footer__end--right">
              {settings.isLoading === false && settings.data !== undefined && (
                <a href={"tel:" + settings.data.data.header_phone}>
                  {settings.data.data.header_phone}
                </a>
              )}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
