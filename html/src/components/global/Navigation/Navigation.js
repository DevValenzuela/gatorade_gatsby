import React, { useState} from 'react';
import { Link } from 'gatsby';
import withDrupalOauthConsumer from '../../drupal-oauth/withDrupalOauthConsumer';
import styled from "styled-components";
import LogoutLink from '../LogoutLink/LogoutLink';
import LogoGatorade from "../../../images/logo-menu.png";

function Navigation(props) {
  const [nav, showNav] = useState(false)
  return (
    <div className="menu-horizontal container-fluid" >
      <div className="row">
        <div className="col-12 navbar">
          <div className="logo-navbar">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
            </Link>
            <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
          </div>
          <div className="links-section">
            {props.userAuthenticated ?<>
              <div className={`link-my-account ${props.bottles}`}>
              <Link to={props.staff !== "" ? "/staff/zone":"/user/profile"}></Link>
              </div>
              <LogoutLink/>
              </> :<>
              <div className="link-regist">
                <Link to="/user/register">Registrate</Link>
              </div>
              <div className="link-login" onClick={() => showNav(!nav)}>
                <Link to="/#"></Link>
              </div>
              <Modal className="modal-menu" nav={nav}>
               <p>Ingresar como:</p>
               <Link to="/user/login">Deportista</Link>
               <Link to="/staff/login">staff</Link>
            </Modal>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default withDrupalOauthConsumer(Navigation);

const Modal= styled.div `
  display: ${({nav}) => nav ? "flex": "none"};
`
