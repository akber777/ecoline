import React, { useLayoutEffect } from "react";

// css
import "./css/_payment.scss";

// tools

// rectstrap
import { Container } from "reactstrap";

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from "../map/map";

// react router dom
import { NavLink, useHistory } from "react-router-dom";

// query
import { useQuery } from "react-query";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

//  jquery
import $ from "jquery";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";

// atoms
import { order, orderstatus } from "../../atoms/atoms";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// helper
import { decimalAdjust } from "../../helper/helper";

// sweet alert
import swal from "sweetalert";

const Payment = () => {
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

  let history = useHistory();

  const round10 = (value, exp) => decimalAdjust("round", value, exp);

  const reducer = (accumulator, currentValue) =>
    round10(accumulator + currentValue, -1);

  if (JSON.parse(localStorage.getItem("items")) === null) {
    history.push({
      pathname: "/order",
    });
  }

  let [allOder, setOrder] = useRecoilState(order);

  let [ordercheck, setOrderCheck] = useRecoilState(orderstatus);

  let orderValue = useRecoilValue(order);

  useLayoutEffect(() => {
    if (orderValue === null) {
      history.push({
        pathname: "/location",
      });
    }

    $(".changeInfo").on("click", function () {
      setOrder({
        address_id: orderValue.address_id,
        payment_method: $(this).attr("data-id"),
        amount:
          JSON.parse(localStorage.getItem("total")) != null
            ? JSON.parse(localStorage.getItem("total")).reduce(reducer)
            : null,
        is_express: 1,
        items: JSON.parse(localStorage.getItem("items")),
        orderNotes: localStorage.getItem("ordernotes"),
      });

      $(".changeInfo").show();
      $(".changeInfo").find("input").prop("checked", false);
      $(".changeInfo").next().css({
        opacity: 0,
      });

      $(this).find("input").prop("checked", true);

      $(this).hide();

      $(this).next().css({
        opacity: 1,
      });
    });

    $.each($(".changeInfo"), function (index, item) {
      if (orderValue !== null) {
        if ($(item).attr("data-id") === orderValue.payment_method) {
          $(item).hide();
          $(item).next().css({
            opacity: 1,
          });
        }
      }
    });
  }, []);

  let sendOder = async (params) => {
    const res = axios.post(baseUrl + "order/create", params);


    if ((await res).data.status === 200) {
      history.push({
        pathname: "/ordercheckcash",
      });

      setOrderCheck((await res).data.status);
    } else if ((await res).data.status === 302) {
      window.location.href = (await res).data.url;
    }

    return res.data;
  };

  return (
    <main className="location payment">
      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">ONLİNE SİFARİŞ</h4>
        </Container>
      </div>
      <div className="locationWrapper">
        <div className="order__breadCrumbs">
          <span>SİFARİŞ</span>
          <span>SİFARİŞLƏRİM</span>
          <span>ÜNVAN SEÇ</span>
          <span className="activCrumbs">ÖDƏNİŞ ET</span>
        </div>
        <Container>
          <div className="payment__content">
            <div className="location__content">
              <div className="location__contentLeft">
                <p>Qapida odenis</p>
              </div>
              <div className="location__contentRight">
                <span className="changeInfo" data-id={2}>
                  SEÇ
                  <input name="address_id" type="radio" />
                </span>
                <i style={{ opacity: 0 }} className="checkedI">
                  <FontAwesomeIcon icon={faCheck} />
                </i>
              </div>
            </div>
            <div className="location__content">
              <div className="location__contentLeft">
                <p>Online Odenis</p>
              </div>
              <div className="location__contentRight">
                <span className="changeInfo" data-id={1}>
                  SEÇ
                  <input name="payment_id" type="radio" />
                </span>
                <i style={{ opacity: 0 }} className="checkedI">
                  <FontAwesomeIcon icon={faCheck} />
                </i>
              </div>
            </div>
          </div>
          <div className="order__result">
            <p>
              ÜMUMİ MƏBLƏĞ:
              <span className="res">
                {JSON.parse(localStorage.getItem("total")) !== null &&
                  JSON.parse(localStorage.getItem("total")).reduce(reducer) +
                    " AZN"}
              </span>
            </p>
            <div className="btnBoxs" style={{ marginTop: 15 }}>
              <NavLink to={"/location"}>
                <button className="success">Prev</button>
              </NavLink>
              <NavLink
                to={"/payment"}
                onClick={() => {
                  if (orderValue.payment_method !== null) {
                    sendOder(orderValue);
                  }
                }}
              >
                <button
                  className="success"
                  onClick={() => {
                    if (orderValue.payment_method === null) {
                      swal({
                        title: "Seçim etməmisiniz!",
                        icon: "error",
                        button: "Bağla",
                      });
                    }
                  }}
                >
                  Next
                </button>
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
      {settings.isLoading === false && <Map locations={locate} />}
    </main>
  );
};

export default Payment;
