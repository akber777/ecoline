import React, { useLayoutEffect, useState } from "react";

// css

import "./css/_info.scss";

// tools

// react router dom
import { NavLink, useHistory } from "react-router-dom";

// reactstrap
import { Container, Input } from "reactstrap";

// component
import Map from "../map/map";

// query
import { useQuery, useMutation } from "react-query";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

// queries

import { user } from "../../queries/queries";

// swal
import swal from "sweetalert";

// react i18
import { useTranslation } from "react-i18next";

const LoginInformation = () => {
  let history = useHistory();

  let [refresh, setRefresh] = useState();

  let { t } = useTranslation();

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

  // user information

  const mutation = useMutation(
    (update) => axios.put(baseUrl + "user", update),
    {
      onSuccess: function (succ) {
        if (succ.status === 200) {
          swal({
            title: t("Profil Məlumatlarınız Yeniləndi"),
            icon: "success",
            button: "Bağla",
          });

          document
            .querySelector(".perloaderOrder")
            .classList.remove("showPerloader");
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(params));
        }
      },
      onError: function (err) {
        if (err) {
          document
            .querySelector(".perloaderOrder")
            .classList.remove("showPerloader");
        }
      },
    }
  );

  let [name, setName] = useState();
  let [surname, setSurname] = useState();
  let [phone, setPhone] = useState();
  let [email, setEmail] = useState();

  let params = {
    name: name,
    surname: surname,
    phone: phone,
    email: email,
  };

  let { data, isLoading } = useQuery(["user", "", mutation.data], user, {
    refetchOnWindowFocus: false,
    cacheTime:
      localStorage.getItem("token") && localStorage.getItem("user") === null
        ? 0
        : 5000,
  });

  if (localStorage.getItem("token") === null) {
    history.push({
      pathname: "/signin",
    });
  }

  useLayoutEffect(() => {
    if (data !== undefined) {
      setName(data.data.name);
      setSurname(data.data.surname);
      setPhone(data.data.phone);
      setEmail(data.data.email);
    }
  }, [data]);

  return (
    <main className="info">
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
          <h4 className="rules__title">{t("ONLİNE SİFARİŞ")}</h4>
        </Container>
      </div>
      <Container>
        <div className="info__top">
          <div className="info__topItem">
            <NavLink to={"/loginorder"}>{t("Sifarişlərim")}</NavLink>
            <NavLink to={"/loginlocation"}>{t("Ünvanlarım")}</NavLink>
            <NavLink to={"/logininformation"} className="activeMenu">
              {t("Məlumatlarım")}
            </NavLink>
            <NavLink to={"/passwordupdate"}>{t("Şifrəni yenilə")}</NavLink>
            <NavLink
              to={"/index"}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
            >
              {t("Çıxış")}
            </NavLink>
          </div>
        </div>
        <div className="info__content">
          <div className="formBox">
            <div className="formItem">
              <span>{t("Ad")}</span>
              {isLoading === false ? (
                <Input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 60,
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      right: 0,
                      width: 20,
                      height: 20,
                    }}
                    id="preloader"
                    aria-busy="true"
                    aria-label="Loading, please wait."
                    role="progressbar"
                  ></div>
                </div>
              )}
            </div>
            <div className="formItem">
              <span>{t("Soyad")}</span>
              {isLoading === false ? (
                <Input
                  value={surname}
                  onChange={(event) => {
                    setSurname(event.target.value);
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 60,
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      right: 0,
                      width: 20,
                      height: 20,
                    }}
                    id="preloader"
                    aria-busy="true"
                    aria-label="Loading, please wait."
                    role="progressbar"
                  ></div>
                </div>
              )}
            </div>
            <div className="formItem">
              <span>{t("Telefon")}</span>
              {isLoading === false ? (
                <Input
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 60,
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      right: 0,
                      width: 20,
                      height: 20,
                    }}
                    id="preloader"
                    aria-busy="true"
                    aria-label="Loading, please wait."
                    role="progressbar"
                  ></div>
                </div>
              )}
            </div>
            <div className="formItem">
              <span>{t("Email")}</span>
              {isLoading === false ? (
                <Input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 60,
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      right: 0,
                      width: 20,
                      height: 20,
                    }}
                    id="preloader"
                    aria-busy="true"
                    aria-label="Loading, please wait."
                    role="progressbar"
                  ></div>
                </div>
              )}
            </div>
            {/* <div className='formItem'>
                            <span>Dogum tarixi:</span>
                            <p>13/09/1997</p>
                        </div>
                        <div className='formItem'>
                            <span>Cinsiyyet:</span>
                            <p>Kişi</p>
                        </div> */}
          </div>
          <div className="login__sendBtn infoSend">
            <button
              onClick={() => {
                mutation.mutate(params);
                document
                  .querySelector(".perloaderOrder")
                  .classList.add("showPerloader");
              }}
            >
              {t("YADDA SAXLA")}
            </button>
          </div>
        </div>
      </Container>

      <div id="map">
        {settings.isLoading === false ? (
          <Map locations={locate} />
        ) : (
          <div
            style={{
              height: 300,
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
      </div>
    </main>
  );
};

export default LoginInformation;
