import React from "react"
import SEO from "../seo"
import ChangePasswordForm from "../drupal-oauth/ChangePasswordForm";
class ChangePassword extends React.Component {
  state = {
    username: ``,
    password: ``,
  }
  componentDidMount() {
      const token = undefined;
      const params = new URLSearchParams(this.props.location.search);
      const recovery = params.get("recovery");
      this.setState({"recovery": recovery});
  }
  render() {
    return (
      <div>
        <SEO title="recover-password" />
        <div className="login recover-password">
            <div className="box-form">
              <ChangePasswordForm r="/user/login" recovery={this.state.recovery}/>
            </div>
        </div>
      </div>
    )
  }
}
export default ChangePassword
