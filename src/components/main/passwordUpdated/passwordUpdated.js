import React from "react";

// scss
import "./css/_passwordUpdated.scss";

// component

import MapContainer from "../map/map";

// tools

// ract router dom
import { NavLink } from "react-router-dom";

// reactstrap
import { Container, Input } from "reactstrap";

// query
import { useQuery } from "react-query";

// baseUrl
import { baseUrl } from "../../api/api";

// axios
import axios from "axios";

// react i18
import { useTranslation } from "react-i18next";

const PasswordUpdated = () => {
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

  return (
    <main className="passwordUpdated info">
      <div className="rules__banner">
        <img src={require("../../images/rules.png").default} alt="" />
        <Container>
          <h4 className="rules__title">{t("Şifrəni yenilə")}</h4>
        </Container>
      </div>
      <Container>
        <div className="info__top">
          <div className="info__topItem">
            <NavLink to={"/loginorder"}>{t("Sifarişlərim")}</NavLink>
            <NavLink to={"/loginlocation"}>{t("Ünvanlarım")}</NavLink>
            <NavLink to={"/logininformation"}>{t("Məlumatlarım")}</NavLink>
            <NavLink to={"/passwordupdate"} className="activeMenu">{t("Şifrəni yenilə")}</NavLink>
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
        <div className="fomrPassword">
          <h4>{t('ŞİFRƏ')}</h4>
          <form>
            <div className="formItem formPass">
              <span>{t("HAZIRKİ ŞİFRƏ")}:</span>
              <Input type="password" />
            </div>
            <div className="formItem formPass">
              <span>{t("YENİ ŞİFRƏ")}:</span>
              <Input type="password" />
            </div>
            <div className="formItem formPass">
              <span>{t("YENİ ŞİFRƏ TƏKRAR")}:</span>
              <Input type="password" />
            </div>
          </form>
          <div className="login__sendBtn infoSend">
            <button>{t("YADDA SAXLA")}</button>
          </div>
        </div>
      </Container>
      <div id="map">
        {settings.isLoading === false && <MapContainer locations={locate} />}
      </div>
    </main>
  );
};

export default PasswordUpdated;
