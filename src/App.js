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

import Header from './components/header';
import Footer from './components/footer';
import Cart from './components/cart'
  
const App = () => {

    const [isLogged_in, setLogin] = useState(false)

    useEffect (() => {
        console.log(isLogged_in);
    })

    return (
    // Git-hub deloy
        <HashRouter forceRefresh={true}>
            <Header isLogin={isLogged_in} />
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