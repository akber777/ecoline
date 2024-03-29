import React, { useLayoutEffect } from "react";

// tools

// rectstrap
import { Col, Container, Row } from "reactstrap";

// react router dom
import { NavLink, useLocation } from "react-router-dom";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

// imgPath
import { baseUrl, imgPath } from "../../api/api";

// query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// react i18
import { useTranslation } from "react-i18next";

// react splide
import { Splide, SplideSlide } from "@splidejs/react-splide";

const WhyUs = (props) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  let { pathname } = useLocation();

  let updatedPath = pathname === "/" ? "index" : pathname.split("/")[1];

  let { data, isLoading } = useQuery(["advantage", pathname], async () => {
    const res = axios.get(baseUrl + "page/" + updatedPath);

    return (await res).data;
  });

  return (
    <>
      {isLoading === false &&
      data !== undefined &&
      data.data.viewBag !== undefined &&
      data.data.viewBag.advantage !== undefined ? (
        <div className="home__whyUs" data-aos="fade-down">
          <h4>{t("BİZİ SEÇMƏYİNİZ ÜÇÜN BİR NEÇƏ SƏBƏB")}</h4>
          <div
            className="home__whyUsWrapper"
            style={{
              backgroundImage: `url(${
                require("../../images/bacj.png").default
              })`,
            }}
          >
            {/* <img src={require('../../images/bacj.png').default} alt='' /> */}
            <Container>
              <div className="home__whyUsContent">
                <Splide
                  options={{
                    width: "auto",
                    gap: "1rem",
                    autoplay: true,
                    interval: 4000,
                    type: "loop",
                    perPage: 3,
                    arrows: false,
                    perMove: 1,
                    pagination: false,
                    breakpoints: {
                      1052: {
                        perPage: 2,
                      },
                      775: {
                        perPage: 1,
                      },
                    }
                  }}
                >
                  {isLoading === false &&
                    data.data.length !== 0 &&
                    (data.data.viewBag.advantage !== undefined ? (
                      data.data.viewBag.advantage.map((item, index) => (
                        <SplideSlide>
                          <NavLink to={""}>
                            <div className="home__whyUsItems">
                              <div className="home__whyUsItems--imgBox">
                                <img
                                  src={
                                    item.img !== undefined && item.img !== null
                                      ? imgPath + item.img
                                      : ""
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="home__whyUsItems--text">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </NavLink>
                        </SplideSlide>
                      ))
                    ) : (
                      <div
                        style={{
                          height: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          id="preloader"
                          aria-busy="true"
                          aria-label="Loading, please wait."
                          role="progressbar"
                        ></div>
                      </div>
                    ))}
                </Splide>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WhyUs;
