import React, { useLayoutEffect, useRef, useState } from "react";

// rectstrap
import { Col, Container, Row, Input } from "reactstrap";

// map
import Map from "../map/map";
import { NavLink, useHistory } from "react-router-dom";

// recoil
import { useRecoilState } from "recoil";

// atoms
import { basket, order, orderTotal } from "../../atoms/atoms";

// query
import { useQuery, useMutation } from "react-query";

// baseUrl
import { baseUrl, loginApi } from "../../api/api";

// axios
import axios from "axios";

// helper
import { decimalAdjust } from "../../helper/helper";

// sweet alert
import swal from "sweetalert";

// i18next
import { useTranslation } from "react-i18next";

// jquery
import $ from 'jquery';

const OrderComplete = () => {
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

  const minAmount =
    settings.isLoading === false && settings.data.data.min_amount;

  let [product, setProduct] = useState([]);

  let [myBasket, setMyBasket] = useRecoilState(basket);

  let [allOrderTotal, setAllOrderTotal] = useRecoilState(orderTotal);

  let [allOder, setOrder] = useRecoilState(order);

  let [total] = useState([]);

  // determinet  basket value

  let history = useHistory();

  if (JSON.parse(localStorage.getItem("items")) !== null) {
    product = JSON.parse(JSON.stringify(myBasket));
    total = JSON.parse(allOrderTotal);
  }

  function sendMinus(value, event) {
    const endRes = product.filter((id) => id.id === value.id);

    if (endRes[0] !== undefined) {
      if (endRes[0].count > 0) {
        endRes[0].count--;
        localStorage.setItem(
          "items",
          JSON.stringify(product.filter((count) => count.count > 0))
        );
        event.target.nextElementSibling.nextElementSibling.style.display =
          "block";
        event.target.nextElementSibling.nextElementSibling.textContent =
          endRes[0].count;

        setMyBasket(JSON.parse(localStorage.getItem("items")));

        const index = total.indexOf(Number(value.price));
        if (index > -1) {
          total.splice(index, 1);
          window.localStorage.setItem("total", JSON.stringify(total));

          setAllOrderTotal(JSON.stringify(total));

          setOrder({
            address_id: null,
            payment_method: null,
            amount: total.length !== 0 ? total.reduce(reducer) : null,
            is_exspress: null,
            items: JSON.parse(localStorage.getItem("items")),
          });
        }

        event.target.parentNode.parentNode.children[3].children[1].textContent =
          endRes[0].count * Number(endRes[0].price);
      }
    }
  }

  function sendPlus(value, event) {
    const res = product.some((id) => id.id === value.id);

    if (res === false) {
      product.push(value);

      const endFinish = product.filter((id) => id.id === value.id);

      localStorage.setItem("items", JSON.stringify(product));
      setMyBasket(JSON.parse(localStorage.getItem("items")));

      if (endFinish !== 0) {
        event.target.nextElementSibling.style.display = "block";
        event.target.nextElementSibling.textContent = endFinish[0].count;
      }
    } else {
      const endRes = product.filter((id) => id.id === value.id);
      endRes[0].count++;
      localStorage.setItem("items", JSON.stringify(product));
      setMyBasket(JSON.parse(localStorage.getItem("items")));
      event.target.parentNode.parentNode.children[3].children[1].textContent =
        endRes[0].count * Number(endRes[0].price);

      if (endRes !== 0) {
        event.target.nextElementSibling.style.display = "block";
        event.target.nextElementSibling.textContent = endRes[0].count;
      }
    }

    total.push(Number(value.price));
    window.localStorage.setItem("total", JSON.stringify(total));
    setAllOrderTotal(JSON.stringify(total));

    setOrder({
      address_id: null,
      payment_method: null,
      amount: total.reduce(reducer),
      is_exspress: null,
      items: JSON.parse(localStorage.getItem("items")),
    });
  }

  const round10 = (value, exp) => decimalAdjust("round", value, exp);

  const reducer = (accumulator, currentValue) =>
    round10(accumulator + currentValue, -1);

  let mathEmp = [];

  useLayoutEffect(() => {
    if (total.length === 0) {
      history.push({
        pathname: "/order",
      });
    }
  });

  // checked token
  let loginPopup = useRef();

  // function checkedToken() {
  //   if (
  //     localStorage.getItem("token") !== null &&
  //     localStorage.getItem("user") !== null &&
  //     localStorage.getItem("total") !== ""
  //   ) {
  //     return "/location";
  //   } else {
  //     return "/ordercomplete";
  //   }
  // }

  function checkedAmount() {
    document.querySelector(".openUpdatedPopup").style.display = "none";

    if (total.reduce(reducer) < minAmount) {
      swal({
        title: t("Sifariş Məbləği 30 Azn -dan az ola bilməz"),
        icon: "error",
        button: "Bağla",
      });
    }

    return "/ordercomplete";
  }

  function nextPageButton() {
    if (loginPopup.current !== undefined) {
      loginPopup.current.style.display = "block";
    }

    if (JSON.stringify(myBasket) !== localStorage.getItem("items")) {
      window.location.reload();
    }
  }

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let params = {
    email: email,
    password: password,
  };

  // register
  const mutation = useMutation((regi) => axios.post(loginApi, params), {
    onSuccess: (login) => {
      window.localStorage.setItem("user", JSON.stringify(login.data.user));
      window.localStorage.setItem("token", JSON.stringify(login.data.token));

      if (login.status === 200) {
        history.push({
          pathname: "/ordercomplete",
        });

        document.querySelector(".openUpdatedPopup").style.display = "none";
      }
    },
    onError: (error) => {
      history.push({
        pathname: "/ordercomplete",
      });

      document.querySelector(".loginAlertBox").style.display = "block";
    },
  });


  useLayoutEffect(() => {
    $(".oder__content nav").css({
      position: "sticky",
      top: 20,
      zIndex: 5555,
    });

    $(".order__result ").css({
      position: "sticky",
      bottom: 0,
      zIndex: 5555,
      backgroundColor: "#fff",
      padding: 15,
    });
  }, []);

  return (
    <main className="complete loginLocation">
      <div className="checkedLoginPopup info__content">
        <div className="infoPopup openUpdatedPopup" ref={loginPopup}>
          <div className="info__WrapperModal">
            <button
              className="closeModal"
              onClick={(event) => {
                document.querySelector(".openUpdatedPopup").style.display =
                  "none";
              }}
            >
              x
            </button>
            <div className="complete__popupItems">
              <div className="login__info">
                <h4 className="complete__popupItems--title">{t('Daxil ol')}</h4>
                <div className="login__formBox">
                  <Input
                    placeholder="EMAIL"
                    type="text"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <Input
                    placeholder="ŞİFRƏ"
                    type="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <p className="loginAlertBox">
                   {t('Parol və login məlumatları səhvdir')}
                  </p>
                </div>
                <div className="login__formBoxEnd">
                  {/* <NavLink to={''}>
                                    ŞİFRƏMİ UNUTDUM
                                </NavLink> */}
                  <NavLink to={"/register"}>{t('QEYDİYYATDAN KEÇ')}</NavLink>
                </div>
                <div className="login__sendBtn">
                  <button
                    onClick={() => {
                      mutation.mutate(params);
                    }}
                  >
                   {t('Daxil ol')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">{t('ONLİNE SİFARİŞ')}</h4>
        </Container>
      </div>
      <Container>
        <div className="order__breadCrumbs">
          <span>{t('ORDER')}</span>
          <span className="activCrumbs">{t('Sifarişlərim')}</span>
        </div>
        <div className="oder__content home__priceBox">
          <Row>
            {JSON.parse(window.localStorage.getItem("items")) !== null &&
              JSON.parse(window.localStorage.getItem("items")).map((pro) => (
                <Col xs="4" lg="2" key={pro.id}>
                  <div className="order__itemBox">
                    <div className="order__itemBox--img">
                      <img
                        src={
                          pro.img !== null && pro.img.length !== 0
                            ? pro.img
                            : ""
                        }
                        alt=""
                      />
                      <button
                        className="minus"
                        data-id={pro.id}
                        onClick={(event) => {
                          sendMinus(
                            {
                              id: pro.id,
                              name: pro.name,
                              app_name: pro.app_name,
                              price: pro.price,
                              img: pro.img,
                              count: 0,
                            },
                            event
                          );
                        }}
                      >
                        -
                      </button>
                      <button
                        className="plus"
                        data-id={pro.id}
                        onClick={(event) => {
                          sendPlus(
                            {
                              id: pro.id,
                              price: pro.price,
                              app_name: pro.app_name,
                              name: pro.name,
                              img: pro.img.cover,
                              count: 1,
                            },
                            event
                          );
                        }}
                      >
                        +
                      </button>
                      <div
                        className="show"
                        style={{
                          display:
                            product.filter((id) => id.id === pro.id).length !==
                            0
                              ? "block"
                              : "none",
                        }}
                      >
                        {product.filter((id) => id.id === pro.id).length !== 0
                          ? product.filter((id) => id.id === pro.id)[0].count
                          : ""}
                      </div>
                    </div>
                    <strong>{pro.name}</strong>
                    <span>{pro.category}</span>
                    <div className="flex">
                      <p className="priceBtn">
                        <span style={{ width: 100 + "%" }}>{pro.price}</span>
                        {/* <i>
                            13%
                        </i> */}
                      </p>
                      <p className="setCount">
                        {round10(
                          pro.price *
                            Number(
                              product.filter((id) => id.id === pro.id)[0].count
                            ),
                          -2
                        ) + " AZN"}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
          <Row>
            <div className="order__noteBox">
              <h4>{t("Qeyd")}</h4>
              <textarea
                className="order__note"
                onKeyUp={(event) => {
                  localStorage.setItem("ordernotes", event.target.value);
                }}
                onChange={(event) => {
                  localStorage.setItem("ordernotes", event.target.value);
                }}
              ></textarea>
            </div>
          </Row>
        </div>
      </Container>
      <div className="order__result">
          <p>
            {t('ÜMUMİ MƏBLƏĞ')}:
            <span className="res">
              {total.length !== 0 && total.reduce(reducer) + " AZN"}
            </span>
          </p>
          <div className="btnBoxs">
            <NavLink to={"/order"}>
              <button className="success">{t('Geri')}</button>
            </NavLink>
            <NavLink
              to={
                total.length !== 0 && total.reduce(reducer) >= minAmount
                  ? "/location"
                  : "/ordercomplete"
              }
              onClick={() => {
                nextPageButton();
                checkedAmount();
              }}
            >
              <button className="success">{t("İrəli")}</button>
            </NavLink>
          </div>
        </div>
      {/* <div id="map">
        {settings.isLoading === false && <Map locations={locate} />}
      </div> */}
    </main>
  );
};

export default OrderComplete;
