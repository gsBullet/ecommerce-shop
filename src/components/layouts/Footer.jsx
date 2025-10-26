import React from "react";
import instagram from "../assets/Frontend_Assets/instagram_icon.png";
import whatsapp from "../assets/Frontend_Assets/whatsapp_icon.png";
// import facebook from "../assets/Frontend_Assets/facebook_icon.png"
// import twitter from "../assets/Frontend_Assets/twitter_icon.png"
// import linkedin from "../assets/Frontend_Assets/linkedin_icon.png"
import pinterest from "../assets/Frontend_Assets/pintester_icon.png";
// import youtube from "../assets/Frontend_Assets/youtube_icon.png"
import footerLogo from "../assets/Frontend_Assets/logo.png";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-logo">
          <img src={footerLogo} alt="" />
          <p>SHOPPER</p>
        </div>
        <div>
          <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-social-icon">
          {/* <div className='footer-icon-container'>
            <img src={facebook} alt="Facebook" />
          </div> */}
          {/* <div className='footer-icon-container'>
            <img src={twitter} alt="Twitter" />
          </div> */}
          <div className="footer-icon-container">
            <img src={instagram} alt="Instagram" />
          </div>

          <div className="footer-icon-container">
            <img src={pinterest} alt="Pinterest" />
          </div>
          {/* <div className='footer-icon-container'>
            <img src={youtube} alt="YouTube" />
          </div> */}
          <div className="footer-icon-container">
            <img src={whatsapp} alt="WhatsApp" />
          </div>
        </div>
        <div className="footer-copyright">
          <hr />
          <p>© 2023 Shopper. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
