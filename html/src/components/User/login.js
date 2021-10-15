import React from "react"
import LoginForm from "../drupal-oauth/LoginForm";
import SEO from "../seo"
class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div>
        <SEO title="Recovery Password" />
        <div className="login">
            <div className="box-form">
              <LoginForm r="/user/profile" />
            </div>
        </div>
      </div>
    )
  }
}
export default Login
