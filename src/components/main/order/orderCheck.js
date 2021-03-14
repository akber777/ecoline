import React, { useLayoutEffect } from "react";

// tools
// reactstrap
import { Container } from "reactstrap";

// react i18
import { useTranslation } from "react-i18next";

// react router rom
import { NavLink, useHistory, useLocation } from "react-router-dom";

// atoms
import { order, orderstatus } from "../../atoms/atoms";

// recoil
import { useRecoilValue } from "recoil";

// query
import { useQuery } from "react-query";

// baseUrl
import { azerTurkReturn } from "../../api/api";

// axios
import axios from "axios";

const OrderCheck = (props) => {
  const { t } = useTranslation();

  const orderStatusValue = useRecoilValue(orderstatus);

  const history = useHistory();

  const { pathname } = useLocation();

  function useQueryData() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQueryData();

  let params = {
    orderId: query.get("orderId"),
  };

  const { data, isLoading } = useQuery(
    ["orderstatus", ""],
    async () => {
      const res = axios.get(azerTurkReturn, {
        params: params,
      });

      return (await res).data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: function (succ) {
        if (succ.status === 200) {
          localStorage.removeItem("total");
          localStorage.removeItem("items");
          localStorage.removeItem("ordernotes");
        }
      },
    }
  );

  return (
    <main className="orderSuccess">
      <Container>
        {isLoading === false && data.status === 200 && (
          <h1 className="orderSuccess__title">{t("Sifarişiniz Alındı")}</h1>
        )}
        {isLoading === false && data.status === 400 && (
          <h1 className="orderSuccess__title">{data.ErrorMessage}</h1>
        )}

        {isLoading === false && data.status === 200 && (
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

        {isLoading === false && data.status === 400 && (
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
