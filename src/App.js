import './App.css';

import { Routes, Route}
    from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Home from './pages/home';
import Login from './pages/login';
import Library from './pages/library';
import Play from './pages/play';
import CardDetail from './pages/cardDetail';
import UserProFile from './pages/userProfile';
import NotFound from './pages/not-found';


import { reloadPage } from './function/page';

import Header from './components/header';
import Footer from './components/footer';

import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init();
  
const App = ({user, action}) => {

    const [isLogged_in, setLogin] = useState(false);
    let loginAccount = localStorage.getItem('loginInfo');
    loginAccount = JSON.parse(loginAccount);
    
    useEffect (() => {
        reloadPage();
        // localStorage.clear();
        // console.log(user);
        if (loginAccount != "undefined" && loginAccount != null) {
            action.getUserInfo(loginAccount.UID);
            console.log('Đăng nhập thành công!!!');
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);

    return (
    // Git-hub deloy
        <HashRouter forceRefresh={true}>
            <Header isLogin={isLogged_in} setLogin={setLogin} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="login" element={<Login isLoginForm={true} setLogin={setLogin} />} />
                <Route exact path="register" element={<Login isLoginForm={false} />} />
                <Route path="library" element={<Library />} />
                <Route path="card-detail/:itemID" element={<CardDetail />}/>
                {/* private */}
                <Route path="profile/:userID/:infotag" element={<UserProFile />} />
                <Route path="profile/:userID" element={<UserProFile />} />
                <Route path="play" element={<Play isLogin={isLogged_in} />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </HashRouter>
  );
}
  
const mapStateToProps = state => {
    return {
      user: state.user
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        action: {
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
}
  
export default connect( mapStateToProps, mapDispatchToProps )(App);