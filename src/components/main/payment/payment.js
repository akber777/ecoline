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
import $, { data } from "jquery";

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

// react i18 next
import { useTranslation } from "react-i18next";

const Payment = () => {
  const { t } = useTranslation();

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

  let sendOrder = async (params) => {
    const res = axios.post(baseUrl + "order/create", params);

    document.querySelector('.perloaderOrder').classList.add('showPerloader');

    if (data !== undefined) {
      if ((await res).data.status === 200) {
        document.querySelector('.perloaderOrder').classList.remove('showPerloader');

        history.push({
          pathname: "/ordercheckcash",
        });

        localStorage.removeItem("total");
        localStorage.removeItem("items");
        localStorage.removeItem("ordernotes");

        setOrderCheck((await res).data.status);
        
      } else if ((await res).data.status === 302) {
        window.location.href = (await res).data.url;
      }
    } else {
      history.push({
        pathname: "/signin",
      });
    }

    return res.data;
  };

  return (
    <main className="location payment">
      <div className="perloaderOrder">
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
      </div>
      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">{t('ONLİNE SİFARİŞ')}</h4>
        </Container>
      </div>
      <div className="locationWrapper">
        <div className="order__breadCrumbs">
        <span>{t("SİFARİŞ")}</span>
            <span>{t("Sifarişlərim")}</span>
            <span >{t("ÜNVAN SEÇ")}</span>
          <span className="activCrumbs">{t('ÖDƏNİŞ ET')}</span>
        </div>
        <Container>
          <div className="payment__content">
            <div className="location__content">
              <div className="location__contentLeft">
                <p>{t('Qapida Ödəniş')}</p>
              </div>
              <div className="location__contentRight">
                <span className="changeInfo" data-id={2}>
                  {t('SEÇ')}
                  <input name="address_id" type="radio" />
                </span>
                <i style={{ opacity: 0 }} className="checkedI">
                  <FontAwesomeIcon icon={faCheck} />
                </i>
              </div>
            </div>
            <div className="location__content">
              <div className="location__contentLeft">
                <p>{t('Online Ödəniş')}</p>
              </div>
              <div className="location__contentRight">
                <span className="changeInfo" data-id={1}>
                  {t('SEÇ')}
                  <input name="payment_id" type="radio" />
                </span>
                <i style={{ opacity: 0 }} className="checkedI">
                  <FontAwesomeIcon icon={faCheck} />
                </i>
              </div>
            </div>
          </div>
          <div className="order__result noBoxShadow">
            <p>
              {t('ÜMUMİ MƏBLƏĞ')}:
              <span className="res">
                {JSON.parse(localStorage.getItem("total")) !== null &&
                  JSON.parse(localStorage.getItem("total")).reduce(reducer) +
                    " AZN"}
              </span>
            </p>
            <div className="btnBoxs" style={{ marginTop: 15 }}>
              <NavLink to={"/location"}>
                <button className="success">{t('Geri')}</button>
              </NavLink>
              <NavLink
                to={"/payment"}
                onClick={() => {
                  if (orderValue.payment_method !== null) {
                    sendOrder(orderValue);
                  }
                }}
              >
                <button
                  className="success"
                  onClick={() => {
                    if (orderValue.payment_method === null) {
                      swal({
                        title: t("Seçim etməmisiniz!"),
                        icon: "error",
                        button: t('Bağla'),
                      });
                    }
                  }}
                >
                  {
                    t('İrəli')
                  }
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
