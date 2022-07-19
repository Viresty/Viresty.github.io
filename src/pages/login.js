import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './../css/login.css';
import logo from './../logo.svg';

import { reloadAnimation } from '../function/page';
import {useEffect} from 'react';
  
const Login = () => {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "demo",
      password: "123456"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "Tài khoản không tồn tại",
    pass: "Mật khẩu không chính xác"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        window.location = '/#';
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
      );

  // Show password
  const ShowPassword = () => {
    if (document.getElementById('hide-password-btn').firstChild.classList.contains('fa-eye-slash')) {
      document.getElementById('hide-password-btn').firstChild.classList.replace('fa-eye-slash', 'fa-eye');
      document.getElementById('hide-password-btn').parentNode.firstChild.type = 'text';
    } else {
      document.getElementById('hide-password-btn').firstChild.classList.replace('fa-eye', 'fa-eye-slash');
      document.getElementById('hide-password-btn').parentNode.firstChild.type = 'password';
    }
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="uname" required />
          <label>Tên đăng nhập </label>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input type="password" name="pass" required />
          <label>Mật khẩu </label>
          <button type="button" id='hide-password-btn' onClick={ShowPassword}>
            <i className="fa fa-eye-slash" aria-hidden="true"></i>
          </button>
          {renderErrorMessage("pass")}
        </div>
        <div className="stack">
          <div className="stack-item">
            <input id='remember-me' type='checkbox'></input>
            <label for='remember-me'>Lưu đăng nhập</label>
          </div>
          <div className="stack-item">
            <Link to='/reset-password'>Quên mật khẩu?</Link>
          </div>
        </div>
        <div className="button-container">
          <input type="submit" value="ĐĂNG NHẬP" />
        </div>
      </form>
    </div>
  );

  useEffect(() => {

    reloadAnimation();
    document.getElementById('header-container').classList.add('hidden');
    document.getElementById('footer-container').classList.add('hidden');

  }, [])

  return (
    <div className="container login-layout">
      <div className="container" id='body-container'>
        <div id='page-banner'>
          <div className='overlay-img'></div>
          <div className='page-title'>
            <h1>Home</h1>
          </div>
        </div>
        <div id="fill-space">
          <h1>Chào mừng quay trở lại.</h1>
          <img src='https://i.pinimg.com/564x/3e/a2/58/3ea25886611dfe7458705a8ac1195717.jpg' alt='welcome-back'></img>
        </div>
        <div className="content">
          <a href='/#' id='home-link-logo'><img src={logo} id="App-logo" alt="logo" /></a>
          <div className="login-form">
            <div className="login-form-title">Bắt đầu khám phá hầm ngục</div>
            <p>Nhập thông tin đăng nhập</p>
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Login;