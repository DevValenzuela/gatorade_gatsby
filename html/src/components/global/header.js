// import * as React from "react"
import PropTypes from "prop-types"
import React from "react"
import Navigation from './Navigation/Navigation';
import NavigationMobile from './Navigation/NavigationMobile';

//Importacion imagenes
import LogoGatorade from "../../images/logo-menu.png";

const Header = ({ siteTitle }) => {
  let bottles = "";
  let staff = "";
  let base = "";
  if (typeof window !== 'undefined') {
    bottles = localStorage.getItem('bottles-enable') !== null ? localStorage.getItem('bottles-enable') : "";
    staff = localStorage.getItem('set-staff') !== null ? localStorage.getItem('set-staff') : "";
    base = window.location.origin;
  }
  return (
    <header id="header">
      <div className="menu-gatorade">
        <div className="logo-gatorade">
        <a href="/co/qr">
         <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
         </a>
        </div>
          <div className="logo-gatorade">
            <a href="/co/qr">
              <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
            </a>
          </div>
          <NavigationMobile staff={staff} base={base}/>
      </div>
      < Navigation bottles={bottles} staff={staff}/>
    </header>
  )
}

export default Header

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


// const MenuIcon = styled.button `
//   div {
//     :first-child {
//       transform: ${({nav}) => (nav ? "rotate(45deg)": "rotate(0)")};
//     }

//     :nth-child(2) {
//       opacity: ${({nav}) => (nav ? "0": "1")};
//     }

//     :nth-child(3) {
//       transform: ${({nav}) => (nav ? "rotate(-45deg)": "rotate(0)")};
//     }
//   }
// `
// const MenuLinks = styled.div `
//   display: ${({nav}) => nav ? "flex": "none"};
// `

// const MenuLinks = styled.div `
//   transform: ${({nav}) => nav ? "translateX(0)": "translate(100%)"};
// `
