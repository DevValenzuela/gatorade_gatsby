import React from 'react';
import QRCode from "qrcode.react"
import UpdateUserForm from "../../drupal-oauth/UpdateUserForm"
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from "gatsby"

import Logocarlos from "../../../images/bg-ultimate-qr.png";
import bgQr from "../../../images/bg-ultimate-qr.png";


const UserInfo = (props) => {
  let packs = props.packs;
  const usr = props.user;

  return (
    <div className="container-profile">
      <div className="principal-banner-qr">
        <div className="text-lateral">
          <h2 className="text-packs">mis packs</h2>
        </div>
        <div className="bg-image-qr">
          <div className="bg-qr">
            <img src={bgQr} alt="Background QR" title="background QR" />
          </div>
        </div>
        <div className="welcome">
          <h2><span className="text-welcome">Bienvenido</span></h2>
          <div className="container-name">
          <h3 className="welcome-name">{usr.field_name}</h3>
          <h3 className="welcome-lastname">{usr.field_lastname}</h3>
          </div>
        </div>
        <div className="welcome-qr">
          <QRCode value={usr.field_qr_code != null ? usr.field_qr_code : ''} className="d-flex" size={900} includeMargin bgColor="#FFFFFF" fgColor="#FB5030" level='H' />
        </div>
        <div className="description-qr">
          <div className="decription-title">
            <h2 className="number" > {props.total} </h2>
            <h2 className="bottle">botellas</h2>
          </div>
          {Object.keys(props.products !== undefined ? props.products : {}).map((step, k) => (
              <div className="decription-units" key={`u-${k}`}>
                <div className="unit">
                  <h2 className="text-rotate"></h2>
                  <h2 className="number-one">{props.products[step].product}</h2>
                  <h2 className="number-two">{props.products[step].quantity}</h2>
                  <h2 className="text-end">un</h2>
                </div>
              </div>
            ))}
        </div>
        {/* <div className="button-second">
          <a href="/user/buy" onClick={()=>{localStorage.removeItem('data-products');}}>recargar</a>
        </div> */}
        <div className="button-qr">
          <a href="#account-update-id"></a>
        </div>
      </div>
      <div className="account-update" id="account-update-id">
        <div className="text-buy">
          <h2 className="font-line-black">mi <span>cuenta</span></h2>
          {/* <h3>cuenta</h3> */}
        </div>
        <div className="container-update">
          <div className=""></div>
          <div className="image-bg-update">
            <StaticImage className="bg-update" src="../../../images/bg-update.png" objectFit="cover"
              quality={99} formats={["AUTO", "WEBP", "AVIF"]} alt="logo gatorade" />
          </div>
          <UpdateUserForm data={usr} />
        </div>
      </div>
      <div className="ultimate-component">
      {props.packs !== undefined ?
        <div className="text-buy">
          <h2 className="font-line-black">mis<span>compras</span></h2>
          {/* <h3>compras</h3> */}
        </div>
      : ''}

        {Object.keys(props.packs !== undefined ? props.packs : {}).map((step, k) => (
          <div className="container-ultimate" key={`p-${step}`}>
            <div className="background-image-ultimate">
              <div className="image-bg-ultimate">
                <img className="image-bg-ultimate" src={Logocarlos} alt="logo-gatorade" title="gatorade" />
              </div>
            </div>
            <div className="image-ultimate">
              <img className="camisa-buy"
                src={packs[step].pack_image}
                alt="Logo gatorade"
              />
            </div>
            <div className="description-ultimate">
              <div className="title" key={`u-${k}`}>
                <h5 className="text-rotate">{props.packs[step].pack_title_lateral}</h5>
                <h2 className="font-line-orange title-mobile">{props.packs[step].pack_total} botellas</h2>
                <h2 className="font-line-orange title-desktop">{props.packs[step].pack_title}</h2>
                <h2 className="third-text">pack</h2>
              </div>
              <div className="units">
                {
                  Object.keys(props.packs[step].products ? props.packs[step].products : {}).map((p, k) => {
                    return (
                      <div className="unit" key={`u-${k}`}>
                        <h2 className="taste">{props.packs[step].products[p].product}</h2>
                        <h2 className="amount">{props.packs[step].products[p].quantity} unidades</h2>
                      </div>
                    )
                  })}
              </div>
                {!props.packs[step].gift_pack ?
              <div className="button-nine">
                <Link
                  to={`/user/buy/${props.packs[step].pack_buy}`}
                  onClick={()=>{localStorage.setItem('data-products', JSON.stringify(props.packs[step].products));}}
                  style={{
                    textDecoration: `none`,
                  }}
                >
                  Recargar
              </Link>
              </div>
                : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserInfo;
