import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../logo.svg';
import './../css/header.css';

class Header extends Component {
    constructor(props) {
      super(props);
      this.toggleNavBar = this.toggleNavBar.bind(this);
      this.toggleMoreBar = this.toggleMoreBar.bind(this);
      this.state = {
        NavItems: [
            {name: 'TRANG CHỦ',
             id: 'Home',
             link: '/'},
            {name: 'CHƠI',
             id: 'Play',
             link: '/play'},
            {name: 'THƯ VIỆN',
             id: 'Library',
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
          document.getElementById('MoreNavBar-Collapsed').style.animation = 'openNavBar 0.3s';
        } else {
          document.getElementById('MoreNavBar-Collapsed').style.animation = 'closeNavBar 0.3s';
          setTimeout(function() {document.getElementById('MoreNavBar-Collapsed').classList.add('hidden')}, 250);
        }
      }
    }

    render() {
      const NavItems = this.state.NavItems.map((item, idx) => {
        return (
          <li id={item.id+'NavLinkItem'} key={idx}>
            <NavLink to={item.link}>
              {item.name}
            </NavLink>
          </li>)
      });

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
                <a id='login-button' href='#/login'>ĐĂNG NHẬP</a>
                <button id='NavBarCollapseBtn' onClick={this.toggleNavBar}>
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
              </div>
              <div id='MoreNavBar' className='closed NavBarUl'>
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

export default Header;