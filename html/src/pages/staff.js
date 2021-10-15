import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PointSale from "../components/Staff/point-sale"

import PrivateRoute from "../components/Utils/PrivateRoute"
import PointSaleRedemption from "../components/Staff/point-sale-redemption";
import LoginPoint from "../components/Staff/login-point";
import ThanksRedemption from "../components/Staff/thanksRedemption";
const App = (props) => {
  console.log(props)
  return(
    <Layout>
      <Router basepath = "/co/qr/staff">
        <LoginPoint exact path="/login" />
        <PrivateRoute exact path="/zone" component={PointSale} />
        <PrivateRoute exact path="/zone/redemption" component={PointSaleRedemption} />
        <PrivateRoute exact path="/zone/complete" component={ThanksRedemption} />
        {/* <PrivateRoute path="/user/*" component={Profile} /> */}
      </Router>
    </Layout>
    );

}
export default App
