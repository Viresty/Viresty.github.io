import React from "react";

import { reloadAnimation } from '../function/page';
import {useEffect} from 'react';
  
const Play = () => {

    useEffect(() => {

        reloadAnimation();
    
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
  
export default Play;