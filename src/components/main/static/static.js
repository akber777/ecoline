import React, { useLayoutEffect } from "react";

// tools

// rectstrap
import { Container } from "reactstrap";

// components
import WhyUs from "../whyUs/whyUs";
import News from "../news/news";
import Map from "../map/map";

// react router dom
import { useLocation } from "react-router-dom";

// react query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// baseUrl
import { baseUrl } from "../../api/api";

// helper
import { checkType } from "../../helper/helper";

const Static = () => {
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });

  let { pathname } = useLocation();

  let { data, isLoading } = useQuery(["staticPages", pathname], async () => {
    const res = axios.get(baseUrl + "page" + pathname);

    return (await res).data;
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

  return (
    <main className="rules">
      <div
        className="rules__banner"
        style={{
          backgroundImage: `url(${require("../../images/rules.png").default})`,
        }}
      >
        {/* <img src={require('../../images/rules.png').default} alt='' /> */}
        <Container>
          <h4 className="rules__title staticH4">
            {isLoading === false &&
              data !== undefined &&
              data.data.length !== 0 &&
              data.data.viewBag.title}
          </h4>
        </Container>
      </div>
      <div className="rules__content">
        <Container>
          {isLoading === false && data !== undefined ? (
            <>
              {/* <h4>
                                    {
                                        data.data.viewBag.title
                                    }
                                </h4> */}
              {checkType(data.data.markup)}
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
        </Container>
      </div>
      <WhyUs />
      <News />
      {settings.isLoading === false && (
        <div id="map">
          <Map locations={locate} />
        </div>
      )}
    </main>
  );
};

export default Static;
