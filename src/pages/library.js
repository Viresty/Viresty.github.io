import List from './../components/list'
import './../css/library-layout.css';

import { addAnimationInView } from './../function/animation';
import { reloadAnimation } from '../function/page';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { list_of_test } from '../test-data';

const img1 = {url: 'https://i.ibb.co/pyvJsZC/Viresty-DC.png',
                itemId: '1',
                alt: 'a'}

const Library = () => {
    
    let params = useParams();

    useEffect(() => {

        reloadAnimation();
    
    }, [])

    return (
        <div className='container library-layout'>
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='content FadeInAnimation page-title'>
                <h1 className='textshadowAnimation'>THƯ VIỆN</h1>
            </div>
        <div className='container' id="body-container">
            <h1>{params.itemId}</h1>
            <div className='content'>
                <List ListItems={list_of_test} title="Chức nghiệp" detail="Chỉ số cơ bản, khả năng và kĩ năng tất sát người chơi sẽ có khi chọn chức nghiệp."/>
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