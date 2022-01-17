import React, { useState, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import * as ROUTER from "../../Routes/index";
import firebase, { auth } from "../../Firebase/Config";
import { createNewUser, generateKeywords } from "../../Firebase/Service";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export default function RegisterForm() {
  //TODO State
  const initValue = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formValue, setFormValue] = useState(initValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      submitHandleRegister();
    }
  }, [formError]);

  // TODO Register account
  const handleRegister = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };

  // TODO Validate form register
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username không được để trống!";
    }
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
    if (!values.confirm_password) {
      errors.confirm_password = "Mật khẩu nhập lại không được để trống";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Mật khẩu nhập lại không khớp";
    }
    return errors;
  };

  // TODO Submit register
  const submitHandleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          auth.currentUser
            .updateProfile({
              displayName: formValue.username,
              photoURL:
                "https://ui-avatars.com/api/?name=" +
                formValue.username +
                "?size=80",
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
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email đã được đăng kí bở tài khoản khác! Vui lòng chọn email khác ",
          });
        }
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
                value={formValue.username}
                onChange={handleChange}
              />
              <p className="text-danger">{formError.username}</p>
            </div>
            <div className="register__field">
              <input
                type="text"
                className="register__input"
                placeholder="Email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
              />
              <p className="text-danger">{formError.email}</p>
            </div>
            <div className="register__field">
              <input
                type="password"
                className="register__input"
                placeholder="Mật khẩu"
                name="password"
                value={formValue.password}
                onChange={handleChange}
              />
              <p className="text-danger">{formError.password}</p>
            </div>
            <div className="register__field">
              <input
                type="password"
                className="register__input"
                placeholder="Xác thực mật khẩu"
                name="confirm_password"
                value={formValue.confirm_password}
                onChange={handleChange}
              />
              <p className="text-danger">{formError.confirm_password}</p>
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
