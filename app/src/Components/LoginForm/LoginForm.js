import React from "react";
import "./LoginForm.css";
import {
  FacebookFilled,
  GooglePlusCircleFilled,
  RightOutlined,
} from "@ant-design/icons";

import firebase, { auth } from "../../Firebase/config";

const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function LoginForm() {
  const loginWithFacebook = () => {
    auth.signInWithPopup(fbProvider);
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                placeholder="Password"
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <RightOutlined className="button__icon" />
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <FacebookFilled
                className="social-login__icon "
                onClick={loginWithFacebook}
              />
              <GooglePlusCircleFilled className="social-login__icon " />
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
