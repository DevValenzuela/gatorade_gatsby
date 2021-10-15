import React from "react"
import Seo from "../seo"
import { Link, navigate } from "gatsby"
const {GATSBY_DRUPAL_ROOT} = window.configParametre;

class ThanksRedemption extends React.Component {
  state = {
    uid: false,
    products: null,
    packs: {},
    user: {},
    total: 0
  }
  componentDidMount() {
    const token = this.props.drupalOauthClient.isLoggedIn();
    if (token !== undefined) {
      if (localStorage.getItem('redem') !== null) {
        localStorage.removeItem('redem');
      }
      if (localStorage.getItem("product-redemption") === null){
        navigate("/staff/zone")
      }
      fetch(`${GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': `${token.token_type} ${token.access_token}`
          })
        }).then(response => response.json())
        .then(json => {
          if (json.error === false) {
            this.setState({
              access: false
            })
          } else {
            let products = localStorage.getItem("product-redemption");
            this.setState({
              access: true,
              "products": JSON.parse(products)
            })
          }

        }).catch(error => console.log(error));
    }
  }

  render() {
    if (this.state.access) {
      let products = this.state.products;

    return (
    <div className="redemption">
      <Seo title="Thanks for you redemption" />
      <div className="redemption-component-fisrt">
        <div className="text-redemption">
          <div className="text-one">
            <h2>¡Es hora de hidratarte con la bebida Nº 1 de deportistas!</h2>
          </div>
          <div className="text-two">
            <h2>resumen de la redención</h2>
          </div>
          <div className="text-three">
            <h2 className="text-number">01</h2>
          </div>
          <div className="text-four">
            <div className="unit">
              <h2 className="number-units">Sabor:</h2>
              <h2 className="fruit">{products !== null ? products.title : ""}</h2>
            </div>
          </div>
          <div className="button-second">
            <Link to="/staff/zone">Finalizar</Link>
            </div>
        </div>
      </div>
    </div>
    )
    } else {
      return ('')
    }
  }
}

export default ThanksRedemption
