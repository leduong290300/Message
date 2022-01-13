import React, { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import * as ROUTER from "../../Routes/index";
import firebase, { auth } from "../../Firebase/Config";
import { createNewUser, generateKeywords } from "../../Firebase/Service";
import { useHistory } from "react-router-dom";

export default function RegisterForm() {
  //TODO State
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  // TODO Register account
  const handleRegister = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          auth.currentUser
            .updateProfile({
              displayName: username,
              photoURL:
                "https://ui-avatars.com/api/?name=" + username + "?size=80",
            })
            .then(() => {
              createNewUser("users", {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                keywords: generateKeywords(user.displayName),
              });
              history.push(ROUTER.LOGIN);
            });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="register">
            <div className="register__field">
              <input
                type="text"
                className="register__input"
                placeholder="Username"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="register__field">
              <input
                type="text"
                className="register__input"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register__field">
              <input
                type="password"
                className="register__input"
                placeholder="Mật khẩu"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register__field">
              <input
                type="password"
                className="register__input"
                placeholder="Xác thực mật khẩu"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="button register__submit"
              onClick={handleRegister}
            >
              <span className="button__text">Đăng kí</span>
              <RightOutlined className="button__icon" />
            </button>
          </form>
          <div className="login_account">
            <h3>Đã có tài khoản</h3>
            <Link to={ROUTER.LOGIN} className="login_account__link">
              Đăng nhập
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
