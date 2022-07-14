import {useEffect} from 'react';
import { Link } from 'react-router-dom';

import List from './../components/list'
import Banner from './../components/banner'

import './../css/home-layout.css';

import { reloadPage, scrollTowhenInterect } from '../actions/page'

const img = {url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627bc589-b21e-47b2-8cf2-7617185ee1ac/d4n4zuk-f6474775-f789-459c-833e-89ffd068b654.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyN2JjNTg5LWIyMWUtNDdiMi04Y2YyLTc2MTcxODVlZTFhY1wvZDRuNHp1ay1mNjQ3NDc3NS1mNzg5LTQ1OWMtODMzZS04OWZmZDA2OGI2NTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9XxbT2tBslr_SHGEAA4u_5QCwhppgUj6K-BiJsHo4ms',
                alt: 'viresty'}

const img1 = {url: 'https://cdna.artstation.com/p/assets/images/images/003/402/738/large/-886b20e1d6cd7ec21de43810bc21543eda3c0268159097-pyebmq.jpg?1473325789',
                alt: 'viresty1'}

const img2 = {url: 'https://picstatio.com/large/752673/warrior-at-lake-dark-art.jpg',
                alt: 'viresty2'}

const img3 = {url: 'https://picstatio.com/large/b183c8/dragon-and-warrior-fantasy.jpg',
                alt: 'viresty3'}

const img4 = {url: 'https://cdnb.artstation.com/p/assets/images/images/019/502/481/large/anato-finnstark-anato-finnstark-the-tiger-s-gate-by-anatofinnstark-dcx21ul-fullview.jpg?1563800651',
                alt: 'viresty4'}
                
const img5 = {url: 'https://cdna.artstation.com/p/assets/images/images/001/676/916/large/g-host-lee-breaking-of-rock-2.jpg?1450668794',
                alt: 'viresty5'}

const img6 = {url: 'https://cdnb.artstation.com/p/assets/images/images/027/707/981/large/m-z-.jpg?1592320233',
                alt: 'viresty6'}

const img7 = {url: 'https://cdnb.artstation.com/p/assets/images/images/012/440/677/4k/li-hh-ssssss.jpg?1534829525',
                alt: 'viresty7'}

const img8 = {url: 'https://cdna.artstation.com/p/assets/images/images/008/446/004/large/zezhou-chen-web.jpg?1512834759',
                alt: 'viresty8'}

const img9 = {url: 'https://cdnb.artstation.com/p/assets/images/images/047/921/011/4k/sandra-duchiewicz-mountain-encounter-fin-by-sandra-duchiewicz-telthona.jpg?1648756410',
                alt: 'viresty9'}

const img10 = {url: 'https://cdnb.artstation.com/p/assets/images/images/009/175/541/large/dave-greco-crypt-1.jpg?1517517146',
                alt: 'viresty10'}

const img11 = {url: 'https://cdna.artstation.com/p/assets/images/images/002/987/276/large/yuriy-chemezov-yuriy-chemezov-themark1.jpg?1468165368',
                alt: 'viresty11'}

const img12 = {url: 'https://cdnb.artstation.com/p/assets/images/images/011/182/813/large/xiaoguang-sun-c.jpg?1528260890',
                alt: 'viresty12'}

const list_of_test = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]

const Home = () => {

    useEffect(() => {

        reloadPage();
    
    }, [])

    return (
        <div className='container home-layout'>
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='content fade-in page-title'>
                <h2>VUA HẦM NGỤC</h2>
                <h1 className='textshadowAnimation'>VIRESTY</h1>
                <p>Game thẻ bài chiến đấu, sinh tồn và khám phá hầm ngục</p>
                <a id='play-button' href='#/play'>CHƠI NGAY</a>
            </div>
            <div className='container' id="body-container">
                <div className="content fade-in">
                    <h1 className="content-title">Khám phá hầm ngục vô tận.</h1>
                    <p className="content-detail">Rút bài, trang bị những vũ khí huyền thoại, sử dụng các là bài phép hùng mạnh để chinh phục hầm ngục sâu thẳm.</p>
                    <img className='open-img content-img' src={img.url}
                        alt="viresty"></img>
                    <Link to={'/rule'} className='content-link'>LUẬT CHƠI <i class="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className="content fade-in">
                    <h1 className="content-title">Lập kế hoạch, chuẩn bị hành trang</h1>
                    <p className="content-detail">Tận dụng kho báu tìm được để tăng chiến lực, lựa chọn nâng cấp phù hợp giúp đối phó các kẻ địch mạnh mẽ.</p>
                    <img className='open-img content-img' src={img5.url}
                        alt="viresty"></img>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i class="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className='content fade-in'>
                    <h1 className='content-title'>Chức nhiệp đa dạng</h1>
                    <p className="content-detail">Mỗi chức nghiệp đều có điểm mạnh, chỉ số cơ bản, khả năng và các kĩ năng tất sát mạnh mẽ riêng biệt.</p>
                    <Banner ListItems={list_of_test}/>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i class="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className='content fade-in'>
                    <h1 className='content-title'>Chiến thuật linh động</h1>
                    <p className="content-detail">Hàng trăm thẻ bài trang bị và phép thuật khiến mỗi chuyến chinh phạt đều trở nên mới mẻ và thú vị.</p>
                    <List ListItems={list_of_test}/>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i class="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
            </div>
        </div>
  );
}

export default Home;