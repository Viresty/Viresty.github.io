import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";

import List from './../components/list'
import Banner from './../components/banner'

import "swiper/css";
import "swiper/css/pagination";
import './../css/home-layout.css';

import { Mousewheel, Pagination } from "swiper";

import { reloadAnimation } from '../function/page'
import data from '../data/test-data.json';

const img = {url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627bc589-b21e-47b2-8cf2-7617185ee1ac/d4n4zuk-f6474775-f789-459c-833e-89ffd068b654.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyN2JjNTg5LWIyMWUtNDdiMi04Y2YyLTc2MTcxODVlZTFhY1wvZDRuNHp1ay1mNjQ3NDc3NS1mNzg5LTQ1OWMtODMzZS04OWZmZDA2OGI2NTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9XxbT2tBslr_SHGEAA4u_5QCwhppgUj6K-BiJsHo4ms',
                alt: 'viresty'}

const Home = () => {
    
    
    useEffect(() => {
        
        document.getElementById('footer-container').classList.add("closed");
        reloadAnimation();
        document.getElementById('header-container').style.backgroundColor = 'transparent';
        
        return () => {
            document.getElementById('footer-container').classList.remove("closed");
            document.getElementById('footer-container').classList.remove("hidden");
            document.getElementById('header-container').style.backgroundColor = '#282c34';
        };
    
    }, [])

    return (
        <div className='container home-layout'>
            <div id='page-banner'>
                <div className='overlay-img'></div>
            </div>
            <div className='container' id="body-container">
                <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    mousewheel={{
                        enable: false,
                        releaseOnEdges: true
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    onSlideChange={(swiper) => {
                        if (swiper.isBeginning)
                            document.getElementById('header-container').style.backgroundColor = '#00000000';
                        else document.getElementById('header-container').style.backgroundColor = '#282c34';
                        if (swiper.isEnd) {
                            document.getElementById('footer-container').classList.remove("hidden");
                            document.getElementById("footer-container").scrollIntoView();
                        }
                        else {
                            document.getElementById('footer-container').classList.add("hidden");
                            document.getElementById("body-container").scrollIntoView();
                        }
                    }}
                    modules={[Mousewheel, Pagination]}
                    className="homeSwiper"
                >
                    <SwiperSlide>
                    <div className='content page-title FadeInAnimation'>
                        <h2>VUA HẦM NGỤC</h2>
                        <h1 className='textshadowAnimation'>VIRESTY</h1>
                        <p>Game thẻ bài chiến đấu, sinh tồn và khám phá hầm ngục</p>
                        <a className='big-button' href='#/play'>CHƠI NGAY</a>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="content fade-in">
                            <h1 className="content-title">Khám phá hầm ngục vô tận.</h1>
                            <p className="content-detail">Rút bài, trang bị những vũ khí huyền thoại, sử dụng các là bài phép hùng mạnh để chinh phục hầm ngục sâu thẳm.</p>
                            <img className='open-img content-img content-main' src={img.url}
                                alt="viresty"></img>
                            <Link to={'/rule'} className='content-link'>LUẬT CHƠI <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="content fade-in">
                        <h1 className="content-title">Lập kế hoạch, chuẩn bị hành trang</h1>
                        <p className="content-detail">Tận dụng kho báu tìm được để tăng chiến lực, lựa chọn nâng cấp phù hợp giúp đối phó các kẻ địch mạnh mẽ.</p>
                        <img className='open-img content-img content-main' src=''
                            alt="viresty"></img>
                        <Link to={'/library'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='content fade-in'>
                        <h1 className='content-title'>Chức nhiệp đa dạng</h1>
                        <p className="content-detail">Mỗi chức nghiệp đều có điểm mạnh, chỉ số cơ bản, khả năng và các kĩ năng tất sát mạnh mẽ riêng biệt.</p>
                        <p className='content-notice'>Nhấp chọn để xem chi tiết.</p>
                        <div className='content-main'>
                            <Banner ListItems={data[0]}/>
                        </div>
                        <Link to={'/library'} className='content-link'>XEM THÊM <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='content fade-in'>
                        <h1 className='content-title'>Chiến thuật linh động</h1>
                        <p className="content-detail">Hàng trăm thẻ bài trang bị và phép thuật khiến mỗi chuyến chinh phạt đều trở nên mới mẻ và thú vị.</p>
                        <div className='content-main'>
                            <List ListItems={data[0]} shortlist={true} cardPreview={true} link="/library/" />
                        </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="content">
                        <div className='content-item'>
                            <h1 className='content-title'>Còn chần chờ gì nữa, hãy trở thành thợ săn kho báu và khám phá hầm ngục VIRESTY vĩ đại.</h1>
                            <a className='big-button' href='#/register'>ĐĂNG KÝ NGAY</a>
                            <div className='overlay-img'></div>
                        </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </div>
        </div>
  );
}

export default Home;