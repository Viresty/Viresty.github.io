import React from "react";

import { addAnimationInView } from './../actions/addAnimation';
import { reloadPage } from '../actions/page';
import {useEffect} from 'react';
  
const Login = () => {

  useEffect(() => {

    reloadPage();

  }, [])

  return (
    <div className="container">
      <div id='page-banner'>
        <div className='overlay-img'></div>
        <div className='page-title'>
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
};
  
export default Login;