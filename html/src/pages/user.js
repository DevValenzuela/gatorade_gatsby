import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/User/profile"
import Login from "../components/User/login"
import Register from "../components/User/Register"
import Buy from "../components/User/buy"
import PrivateRoute from "../components/Utils/PrivateRoute"
import Thanks from "../components/User/thanks";
import AccountEnable from "../components/User/account-enable";
import RecoveryPassword from "../components/User/recovery-password";
import ChangePassword from "../components/User/change-password";
const App = (props) => {
  return(
    <Layout>
      < Router basepath = "/co/qr/user" >
        <PrivateRoute exact path="/profile/" component={Profile} />
        <PrivateRoute exact path="/buy" component={Buy} />
        <PrivateRoute exact path="/buy/:id" component={Buy}/>
        <PrivateRoute exact path="/thanks/:id" component={Thanks}/>
        <Login exact path="/login" />
        <RecoveryPassword exact path = "/recovery" />
        <ChangePassword exact path = "/recovery/change-password" component={ChangePassword}/>
        <Register exact path="/register" component={Register} />
        <AccountEnable exact path="/enable" component={AccountEnable} />
        {/* <PrivateRoute path="/:id"/> */}
      </Router>
    </Layout>
    );

}
export default App
