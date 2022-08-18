import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './../logo.svg';
import './../css/header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as farFaSquare,
         faCircle as farFaCircle,
         
        } from '@fortawesome/free-regular-svg-icons';
import { faHome,
         faGamepad,
         faBook
        } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor(props) {
      super(props);
      this.toggleNavBar = this.toggleNavBar.bind(this);
      this.toggleMoreBar = this.toggleMoreBar.bind(this);
      this.toggleUserBar = this.toggleUserBar.bind(this);
      this.state = {
        NavItems: [
            {name: 'TRANG CHỦ',
             id: 'Home',
             icon: faHome,
             link: '/'},
            {name: 'CHƠI',
             id: 'Play',
             icon: faGamepad,
             link: '/play'},
            {name: 'THƯ VIỆN',
             id: 'Library',
             icon: faBook,
             link: '/library'},
          ],
        NavItems2: [
            {name: 'CHINH PHẠT',
             id: 'Play',
             icon: faGamepad,
             link: '/play'},
            {name: 'CHỢ',
             id: 'Shop',
             icon: '',
             link: '/shop'
            },
            {name: 'THƯ VIỆN',
             id: 'Library',
             icon: faBook,
             link: '/library'},
        ],
        MoreItems: [
            {name: 'LUẬT CHƠI',
             id: 'rule',
             link: '/rule'},
            {name: 'VỀ CHÚNG TÔI',
             id: 'about-us',
             link: '/about-us'},
            {name: 'LIÊN HỆ',
             id: 'contact-us',
             link: '/contact-us'},
            {name: 'DIỄN ĐÀN',
             id: 'forum',
             link: '/forum'},
            {name: 'FAQs',
             id: 'faqs',
             link: '/faqs'},
        ]
      }
    }

    toggleNavBar() {
      document.getElementById('NavBar-Collapsed').classList.toggle('hidden')
      if (document.getElementById('header-container').style.backgroundColor === 'rgba(0, 0, 0, 0)') {
        document.getElementById('header-container').style.backgroundColor = '#282c34';
      } else if (document.getElementById('header-container').style.backgroundColor === 'rgb(40, 44, 52)') {
        if (window.scrollY < 10) document.getElementById('header-container').style.backgroundColor = '#00000000';
        document.getElementById('MoreNavBar-Collapsed').classList.add('hidden');
      }
    }

    toggleMoreBar() {
      if (document.getElementById('NavBar-Collapsed').classList.contains('hidden')) {
        if (document.getElementById('MoreNavBar').classList.contains('hidden')) {
          document.getElementById('MoreNavBar').classList.remove('hidden');
          document.getElementById('MoreNavBar').style.animation = 'openNavBar 0.3s';
        } else {
          document.getElementById('MoreNavBar').style.animation = 'closeNavBar 0.3s';
          setTimeout(function() {document.getElementById('MoreNavBar').classList.add('hidden')}, 250);
        }
      } else {
        if (document.getElementById('MoreNavBar-Collapsed').classList.contains('hidden')) {
          document.getElementById('MoreNavBar-Collapsed').classList.remove('hidden');
          document.getElementById('MoreNavBar-Collapsed').style.animation = 'openNavBar 0.2s';
        } else {
          document.getElementById('MoreNavBar-Collapsed').style.animation = 'closeNavBar 0.2s';
          setTimeout(function() {document.getElementById('MoreNavBar-Collapsed').classList.add('hidden')}, 250);
        }
      }
    }

    toggleUserBar() {
      if (document.getElementById('userBar').classList.contains('hidden')) {
        document.getElementById('userBar').classList.remove('hidden');
        document.getElementById('userBar').style.animation = 'openUserBar 0.2s';
      } else {
        document.getElementById('userBar').style.animation = 'closeUserBar 0.2s';
        setTimeout(function() {document.getElementById('userBar').classList.add('hidden')}, 250);
      }
    }

    render() {
      const NavItems = this.state.NavItems.map((item, idx) => {
        return (
          <li id={item.id+'NavLinkItem'} key={idx}>
            <NavLink to={item.link}>
              <FontAwesomeIcon icon={item.icon} />
              {item.name}
            </NavLink>
          </li>)
      });

      const userAvatar = (
        <div id='userAvatar'>
          <button onClick={this.toggleUserBar}>
            <img id='userAvatar-img' src={this.props.user.accountInfo.avatarUrl} alt='user-avatar'></img>
          </button>
          <div id='userBar' className='closed hidden'>
            <div className='blocker' onClick={this.toggleUserBar}></div>
            <ul className='NavBarUl'>
                <li>
                  <div id="userBarInfo">
                    <p><u>UID</u>: #{this.props.user.accountInfo.UID}</p>
                    <h1>{this.props.user.accountInfo.nickname}</h1>
                    <h3>{this.props.user.accountInfo.email}</h3>
                  </div>
                </li>
                <li>
                  <NavLink to={'/profile/'+this.props.user.accountInfo.UID+'/'}>
                    <i className="fa fa-user" aria-hidden="true"></i>HỒ SƠ
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/settings'>
                    <i className="fa fa-cogs" aria-hidden="true"></i>CÀI ĐẶT
                  </NavLink>
                </li>
                <li>
                  <button onClick={() => {
                    localStorage.removeItem('loginInfo');
                    this.props.setLogin(false);
                    window.location = '/#/login';
                  }}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>ĐĂNG XUẤT</button>
                </li>
            </ul>
          </div>
        </div>
      )

      const MoreItems = this.state.MoreItems.map((item, idx) => {
        return <li key={idx}><NavLink id={item.id+'NavLinkItem'} to={item.link}>{item.name}</NavLink></li>
      });

      return (
        <div className='container' id="header-container">
          <div className="content" id="header-content">
            <header className="header">
              <a href='#/' id='home-link-logo'><img src={logo} id="App-logo" alt="logo" /></a>
              <div className='NavBar'>
                <ul className='NavBarUl'>
                  {NavItems}
                  <li key='4'>
                    <button onClick={this.toggleMoreBar}>
                      XEM THÊM <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
                {this.props.isLogin?userAvatar:<a id='login-button' href='#/login'>ĐĂNG NHẬP</a>}
                <button id='NavBarCollapseBtn' onClick={this.toggleNavBar}>
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
              </div>
              <div id='MoreNavBar' className='closed NavBar'>
                <div className='blocker' onClick={this.toggleMoreBar}></div>
                <ul className='NavBarUl'>
                  {MoreItems}
                </ul>
              </div>
            </header>
          </div>
          <div className='content closed' id='NavBar-Collapsed'>
            <ul>
              {NavItems}
              <li key='4'>
                <button onClick={this.toggleMoreBar}>
                  XEM THÊM <i className="fa fa-caret-down" aria-hidden="true"></i>
                </button>
              </li>
              <li>
                <div id='MoreNavBar-Collapsed' className='closed'>
                  <ul>
                    {MoreItems}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => {
    return {
      user: state.user
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        action: {
            getUserInfo: () => {
                dispatch({
                    
                })
            },
            updateCharacter: (item) => {
                dispatch({
                    type: "UPDATE_CHARACTER",
                    payload: {
                        item: item
                    }
                })
            }
        }
    }
}
  
export default connect( mapStateToProps, mapDispatchToProps )(Header);