import List from './../components/list'
import './../css/library-layout.css';

import { reloadAnimation } from '../function/page';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import data from '../data/test-data.json';

const LibraryReducer = (states, action) => {
    var state = {...states}
    const payload = action.payload;
    switch (action.type) {
        case "FILTER":
            console.log(document.forms[0])
            break;
    
        default:
            break;
    }
    return state;
}

const Library = () => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    
    const handleSelectAll = e => {

    };
    
    const handleClick = e => {

    };
    
    let params = useParams();

    const handleSubmit = (e) => {
        console.log(document.querySelectorAll("input[name='typeCard']:checked")[0].value)
        e.preventDefault();
    }

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
                        <form id="cardFilter" onSubmit={handleSubmit}>
                            <h1>Loại thẻ bài:</h1>
                            <label htmlFor={"allselect"}>
                                <input name="typeCard" type="checkbox" id={"allselect"} value={-1} />
                                Tất cả
                            </label>
                            {
                                Object.keys(data['ID_NAME']).map((key) => {
                                    return (
                                        <label for={key+"select"}>
                                            <input name="typeCard" type="checkbox" id={key+"select"} value={data['ID_NAME'][key]} onClick={handleClick} />
                                            {data['ID_TYPE'][key]}
                                        </label>
                                    )
                                })
                            }
                            <input type="submit" value="TÌM KIẾM"/>
                        </form>
                    </div>
                    
                    <h1>{params.itemId}</h1>
                    <div className='content'>
                        <List ListItems={data[0]} cardPreview={true} cAOS={'flip-left'} />
                            <Link to={'/library/role-card'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Library;