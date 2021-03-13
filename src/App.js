import { useLayoutEffect } from "react";

// import header
import Header from "./components/header/header";

// import home
import Home from "./components/main/home/home";

// import footer
import Footer from "./components/footer/footer";

// import NewsDetail
import NewsDetail from "./components/main/newsDetail/newsDetail";

// import newsSelf
import NewsSelf from "./components/main/news/newsSelf";

// import Rules
import Register from "./components/main/register/register";

// import order
import Order from "./components/main/order/order";

// import order Complete
import OrderComplete from "./components/main/order/orderComplete";

// orderSuccess
import OrderCheck from "./components/main/order/orderCheck";
import OrderCheckCash from "./components/main/order/orderCheckCash";

// import location
import Location from "./components/main/location/location";

// signin
import SignIn from "./components/main/signIn/signIn";

// import login info
import LoginInfo from "./components/main/loginInformation/loginInformation";

// import login order
import LoginOrder from "./components/main/loginOrder/loginOrder";

// import login location
import LoginLocation from "./components/main/loginLocation/loginLocation";

// import payment
import Payment from "./components/main/payment/payment";

// import payment
import Delivery from "./components/main/delivery/delivery";

// contact
import Contact from "./components/main/contact/contact";

// password udpate

import PasswordUpdated from "./components/main/passwordUpdated/passwordUpdated";

// import static
import Static from "./components/main/static/static";

// services
import Services from "./components/main/services/services";

// react router dom

import { Switch, Route, useLocation } from "react-router-dom";

// hooks
import OpenMenu from "./components/hooks/openMobMenu";
import Resize from "./components/hooks/resize";
import CheckedPhoneInput from "./components/hooks/checkedPhoneInput";

// setToken

import { SetToken } from "./components/api/token";
import NotFound from "./components/main/404/404";

// seo helmet
import HelmetApp from "./components/helmet/helmet";


function App() {
  let { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  SetToken();

  return (
    <div className="App">
      <Resize />
      <Header />
      <OpenMenu />
      <HelmetApp />
      <Switch>
        {pathname.split("/")[1] !== "" &&
          pathname.split("/")[1] !== "blogs" &&
          pathname.split("/")[1] !== "index" &&
          pathname.split("/")[1] !== "contact" &&
          pathname.split("/")[1] !== "register" &&
          pathname.split("/")[1] !== "order" &&
          pathname.split("/")[1] !== "ordercomplete" &&
          pathname.split("/")[1] !== "location" &&
          pathname.split("/")[1] !== "passwordupdate" &&
          pathname.split("/")[1] !== "signin" &&
          pathname.split("/")[1] !== "logininformation" &&
          pathname.split("/")[1] !== "loginorder" &&
          pathname.split("/")[1] !== "loginlocation" &&
          pathname.split("/")[1] !== "delivery" &&
          pathname.split("/")[1] !== "payment" &&
          pathname.split("/")[1] !== "services" &&
          pathname.split("/")[1] !== "ordercheck" &&
          pathname.split("/")[1] !== "ordercheckcash" &&
          pathname.split("/")[1] !== "notfound" &&
           (
            <Route path="/*">
              <Static />
            </Route>
          )}
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/notfound">
          <NotFound />
        </Route>
        <Route exact path="/index">
          <Home />
        </Route>
        <Route exact path="/">
          <NotFound />
        </Route>
        <Route path="/blogs/:slug">
          <NewsDetail />
        </Route>
        <Route path="/blogs">
          <NewsSelf />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/order/:slug">
          <Order />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/ordercomplete">
          <OrderComplete />
        </Route>
        <Route path="/ordercheck">
          <OrderCheck />
        </Route>
        <Route path="/ordercheckcash">
          <OrderCheckCash />
        </Route>
        <Route path="/services">
          <Services />
        </Route>
        {window.localStorage.getItem("token") !== null ? (
          <Route path="/passwordupdate">
            <PasswordUpdated />
          </Route>
        ) : (
          <Route path="/passwordupdate">
            <SignIn />
          </Route>
        )}
        {window.localStorage.getItem("token") !== null ? (
          <Route path="/location">
            <Location />
          </Route>
        ) : (
          <Route path="/location">
            <SignIn />
          </Route>
        )}
        {window.localStorage.getItem("token") === null ? (
          <Route path="/signin">
            <SignIn />
          </Route>
        ) : (
          <Route path="/signin">
            <Home />
          </Route>
        )}

        {window.localStorage.getItem("token") !== null ? (
          <Route path="/logininformation">
            <LoginInfo />
          </Route>
        ) : (
          <Route path="/logininformation">
            <SignIn />
          </Route>
        )}
        {window.localStorage.getItem("token") !== null ? (
          <Route path="/loginorder">
            <LoginOrder />
          </Route>
        ) : (
          <Route path="/loginorder">
            <SignIn />
          </Route>
        )}
        {window.localStorage.getItem("token") !== null ? (
          <Route path="/loginlocation">
            <LoginLocation />
          </Route>
        ) : (
          <Route path="/loginlocation">
            <SignIn />
          </Route>
        )}
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/delivery">
          <Delivery />
        </Route>
      </Switch>
      <Footer />
      <CheckedPhoneInput />
    </div>
  );
}

export default App;
