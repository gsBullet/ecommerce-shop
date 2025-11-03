import React from "react";
import "./css/register.css";

const Register = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Register</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button className="register-btn">Register</button>
        <p className="loginsignup-login">
          Already have an account? <a href="/login">Login</a>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By creating an account, you agree to the <span>Terms of Use</span>{" "}
            and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
