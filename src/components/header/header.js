import React, { useLayoutEffect } from "react";

// css

import "./css/_header.scss";

// Tools
import { Container } from "reactstrap";

// react router dom

import { NavLink, useLocation } from "react-router-dom";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// react i18
import { useTranslation } from "react-i18next";

// react query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// helper
import { checkedUrl } from "../helper/helper";

// jquery
import $ from "jquery";

// recoil
import { useRecoilState } from "recoil";

// atoms
import { titleHelmet } from "../atoms/atoms";

import { baseUrl } from "../api/api";

const Header = () => {
  let { pathname } = useLocation();

  const { t } = useTranslation();

  let { data, isLoading } = useQuery(
    ["header", ""],
    async () => {
      const res = axios.get(
        "http://apiecoline.gocreative.az/api/v1/data/menu/header"
      );

      return (await res).data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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

  useLayoutEffect(() => {
    if (pathname === "/") {
      $(".header__navList a:first").addClass("activeItem");
    } else if (pathname === "/index") {
      $(".header__navList a:first").addClass("activeItem");
    } else {
      $(".header__navList a:first").removeClass("activeItem");
    }

    $.each($("header__navList .header__subItem"), function (index, item) {
      $(item).parents("a").addClass("noHover");

      if ($(item).find("a").hasClass("active") === true) {
        $(item).parents("a").css({
          color: "#8cbd29",
        });
      } else {
        $(item).parents("a").css({
          color: "#3d3d3d",
        });
      }

      $(item).parents("a").removeClass("activeItem");
    });

    $(".headerMobileMenu a").removeClass("noHover");

    // $('.headerMobileMenu > a').on('click', function () {
    //     $('.headerMobWrap ').removeClass('openMenu');
    // })
  }, [data]);

  useLayoutEffect(() => {
    if (pathname === "/") {
      $(".header__navList a:first").addClass("activeItem");
    } else if (pathname === "/index") {
      $(".header__navList a:first").addClass("activeItem");
    } else {
      $(".header__navList a:first").removeClass("activeItem");
    }

    $.each($(" .header__subItem"), function (index, item) {
      $(item).parents("a").addClass("noHover");

      if ($(item).find("a").hasClass("active") === true) {
        $(item).parents("a").css({
          color: "#8cbd29",
        });
      } else {
        $(item).parents("a").css({
          color: "#3d3d3d",
        });
      }

      $(item).parents("a").removeClass("activeItem");
    });

    $(".headerMobileMenu a").removeClass("noHover");
  });

  let [titleHel, setTitle] = useRecoilState(titleHelmet);

  return (
    <header className="header">
      <div className=" headerMobWrap">
        <div className="closeMob">
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="headerMobileMenu">
          {isLoading === false &&
            data !== undefined &&
            data.map((item, index) => (
              <NavLink
                to={checkedUrl(item)}
                key={index}
                className={
                  checkedUrl(item) === "/" + pathname.split("/")[1]
                    ? "activeItem"
                    : ""
                }
              >
                {item.title}
                {item.items !== undefined
                  ? item.items.map((subitem, indexSub) => (
                      <div className="header__subItem">
                        <NavLink to={checkedUrl(subitem)} key={indexSub}>
                          {subitem.title}
                        </NavLink>
                      </div>
                    ))
                  : ""}
              </NavLink>
            ))}
          <div className="footer__social">
            <a href="">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faPlay} />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
      <div className="header__top">
        <Container>
          <div className="header__topFlex">
            <div className="header__topLeft">
              <p>
                {settings.isLoading === false && settings.data.data.header_open}
              </p>
            </div>
            <div className="header__topRight">
              <a href="tel:">
                {settings.isLoading === false &&
                  settings.data.data.header_phone}
              </a>
              {window.localStorage.getItem("token") === null ? (
                <NavLink to={"/signin"}>
                  <img src={require("../images/phone.png").default} alt="" />
                  {t("Daxil ol")}
                  <span>/</span>
                </NavLink>
              ) : (
                <NavLink to={"/loginorder"}>
                  {JSON.parse(window.localStorage.getItem("user")).name}
                </NavLink>
              )}
              {window.localStorage.getItem("token") === null ? (
                <NavLink to={"/register"}>{t("Qeydiyyat")}</NavLink>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </div>
      <div className="header__menuBox">
        <Container>
          <nav className="header__nav">
            <NavLink
              to={"/index"}
              className="navLogo"
              onClick={() => {
                setTitle("Ana Səhifə");
              }}
            >
              <img
                src={
                  settings.isLoading === false
                    ? settings.data.data.header_logo.original
                    : ""
                }
                alt=""
              />
            </NavLink>
            <div className="header__navItem">
              <div className="openMob">
                <FontAwesomeIcon icon={faBars} />
              </div>
              <div className="header__navList">
                {isLoading === false &&
                  data !== undefined &&
                  data.map((item, index) => (
                    <NavLink
                      to={checkedUrl(item)}
                      key={index}
                      className={
                        checkedUrl(item) === "/" + pathname.split("/")[1]
                          ? "activeItem"
                          : ""
                      }
                      onClick={() => {
                        setTitle(item.title);
                      }}
                    >
                      {item.title}
                      {item.items !== undefined ? (
                        <div className="header__subItem">
                          {item.items.map((subitem, indexSub) => (
                            <NavLink to={checkedUrl(subitem)} key={indexSub}>
                              {subitem.title}
                            </NavLink>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  ))}
              </div>
              <div className="header__navGet">
                <NavLink to={"/order"}>
                  {t("QİYMƏTLƏR VƏ ONLINE SİFARİŞ")}
                </NavLink>
              </div>
            </div>
          </nav>
        </Container>
      </div>
      <div
        className="header__navGetMobile header__navGet"
        style={{
          display:
            pathname.split("/")[1] === "order" ||
            pathname.split("/")[1] === "ordercomplete" ||
            pathname.split("/")[1] === "location" ||
            pathname.split("/")[1] === "payment"
              ? "none"
              : "block",
        }}
      >
        <NavLink to={"/order"}>{t("QİYMƏTLƏR VƏ ONLINE SİFARİŞ")}</NavLink>
      </div>
    </header>
  );
};

export default Header;
