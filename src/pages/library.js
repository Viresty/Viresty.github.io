import List from './../components/list'
import './../css/library-layout.css';

import { addAnimationInView } from './../actions/addAnimation';
import { reloadPage } from '../actions/page';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const img1 = {url: 'https://i.ibb.co/pyvJsZC/Viresty-DC.png',
                itemId: '1',
                alt: 'a'}

const list_of_test = [img1, img1, img1, img1, img1, img1, img1]

const Library = () => {
    
    let params = useParams();

    useEffect(() => {

        reloadPage();
    
    }, [])

    return (
        <div className='container library-layout'>
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
        <div className='container' id="body-container">
            <h1>{params.itemId}</h1>
            <div className='content'>
                <List ListItems={list_of_test} title="Role Card" detail="Stat, abilities and skills each player will have in-game."/>
            </div>
            <div className='content'>
                <List ListItems={list_of_test} title="Weapon Card" detail="Strong sword, steady shield, ... will support players battle with each other."/>
            </div>
            <div className='content'>
                <List ListItems={list_of_test} title="Spell Card" detail="Powerful and useful spell will change the game with judicious tactic."/>
            </div>
        </div>
        </div>
  );
}

export default Library;