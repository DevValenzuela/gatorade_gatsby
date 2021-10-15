import React from "react"
import SEO from "../seo"
import GatoradeOne from "../../images/gatorade-red.png";
import BuyFunctions from './buyFunction';
class Buy extends React.Component {

  render(){
  return(
    <div className="container-fluid buy">
      <SEO title="Compras" />
      <div className="row">
        <div className="col-12 col-lg-6 left-side">
          <div className="text-title"><h2><span>tu </span>orden</h2></div>
          <div className="image-gatorade">
            <img src={GatoradeOne} alt="gatorade" title="gatorade" />
          </div>
        </div>
        <div className="col-12 col-lg-6 container-texts">
          <BuyFunctions pid={this.props.id !== undefined ? this.props.id : 0 }/>
        </div>
      </div>
    </div>
    );
  }
}

export default Buy

