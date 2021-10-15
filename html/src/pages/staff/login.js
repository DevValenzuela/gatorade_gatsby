import React from "react"
import Layout from "../../components/layout"
import LoginFormStaff from "../../components/drupal-oauth/LoginFormStaff";
import SEO from "../../components/seo";
const App = (props) => {
  return(
    <Layout>
        <SEO title="Login Staff" />
        <LoginFormStaff r="/staff/zone"/>
    </Layout>
  );
}
export default App
