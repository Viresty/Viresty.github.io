import './App.css';

import { Routes, Route}
    from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import {useEffect} from 'react';

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
//   useEffect(() => {

//     const handleScroll = event => {
//         if (window.scrollY >= 10) {
//             document.getElementById('header-container').style.backgroundColor = '#282c34';
//         } else if (document.getElementById('NavBar-Collapsed').classList.contains('hidden')) {
//             document.getElementById('header-container').style.backgroundColor = '';
//         } else {
//             document.getElementById('header-container').style.backgroundColor = '#282c34df';
//         }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//         window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

  return (
    // Git-hub deloy
        <HashRouter forceRefresh={true}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="login" element={<Login />} />
                <Route path="library" element={<Library />} />
                <Route path="card-detail/:itemID" element={<CardDetail />}/>
                <Route path="play" element={<Play />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </HashRouter>
  );
}
  
export default App;