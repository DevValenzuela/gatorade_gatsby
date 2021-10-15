import React, { useState} from 'react';
import withDrupalOauthConsumer from '../../drupal-oauth/withDrupalOauthConsumer';
import styled from "styled-components";
import LogoutLink from '../LogoutLink/LogoutLink';
import Footer from '../footer';
function NavigationMobile(props) {
  const [nav, showNav] = useState(false)
  return (
    <>
  <MenuIcon className="menu-icon" id="menu"  nav={nav} onClick={() => {showNav(!nav); document.getElementById('___gatsby').classList.toggle('heightvh')}}>
  <div />
  <div />
  <div />
  </MenuIcon>
  <MenuLinks className="menu-links" id="menu-links-1" nav={nav}>
  <ul>
    <li>
      <a href="/co/qr">Inicio</a>
    </li>
    <li>
      <a href={`${props.base}/#secundary-slider`}  onClick={() => {showNav(!nav); document.getElementById('___gatsby').classList.toggle('heightvh')}}>Cómo funciona?</a>
    </li>
    <li>
      <a href="/#buy-packs" onClick={(e) => {showNav(!nav); document.getElementById('___gatsby').classList.toggle('heightvh')}}>Comprar packs</a>
    </li>
    {props.userAuthenticated ?<>
      <li>
        <a href={props.staff !== "" ? "/co/qr/staff/zone":"/co/qr/user/profile"}  onClick={() => showNav(!nav)}>Mi cuenta</a>
      </li>
      <li className="logout-mobile" id="logout-mobile">
        <LogoutLink/>
      </li>
    </>:<>
      <li>
        <a href={props.base !== "" ? `${props.base}/co/qr/user/login` : "/co/qr/user/login"}  onClick={() => showNav(!nav)}>Mi cuenta</a>
      </li>
      <li>
        <a href={props.staff !== "" ? `${props.base}/co/qr/staff/login`:"/co/qr/staff/login"} onClick={() => showNav(!nav)}>Cuenta de staff</a>
      </li>

    </>}
  </ul>
   <Footer/>
   </MenuLinks>
   </>
  );
}

export default withDrupalOauthConsumer(NavigationMobile);

const MenuLinks = styled.div `
  display: ${({nav}) => nav ? "flex": "none"};
`
const MenuIcon = styled.button `
  div {
    :first-child {
      transform: ${({nav}) => (nav ? "rotate(45deg)": "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({nav}) => (nav ? "0": "1")};
    }

    :nth-child(3) {
      transform: ${({nav}) => (nav ? "rotate(-45deg)": "rotate(0)")};
    }
  }
`
