import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './../css/login.css';
import logo from './../logo.svg';

import { reloadPage } from '../function/page';
import {useEffect} from 'react';

import logindata from '../data/login-data.json'
  
const Login = (props) => {

  const [loginInfo, setLoginInfo] = useState({
    uname: "",
    pass: "",
    rpass: ""
  });

  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "Tài khoản không tồn tại",
    pass: "Mật khẩu không chính xác",
    cname: "Tài khoản đã tồn tại",
    rpass: "Mật khẩu không trùng khớp"
  };

  const handleChange = (e) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    // Find user login info
    const userData = logindata.find((user) => user.username === loginInfo.uname);
    console.log(loginInfo);

    // 
    if (props.isLoginForm) {
      // Compare user info
      if (userData) {
        if (userData.password !== loginInfo.pass) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          props.setLogin(true);
          props.loginAction({username: loginInfo.uname, password: loginInfo.pass, UID: userData.UID});
          localStorage.setItem('loginInfo', JSON.stringify(
            {
              username: loginInfo.uname,
              password: loginInfo.pass,
              UID: userData.UID
            }
          ));
          props.getUserInfo(userData.UID);
          window.location = '/#';
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    } else {
      // Compare user info
      if (userData) {
        // Username founded
        setErrorMessages({ name: "cname", message: errors.cname });
      } else {
        if (loginInfo.pass !== loginInfo.rpass) {
          // Invalid password
          setErrorMessages({ name: "rpass", message: errors.rpass });
        } else {
          window.location = '/#/login';
        }
      }
    }
    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
      );

  // Show password
  const ShowPassword = e => {
    const target = e.currentTarget;
    if (target.firstChild.classList.contains('fa-eye-slash')) {
      target.firstChild.classList.replace('fa-eye-slash', 'fa-eye');
      target.parentNode.firstChild.type = 'text';
    } else {
      target.firstChild.classList.replace('fa-eye', 'fa-eye-slash');
      target.parentNode.firstChild.type = 'password';
    }
  }

  // JSX code for login form
  const renderLoginForm = (
    <div className="container" id='body-container'>
        <div id="fill-space">
          <h1>Chào mừng quay trở lại</h1>
          <img src='https://i.pinimg.com/564x/3e/a2/58/3ea25886611dfe7458705a8ac1195717.jpg' alt='welcome-back'></img>
        </div>
        <div className="content">
          <a href='/#' id='home-link-logo'><img src={logo} id="App-logo" alt="logo" /></a>
          <div className="login-form">
            <div className="login-form-title">Bắt đầu khám phá hầm ngục</div>
              <p>Nhập thông tin đăng nhập</p>
              <div id="demo">
                <p><b><u>Tài khoản demo</u></b> Tên đăng nhập: <b>demo</b> / Mật khẩu: <b>123456</b></p>
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    <input type="text" name="uname" value={loginInfo.uname} onChange={handleChange} required />
                    <label>Tên đăng nhập </label>
                    {renderErrorMessage("uname")}
                  </div>
                  <div className="input-container">
                    <input type="password" name="pass" onChange={handleChange} required />
                    <label>Mật khẩu </label>
                    <button type="button" className='hide-password-btn' value={loginInfo.pass} onClick={ShowPassword}>
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    </button>
                    {renderErrorMessage("pass")}
                  </div>
                  <div className="stack">
                    <div className="stack-item">
                      <input id='remember-me' type='checkbox'></input>
                      <label htmlFor='remember-me'>Lưu đăng nhập</label>
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
              <p style={{textAlign: 'center'}}>Chưa có tài khoản? <Link to='/register'><u>Đăng ký ngay!</u></Link></p>
          </div> 
        </div>
      </div>
    
  );

  // register form
  const renderRegisterForm = (
    <div className="container" id='body-container'>
        <div id="fill-space">
          <h1>Chào mừng đến với hầm ngục VIRESTY vĩ đại</h1>
          <img src='https://cdna.artstation.com/p/assets/images/images/004/433/300/large/north-front-img-3173.jpg?1483719898' alt='welcome-back'></img>
        </div>
        <div className="content">
          <a href='/#' id='home-link-logo'><img src={logo} id="App-logo" alt="logo" /></a>
          <div className="register-form">
            <div className="login-form-title">Trở thành thợ săn kho báu</div>
              <p>Nhập thông tin đăng ký</p>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    <input type="text" name="uname" value={loginInfo.uname} onChange={handleChange} required />
                    <label>Tên đăng nhập, email </label>
                    {renderErrorMessage("cname")}
                  </div>
                  <div className="input-container">
                    <input type="password" name="pass" value={loginInfo.pass} onChange={handleChange}  required />
                    <label>Mật khẩu </label>
                    <button type="button" className='hide-password-btn' onClick={ShowPassword}>
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="input-container">
                    <input type="password" name="rpass" value={loginInfo.rpass} onChange={handleChange}  required />
                    <label>Nhập lại mật khẩu </label>
                    <button type="button" className='hide-password-btn' onClick={ShowPassword}>
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    </button>
                    {renderErrorMessage("rpass")}
                  </div>
                  <div className="stack">
                    <div className="stack-item">
                      <input id='remember-me' type='checkbox'></input>
                      <label htmlFor='remember-me'>Tôi đồng ý với các điều luật của trang web</label>
                    </div>
                  </div>
                  <div className="button-container">
                    <input type="submit" value="ĐĂNG KÝ" />
                  </div>
                </form>
              </div>
              <p style={{textAlign: 'center'}}>Đã có tài khoản? <Link to='/login'><u>Đăng nhập</u></Link></p>
          </div> 
        </div>
      </div>
    
  );

  useEffect(() => {
    reloadPage();
  }, [])

  return (
    <div className="container login-layout">
      {props.isLoginForm ? renderLoginForm : renderRegisterForm}
    </div>
  );
};
  
const mapStateToProps = state => {
    return {
      user: state.user
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
      loginAction: (info) => dispatch({
        type: "USER_LOGIN",
        payload: info
      }),
      getUserInfo: (uid) => {
        dispatch({
            type: "GET_USER_INFO",
            payload: {
                UID: uid
            }
        })
    }
    }
}
  
export default connect( mapStateToProps, mapDispatchToProps )(Login);