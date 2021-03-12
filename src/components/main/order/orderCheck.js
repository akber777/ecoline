import React from "react";

// tools
// reactstrap
import { Container } from "reactstrap";

// react i18
import { useTranslation } from "react-i18next";

// react router rom
import { NavLink } from "react-router-dom";

const OrderCheck = (props) => {
  const { t } = useTranslation();

  return (
    <main className="orderSuccess">
      <Container>
        <h1 className="orderSuccess__title">{t("Sifarişiniz Alındı")}</h1>
        {
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
        }
        <div className="orderNavItem">
          <NavLink to={"/loginorder"}>{t("Sifarişlərim")}</NavLink>
        </div>
      </Container>
    </main>
  );
};

export default OrderCheck;
