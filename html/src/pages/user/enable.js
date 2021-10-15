import React from "react"
import Layout from "../../components/layout"
import AccountEnable from '../../components/User/account-enable';

const App = (props, {id}) => {
  return(
    <Layout>
      <AccountEnable />
    </Layout>
  );
}
export default App
