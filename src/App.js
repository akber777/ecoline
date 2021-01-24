
import { useLayoutEffect } from 'react';

// import header
import Header from './components/header/header';

// import home
import Home from './components/main/home/home';

// import footer
import Footer from './components/footer/footer';

// import NewsDetail
import NewsDetail from './components/main/newsDetail/newsDetail';

// import newsSelf
import NewsSelf from './components/main/news/newsSelf';

// import Rules
import Login from './components/main/login/login';

// import order
import Order from './components/main/order/order';

// import order Complete
import OrderComplete from './components/main/order/orderComplete';

// import location
import Location from './components/main/location/location';



// import login info
import LoginInfo from './components/main/loginInformation/loginInformation';

// import login order
import LoginOrder from './components/main/loginOrder/loginOrder';

// import login location
import LoginLocation from './components/main/loginLocation/loginLocation';

// import payment
import Payment from './components/main/payment/payment';


// import payment
import Delivery from './components/main/delivery/delivery';



// import static
import Static from './components/main/static/static';

// react router dom

import { Switch, Route, useLocation } from 'react-router-dom';

// hooks
import OpenMenu from './components/hooks/openMobMenu';
import Resize from './components/hooks/resize';


function App() {

  let { pathname } = useLocation();

  useLayoutEffect(() => {

    window.scrollTo({
      top: 0
    })

  }, [pathname])

  return (
    <div className="App">
      <Resize />
      <Header />
      <OpenMenu />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/blogs/:slug'>
          <NewsDetail />
        </Route>
        <Route path='/blogs'>
          <NewsSelf />
        </Route>
        <Route path='/static'>
          <Static />
        </Route>
        <Route path='/rules'>
          <Static />
        </Route>
        <Route path='/aboutus'>
          <Static />
        </Route>
        <Route path='/services'>
          <Static />
        </Route>
        <Route path='/price'>
          <Static />
        </Route>
        <Route path='/contact'>
          <Static />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/order/:slug'>
          <Order />
        </Route>
        <Route path='/order'>
          <Order />
        </Route>
        <Route path='/ordercomplete'>
          <OrderComplete />
        </Route>
        <Route path='/location'>
          <Location />
        </Route>
        <Route path='/logininformation'>
          <LoginInfo />
        </Route>
        <Route path='/loginorder'>
          <LoginOrder />
        </Route>
        <Route path='/loginlocation'>
          <LoginLocation />
        </Route>
        <Route path='/payment'>
          <Payment />
        </Route>
        <Route path='/delivery'>
          <Delivery />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
