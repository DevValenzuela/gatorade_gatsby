import React from "react"
import UserInfo from "./Profile/UserInfo";
import SEO from "../seo"
import { navigate } from "gatsby";
const {GATSBY_DRUPAL_ROOT} = window.configParametre;
class Profile extends React.Component {
  state = {
    uid: false,
    products: {},
    packs: {},
    user: {},
    total: 0
  }
  componentDidMount() {
   const token = this.props.drupalOauthClient.isLoggedIn();
   if( token !== undefined) {
    fetch(`${GATSBY_DRUPAL_ROOT}/mp_transactions/getdatauser?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        if(!json.message){
          const products = json.data.purchased_products !== undefined ? json.data.purchased_products : {};

          const packs = json.data.packs !== undefined ? json.data.packs : {};
          const user = json.user !== undefined ? json.user : {};
          const total = json.data.total !== undefined ? json.data.total : 0;
          let nc = "";
          if(total > 0 ){
            nc = "open";
            localStorage.setItem('bottles-enable','open');
          }else{
            nc = "close";
            localStorage.setItem('bottles-enable', 'close');
          }
          if (document.querySelector(".link-my-account")  !==null && !document.querySelector(".link-my-account").classList.contains("open") && !document.querySelector(".link-my-account").classList.contains("close")) {
           document.querySelector(".link-my-account").classList.add(nc);
          }
          this.setState({
            user: user,
            products: products,
            packs: packs,
            total: total
          })
        }else{
          return false;
        }

      }).catch(error => console.log('error', error));
      this.setState({
        uid: token.dump
      })
   }

  }

  render() {
    const token = this.props.drupalOauthClient.isLoggedIn();
    if (token !== undefined) {
    return (
        <>
        <SEO title="Profile" />
        <UserInfo data={parseInt(this.state.uid)} products={this.state.products} packs={this.state.packs} user={this.state.user} total={this.state.total} />
        </>
    )
    }else{
      navigate('/user/login');
    }
  }
}

export default Profile
