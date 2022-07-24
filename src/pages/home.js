import {useEffect} from 'react';
import { Link } from 'react-router-dom';

import List from './../components/list'
import Banner from './../components/banner'

import './../css/home-layout.css';

import { reloadAnimation } from '../function/page'
import data from '../data/test-data.json';

const img = {url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627bc589-b21e-47b2-8cf2-7617185ee1ac/d4n4zuk-f6474775-f789-459c-833e-89ffd068b654.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyN2JjNTg5LWIyMWUtNDdiMi04Y2YyLTc2MTcxODVlZTFhY1wvZDRuNHp1ay1mNjQ3NDc3NS1mNzg5LTQ1OWMtODMzZS04OWZmZDA2OGI2NTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9XxbT2tBslr_SHGEAA4u_5QCwhppgUj6K-BiJsHo4ms',
                alt: 'viresty'}

const Home = () => {

    useEffect(() => {
        const handleScroll = event => {
            if (window.scrollY >= 10) {
                document.getElementById('header-container').style.backgroundColor = '#282c34';
            } else if (document.getElementById('NavBar-Collapsed').classList.contains('hidden')) {
                document.getElementById('header-container').style.backgroundColor = '#00000000';
            }
        };
    
        reloadAnimation();
        document.getElementById('header-container').style.backgroundColor = '#00000000';
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    
    }, [])

    return (
        <div className='container home-layout'>
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='content FadeInAnimation page-title'>
                <h2>VUA HẦM NGỤC</h2>
                <h1 className='textshadowAnimation'>VIRESTY</h1>
                <p>Game thẻ bài chiến đấu, sinh tồn và khám phá hầm ngục</p>
                <a className='big-button' href='#/play'>CHƠI NGAY</a>
            </div>
            <div className='container' id="body-container">
                <div className="content fade-in">
                    <h1 className="content-title">Khám phá hầm ngục vô tận.</h1>
                    <p className="content-detail">Rút bài, trang bị những vũ khí huyền thoại, sử dụng các là bài phép hùng mạnh để chinh phục hầm ngục sâu thẳm.</p>
                    <img className='open-img content-img' src={img.url}
                        alt="viresty"></img>
                    <Link to={'/rule'} className='content-link'>LUẬT CHƠI <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className="content fade-in">
                    <h1 className="content-title">Lập kế hoạch, chuẩn bị hành trang</h1>
                    <p className="content-detail">Tận dụng kho báu tìm được để tăng chiến lực, lựa chọn nâng cấp phù hợp giúp đối phó các kẻ địch mạnh mẽ.</p>
                    <img className='open-img content-img' src=''
                        alt="viresty"></img>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className='content fade-in'>
                    <h1 className='content-title'>Chức nhiệp đa dạng</h1>
                    <p className="content-detail">Mỗi chức nghiệp đều có điểm mạnh, chỉ số cơ bản, khả năng và các kĩ năng tất sát mạnh mẽ riêng biệt.</p>
                    <p className='content-notice'>Nhấp chọn để xem chi tiết.</p>
                    <Banner ListItems={data[0]}/>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className='content fade-in'>
                    <h1 className='content-title'>Chiến thuật linh động</h1>
                    <p className="content-detail">Hàng trăm thẻ bài trang bị và phép thuật khiến mỗi chuyến chinh phạt đều trở nên mới mẻ và thú vị.</p>
                    <List ListItems={data[0]} shortlist={true}/>
                    <Link to={'/library'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                </div>
                <div className="content fade-in">
                    <div className='content-item'>
                        <h1 className='content-title'>Còn chần chờ gì nữa, hãy trở thành thợ săn kho báu và khám phá hầm ngục VIRESTY vĩ đại.</h1>
                        <a className='big-button' href='#/register'>ĐĂNG KÝ NGAY</a>
                        <div className='overlay-img'></div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Home;