import List from './../components/list'
import './../css/library-layout.css';

import { reloadAnimation } from '../function/page';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import data from '../data/test-data.json';

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
                <List ListItems={data[0]} cardPreview={true} shortlist={true}
                    title="Chức nghiệp"
                    detail="Chỉ số cơ bản, khả năng và kĩ năng tất sát người chơi sẽ có khi chọn chức nghiệp."/>
                    <Link to={'/library/role-card'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
            </div>
            <div className='content'>
                <List ListItems={data[0]} cardPreview={true} shortlist={true}
                    title="Trang bị"
                    detail="Thanh kiếm mạnh mẽ, tấm khiên vững chắc,... sẽ giúp bạn đối phó với bầy quái vật hùng mạnh trong hầm ngục."/>
                    <Link to={'/library/weapon-card'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
            </div>
            <div className='content'>
                <List ListItems={data[0]} cardPreview={true} shortlist={true}
                    title="Bài phép"
                    detail="Những phép thuật hùng mạnh sẽ thay đổi thế trận với chiến thuật khôn ngoan."/>
                    <Link to={'/library/spell-card'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
            </div>
            <div className='content'>
                <List ListItems={data[0]} cardPreview={true} shortlist={true}
                    title="Quái vật"
                    detail="Trong hầm ngục luôn xuất hiện các loài quái vật nguy hiểm, hãy hiểu rõ chúng trước khi bắt đầu."/>
                    <Link to={'/library/monster'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
            </div>
        </div>
        </div>
  );
}

export default Library;