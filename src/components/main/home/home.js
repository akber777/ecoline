import React, { useLayoutEffect } from "react";

// css
import "./css/_home.scss";

// tools

// rectstrap
import { Container } from "reactstrap";

// react router dom
import { NavLink } from "react-router-dom";

// map
import MapContainer from "../map/map";

// price
import Price from "../price/price";
import WhyUs from "../whyUs/whyUs";
import News from "../news/news";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

// query
import { useQuery } from "react-query";
import { homeSlider, categories } from "../../queries/queries";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

// slider
import Carousel from "react-multi-carousel";

// react i18
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useLayoutEffect(() => {
    AOS.init({
      duration: 900,
    });

    window.onscroll = () => {
      AOS.refresh();
    };
  }, []);

  // homeSlide
  let homeSlide = useQuery(["homeSlider", ""], homeSlider, {
    refetchOnWindowFocus: false,
  });

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

  const locate =
    settings.isLoading === false &&
    settings.data.data.map_location.map((item) => [
      Number(item.lat),
      Number(item.long),
    ]);

  let category = useQuery(["category", ""], categories, {
    refetchOnWindowFocus: false,
  });

  return (
    <main className="home">
      <div className="home__slider">
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={true}
          arrows={false}
          dotListClass="alice-carousel__dots-item"
        >
          {homeSlide.isLoading === false ? (
            homeSlide.data.data.map((item) => (
              <div className="home__sliderItem" key={item.id}>
                <img
                  src={
                    item.img !== null &&
                    item.img.length !== 0 &&
                    item.img.original
                  }
                  alt=""
                />
                <Container>
                  <div className="home__sliderInfo">
                    <h1>{item.title}</h1>
                    {item.url !== "" && item.url !== null && (
                      <a href={item.url}>{t("SİFARİŞ")}</a>
                    )}
                  </div>
                </Container>
              </div>
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
          )}
        </Carousel>
      </div>
      <div className="home__banner">
        <Container>
          <div className="home__wrapper">
            <div className="home__banner--left">
              <h4>
                Qeydiyyatdan keçin, ilk siparişinizdə 25% endirim qazanın!
              </h4>
              <span>İlk 100 müştəriyə xüsusi endirim kuponu veriləcəkdir.</span>
            </div>
            <div className="home__banner--right">
              {localStorage.getItem("token") === null &&
                localStorage.getItem("user") === null && (
                  <NavLink to={"/register"}>{t("Qeydiyyat")}</NavLink>
                )}
            </div>
          </div>
        </Container>
      </div>
      {category.isLoading === false ? (
        <>
          <div className="home__priceContent">
            <h4 className="title">{t("QİYMƏTLƏR VƏ ONLINE SİFARİŞ")}</h4>
          </div>
          <Price data={category.data} />
        </>
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
      )}
      <WhyUs />
      <News />
      <div id="map">
        {settings.isLoading === false ? (
          <MapContainer locations={locate} />
        ) : (
          <div
            style={{
              height: 300,
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
        )}
      </div>
    </main>
  );
};

export default Home;
