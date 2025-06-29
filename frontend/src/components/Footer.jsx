import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>© 2025 Job Portal. All rights reserved.</p>
        <p>
          Powered by <a style={{color:"black" , textDecoration:"none"}} href="https://github.com/deekshagarg1">Deeksha Garg</a>
        </p>
        <p>
          <Link style={{color:"black" , textDecoration:"none"}}  to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link style={{color:"black" , textDecoration:"none"}}  to={"/TermsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
