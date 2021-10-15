import React from "react"
import SEO from "../seo"
import RecoveryPasswordForm from "../drupal-oauth/RecoveryPasswordForm";
class RecoveryPassword extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div>
        <SEO title="recover-password" />
        <div className="login recover-password">
            <div className="box-form box-form-rocovery">
              <RecoveryPasswordForm r="/user/login" />
            </div>
        </div>
      </div>
    )
  }
}
export default RecoveryPassword
