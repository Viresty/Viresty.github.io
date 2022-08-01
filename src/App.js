import './App.css';

import { Routes, Route}
    from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/home';
import Login from './pages/login';
import Library from './pages/library';
import Play from './pages/play';
import CardDetail from './pages/cardDetail';
import NotFound from './pages/not-found';

import { reloadAnimation } from './function/page';

import Header from './components/header';
import Footer from './components/footer';
  
const App = () => {

    const [isLogged_in, setLogin] = useState(false);
    let loginAccount = localStorage.getItem('loginInfo');
    loginAccount = JSON.parse(loginAccount);
    
    useEffect (() => {
        console.log(localStorage);
        if (loginAccount != "undefined" && loginAccount != null) {
            setLogin(true);
        } else {
            console.log("!!!");
            setLogin(false);
        }
        reloadAnimation();
        console.log(isLogged_in);
    })

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
                <Route path="play" element={<Play isLogin={isLogged_in} />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </HashRouter>
  );
}
  
export default App;