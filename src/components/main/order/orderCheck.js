import React from "react";

// tools
// reactstrap
import { Container } from "reactstrap";

// react i18
import { useTranslation } from "react-i18next";

// react router rom
import { NavLink } from "react-router-dom";

// atoms
import { orderstatus } from "../../atoms/atoms";

// recoil
import { useRecoilValue } from "recoil";

const OrderCheck = (props) => {
  const { t } = useTranslation();

  const orderStatusValue = useRecoilValue(orderstatus);


  return (
    <main className="orderSuccess">
      <Container>
        <h1 className="orderSuccess__title">{t("Sifarişiniz Alındı")}</h1>
        {orderStatusValue === 200 ? (
          <div class="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        ) : (
          <div className="ui-error">
            <svg viewBox="0 0 87 87" version="1.1">
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                  <circle
                    id="Oval-2"
                    stroke="rgba(252, 191, 191, .5)"
                    strokeWidth="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <circle
                    className="ui-error-circle"
                    stroke="#F74444"
                    strokeWidth="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <path
                    className="ui-error-line1"
                    d="M22.244224,22 L60.4279902,60.1837662"
                    id="Line"
                    stroke="#F74444"
                    strokeWidth="3"
                    strokeLinecap="square"
                  ></path>
                  <path
                    className="ui-error-line2"
                    d="M60.755776,21 L23.244224,59.8443492"
                    id="Line"
                    stroke="#F74444"
                    strokeWidth="3"
                    strokeLinecap="square"
                  ></path>
                </g>
              </g>
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

export default OrderCheck;
