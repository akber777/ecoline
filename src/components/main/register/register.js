import React, { useLayoutEffect, useState } from "react";

// css

import "./css/_login.scss";

// tools

// rectstrap
import { Container, Input } from "reactstrap";

// components
import WhyUs from "../whyUs/whyUs";
import News from "../news/news";
import Map from "../map/map";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

// ract router dom
import { NavLink, useHistory } from "react-router-dom";

// react query
import { useMutation } from "react-query";

// axios
import axios from "axios";

// apis

import { registerApi } from "../../api/api";

// token
import { error } from "../../atoms/atoms";

// recoil
import { useRecoilValue } from "recoil";

// sweet alert
import swal from "sweetalert";

// react i18
import { useTranslation } from "react-i18next";

const mapLocate = [[41.015137, 28.97953]];

const Login = () => {
  const { t } = useTranslation();

  let [name, setName] = useState();
  let [surname, setSurname] = useState();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  let [password, setPassword] = useState();
  let [passwordRepeat, setPasswordRepeat] = useState();

  let isValid = true;

  let history = useHistory();

  let params = {
    name: name,
    phone: phone,
    surname: surname,
    email: email,
    password: password,
    password_confirmation: passwordRepeat,
  };

  const err = useRecoilValue(error);

  // // register
  const mutation = useMutation((regi) => axios.post(registerApi, regi), {
    onSuccess: function (token) {
      document
        .querySelector(".perloaderOrder")
        .classList.remove("showPerloader");
      window.localStorage.setItem("token", JSON.stringify(token.data.token));

      window.localStorage.setItem("user", JSON.stringify(token.data.user));

      history.push({
        pathname: "/logininformation",
      });
    },
  });

  useLayoutEffect(() => {
    if (err !== null && mutation.isError === true) {
      swal({
        title: err.response.data.error,
        icon: "error",
        button: "Bağla",
      });
    }
  }, [mutation.isError]);

  return (
    <main className="rules login">
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
          <h4 className="rules__title">{t("Daxil ol")}</h4>
        </Container>
      </div>
      <div className="rules__content login__content">
        <Container>
          <h4>{t("QEYDİYYATDAN KEÇ VƏ YA DAXİL OL")}</h4>
          <div className="login__info">
            {/* <div className='login__social'>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                Log in Email
                            </a>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faFacebookF} />
                                Connect to facebook
                            </a>
                        </div> */}
            <div className="login__info">
              <h4>{t("XÜSUSİ QEYDİYYAT")}</h4>
              <div className="login__formBox">
                <Input
                  placeholder={t("AD")}
                  type="text"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <p className="alertLogin">Ad Daxil Edin</p>
                <Input
                  placeholder={t("SOYAD")}
                  type="text"
                  onChange={(event) => {
                    setSurname(event.target.value);
                  }}
                />
                <p className="alertLogin">{t("Soyad Daxil Edin")}</p>
                <Input
                  placeholder={t("Telefon")}
                  type="text"
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <p className="alertLogin">
                  {t("Telefon Nömrənizi Daxil Edin")}
                </p>
                <Input
                  placeholder={t("EMAIL")}
                  type="text"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <p className="alertLogin">{t("Emaili Daxil Edin")}</p>
                <Input
                  placeholder={t("ŞİFRƏ")}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <p className="alertLogin">{t("Şifrə Daxil Edin")}</p>
                <Input
                  placeholder={t("ŞİFRƏ TƏKRAR")}
                  type="password"
                  onChange={(event) => {
                    setPasswordRepeat(event.target.value);
                  }}
                />
                <p className="alertLogin">{t("Şifrəni Təkrar Daxil Edin")}</p>
              </div>
              <div className="login__formBoxEnd">
                {/* <NavLink to={''}>
                                    ŞİFRƏMİ UNUTDUM
                                </NavLink> */}
                <NavLink to={"/signin"}>{t("DAXİL OL")}</NavLink>
              </div>
              <div className="login__sendBtn">
                <button
                  onClick={() => {
                    document
                      .querySelectorAll(".login__formBox input")
                      .forEach((item) => {
                        if (item.value !== "") {
                          item.nextElementSibling.style.display = "none";
                          item.nextElementSibling.classList.remove(
                            "framesAlert"
                          );
                        } else {
                          item.nextElementSibling.style.display = "block";
                          item.nextElementSibling.classList.remove(
                            "framesAlert"
                          );

                          setTimeout(() => {
                            item.nextElementSibling.classList.add(
                              "framesAlert"
                            );
                          }, 100);

                          isValid = false;
                        }
                      });

                    if (isValid === true) {
                      mutation.mutate(params);
                      document
                        .querySelector(".perloaderOrder")
                        .classList.add("showPerloader");
                    }
                  }}
                >
                  {t("Qeydiyyat")}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <WhyUs />
      <News />
      <div id="map">
        <Map locations={mapLocate} />
      </div>
    </main>
  );
};

export default Login;
