import React from "react";
import { Link } from "react-router-dom";

import { reloadAnimation } from '../function/page';
import {useEffect} from 'react';
  
const NotFound = () => {

  useEffect(() => {

    reloadAnimation();
    document.getElementById('header-container').classList.add('hidden');
    document.getElementById('footer-container').classList.add('hidden');

  }, [])

  return (
    <div className="container">
        <div id='page-banner'>
            <div className='overlay-img'
                style={{backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627bc589-b21e-47b2-8cf2-7617185ee1ac/d4n4zuk-f6474775-f789-459c-833e-89ffd068b654.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyN2JjNTg5LWIyMWUtNDdiMi04Y2YyLTc2MTcxODVlZTFhY1wvZDRuNHp1ay1mNjQ3NDc3NS1mNzg5LTQ1OWMtODMzZS04OWZmZDA2OGI2NTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9XxbT2tBslr_SHGEAA4u_5QCwhppgUj6K-BiJsHo4ms)'}}
            ></div>
        </div>
        <div className='content page-title'>
            <h2>NOT FOUND</h2>
            <h1>404</h1>
            <p>Trang này không tồn tại hoặc chưa ra mắt</p>
            <Link to='/'><u>VỀ TRANG CHỦ</u></Link>
        </div>
    </div>
  );
};
  
export default NotFound;