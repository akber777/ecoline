import React, { useLayoutEffect } from "react";

// css

import "./css/_rules.scss";

// tools

// rectstrap
import { Container } from "reactstrap";

// components
import WhyUs from "../whyUs/whyUs";
import News from "../news/news";
import Map from "../map/map";

// queries
import { blogs } from "../../queries/queries";

// react query
import { useQuery } from "react-query";

// react router dom
import { useParams } from "react-router-dom";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

// helper
import { checkType } from "../../helper/helper";

const NewsDetail = () => {
  let { slug } = useParams();

  let { data, isLoading } = useQuery(["blogs/", "detail/" + slug], blogs, {
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

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [data]);

  return (
    <main className="rules">
      <div
        className="rules__banner"
        style={{
          backgroundImage: `url(${require("../../images/rules.png").default})`,
        }}
      >
        <Container>
          <h4 className="rules__title">Blogs</h4>
        </Container>
      </div>
      <div className="rules__content" style={{ minHeight: 500 }}>
        <Container>
          {isLoading === false && data.data.length !== 0 ? (
            <>
              <h4>{data.data.title}</h4>
              <img
                src={data.data.img !== null ? data.data.img.detail : ""}
                alt={""}
              />
              <div className="myContent">{checkType(data.data.content)}</div>
            </>
          ) : (
            <div
              style={{
                height: 100,
                width: "100%",
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
      <div id="map">
        {settings.isLoading === false && <Map locations={locate} />}
      </div>
    </main>
  );
};

export default NewsDetail;
