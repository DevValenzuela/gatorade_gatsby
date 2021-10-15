import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import LogoFace from "../../images/logo-face-gatorade.png";
import LogoTwiter from "../../images/logo-twiter-gatorade.png";
import LogoYoutube from "../../images/logo-youtube-gatorade.png";
import LogoInta from "../../images/logo-insta-gatorade.png";
import LogoTextgatorade from "../../images/footer-gatorade.png";

const Footer = ({ siteTitle }) => (
  <footer className="footer-principal ">
    <div className="share-social ">
      <div className="logos">
        <div className="logo logo-face">
          <a href="https://www.facebook.com/gatoradecolombia" target="_blank" rel="noreferrer">
          <img src={LogoFace} alt="logo-gatorade" title="gatorade" />
          </a>
        </div>
        <div className="logo logo-twiter">
          <a href="https://twitter.com/gatoradecol/" target="_blank" rel="noreferrer">
          <img src={LogoTwiter} alt="logo-gatorade" title="gatorade" />
          </a>
        </div>
        <div className="logo logo-youtube">
          <a href="http://www.youtube.com/user/gatoradecol" target="_blank" rel="noreferrer">
          <img src={LogoYoutube} alt="logo-gatorade" title="gatorade" />
          </a>
        </div>
        <div className="logo logo-inta">
          <a href="https://www.instagram.com/gatoradecolombia/" target="_blank" rel="noreferrer">
          <img src={LogoInta} alt="logo-gatorade" title="gatorade" />
          </a>
        </div>
      </div>
    </div>
    <div className="footer-link-informative ">
      <div className="privacy-Policy">
      <Link to="/politica-de-privacidad/"> Política de privacidad</Link>
      </div>
      <div className="terms-Conditions">
      <Link to="/terminos-y-condiciones/"> Términos y condiciones</Link>
      </div>
      <div className="copyright">
      <Link to="/"> Copyright © {new Date().getFullYear()}</Link>
      </div>
    </div>
    <div className="img-footer ">
      <Link to="/"></Link>
      <img src={LogoTextgatorade} alt="logo-gatorade" title="gatorade" />
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
