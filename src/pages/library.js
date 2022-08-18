import List from './../components/list'
import './../css/library-layout.css';

import { reloadPage } from '../function/page';
import { useEffect, useReducer, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import data from '../data/test-data.json';

const LibraryReducer = (states, action) => {
    var state = {...states}
    const payload = action.payload;
    switch (action.type) {
        case "FILTER_TYPE":
            Object.keys(state).forEach(cardID => {
                delete state[cardID];
            })
            payload.typeList.forEach(type => {
                state = Object.assign({}, state, data[data['ID_NAME'][type]]);
            });
            break;
    
        default:
            break;
    }
    return state;
}

const Library = () => {
    const [cardList, handleCardList] = useReducer(LibraryReducer, []);
    const [isCheckAll, setIsCheckAll] = useState(true);
    const [isCheck, setIsCheck] = useState(['role', 'weapon', 'action', 'spell', 'item', 'buff', 'monster', 'debuff', 'event', 'boss']);
    
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(Object.keys(data['ID_NAME']).map(key => key));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    
    const handleClick = e => {
        const {id, checked} = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };
    
    let params = useParams();

    useEffect(() => {
        handleCardList({
            type: "FILTER_TYPE",
            payload: {
                typeList: isCheck
            }
        })
    }, [isCheck])

    useEffect(() => {
        console.log(params);
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
                <div className='flexRowGrow'>
                    <div id="cardFilterWrapper">
                        <form id="cardFilter" >
                            <h1>Loại thẻ bài:</h1>
                            <label htmlFor={"allselect"}>
                                <input
                                    name="typeCard"
                                    type="checkbox"
                                    id={"allselect"}
                                    value={-1}
                                    onClick={handleSelectAll}
                                    checked={isCheckAll} />
                                Tất cả
                            </label>
                            {
                                Object.keys(data['ID_NAME']).map((key) => {
                                    return (
                                        <label htmlFor={key}>
                                            <input
                                                name="typeCard"
                                                type="checkbox"
                                                id={key}
                                                value={data['ID_NAME'][key]}
                                                onClick={handleClick}
                                                checked={isCheck.includes(key)} />
                                            {data['ID_TYPE'][key]}
                                        </label>
                                    )
                                })
                            }
                        </form>
                    </div>
                    
                    <h1>{params.itemId}</h1>
                    <div className='content'>
                        <List ListItems={cardList} cardPreview={true} cAOS={'flip-left'} />
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Library;