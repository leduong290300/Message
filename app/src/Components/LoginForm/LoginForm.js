import React, { useState } from "react";
import "./LoginForm.css";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as ROUTER from "../../Routes/index";
import firebase from "../../Firebase/Config";
import { useHistory } from "react-router-dom";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (user) {
          history.push(ROUTER.WINDOWCHAT);
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
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
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button login__submit" onClick={handleLogin}>
              <span className="button__text">Đăng nhập</span>
              <RightOutlined className="button__icon" />
            </button>
          </form>
          <div className="register_account">
            <h3>Chưa có tài khoản</h3>
            <Link to={ROUTER.REGISTER} className="register_account__link">
              Đăng kí
            </Link>
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
