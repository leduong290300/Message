import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as ROUTER from "../../Routes/index";
import firebase from "../../Firebase/Config";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export default function LoginForm() {
  const initValue = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      submitHandleLogin();
    }
  }, [formError]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };

  // TODO Validate form login
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email không được để trống!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email không hợp lệ!";
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu không được ít hơn 6 kí tự";
    }
    return errors;
  };

  const submitHandleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (user) {
          history.push(ROUTER.WINDOWCHAT);
        }
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tải khoản chưa tồn tại trên hệ thống! ",
          });
        }
        if (error.code === "auth/wrong-password") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tải khoản hoặc mật khẩu nhập chưa đúng! Vui lòng kiểm tra lại ",
          });
        }
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
                name="email"
                placeholder="Email"
                value={formValue.email}
                onChange={handleOnChange}
              />
              <p className="text-danger">{formError.email}</p>
            </div>
            <div className="login__field">
              <input
                type="password"
                name="password"
                className="login__input"
                placeholder="Mật khẩu"
                value={formValue.password}
                onChange={handleOnChange}
              />
              <p className="text-danger">{formError.password}</p>
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
