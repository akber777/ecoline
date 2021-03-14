import React, { useLayoutEffect } from "react";

// tools
// reactstrap
import { CardBody, Container } from "reactstrap";

// react i18
import { useTranslation } from "react-i18next";

// react router rom
import { NavLink, useHistory, useLocation } from "react-router-dom";

// atoms
import { order, orderstatus } from "../../atoms/atoms";

// recoil
import { useRecoilValue } from "recoil";

const OrderCheckCash = (props) => {
  const { t } = useTranslation();

  const history = useHistory();

  const orderStatusValue = useRecoilValue(orderstatus);

  window.addEventListener("load", function (e) {
    if (orderStatusValue === null) {
      history.push({
        pathname: "/",
      });

      localStorage.removeItem("total");
      localStorage.removeItem("items");
      localStorage.removeItem("ordernotes");
    }
  });

  return (
    <main className="orderSuccess">
      <Container>
        {orderStatusValue === 200 && (
          <h1 className="orderSuccess__title">{t("Sifarişiniz Alındı")}</h1>
        )}

        {orderStatusValue === 200 && (
          <div className="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        )}

        <div className="orderNavItem">
          <NavLink to={"/loginorder"}>{t("Sifarişlərim")}</NavLink>
        </div>
      </Container>
    </main>
  );
};

export default OrderCheckCash;
