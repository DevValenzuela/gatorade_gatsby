import React from "react"
import SEO from "../seo"
import { navigate } from 'gatsby';
import Redemption from "./Redemption";
const {GATSBY_DRUPAL_ROOT} = window.configParametre;

class PointSaleRedemption extends React.Component {
  state = {
    redem : '',
    access: false
  }
  componentDidMount(){
    const token = this.props.drupalOauthClient.isLoggedIn();
   if (token !== undefined) {
     if(localStorage.getItem("redem")=== null){
        navigate("/staff/zone");
     }
     fetch(`${GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': `${token.token_type} ${token.access_token}`
          })
        }).then(response => response.json())
        .then(json => {
          if(json.error === false){
            this.setState({access: false})
            // navigate('/user/profile')
          }else{
            this.setState({access: true})
          }
        }).catch(error => console.log(error));
    fetch(`${GATSBY_DRUPAL_ROOT}/mp_transactions/getdatauser?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        if(!json.message){
          const products = json.data.purchased_products !== undefined ? json.data.purchased_products : {};
          this.setState({
            products: products,
            'redem': localStorage.getItem('redem')
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
  render(){
    if(this.state.access){
      return(
        <>
        <SEO title="buy" />
        <div className="zone container-fluid">
          <div className="row">
            <Redemption redem={this.state.redem}/>
          </div>
        </div>
        </>);
    }else{
      return ('')
    }
  }

}

export default PointSaleRedemption
