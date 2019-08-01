import React from "react";

const Footer = props => {
  return (
    <footer className="footer">
      <div>
        <a href="#">
          <img
            href="www.facebook.com"
            src="https://i.imgur.com/Zfv1lbP.png"
            alt="facebook-logo"
            className="logo-footer"
          />
        </a>
        <a href="#">
          <img
            src="https://i.imgur.com/8SnQvrT.png"
            alt="instagram-logo"
            className="logo-footer"
          />
        </a>
        <a href="#">
          <img
            src="https://i.imgur.com/rOlcOjR.png"
            alt="twitter-logo"
            className="logo-footer"
          />
        </a>
        <a href="#">
          <img
            src="https://i.imgur.com/p7IdfXS.png"
            alt="youtube-logo"
            className="logo-footer"
          />
        </a>
      </div>
      <p className="copyright">
        &copy; 2019 FunPop! World - Marco Miranda - Flatiron School London
      </p>
    </footer>
  );
};

export default Footer;
