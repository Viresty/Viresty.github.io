import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeBanner } from './../actions/banner';

import './../css/banner.css';

class Banner extends Component {
    constructor(props) {
      super(props);
      this.changeBannerimg = this.changeBannerimg.bind(this);
      this.closeBannerimg = this.closeBannerimg.bind(this);
      this.state = {
      }
    }

    closeBannerimg() {
        document.querySelector('input[name="banner"]:checked').parentNode.parentNode.classList.remove('selected');
        document.querySelector('input[name="banner"]:checked').checked = false;
        document.getElementById('banner-content-img').classList.add('closeImgAnimation');
        setTimeout(()=>{
            document.getElementById('banner-content-img').classList.add('hidden');
            document.getElementById('banner_home').classList.add('list-card');
        }, 510);
        setTimeout(()=>{
            document.getElementById('banner-content-img').classList.remove('closeImgAnimation');
            document.getElementById('banner-content-img').classList.remove('openImgAnimation');
        }, 520);
    }

    changeBannerimg(item, targetID) {
        // document.querySelector('input[name="banner"]:checked').classList.add('selected');
        document.getElementById(targetID).classList.add('selected');

        let listUnchk = document.querySelectorAll('input[name="banner"]:not(:checked)');
        listUnchk.forEach(bannerImg => {
            bannerImg.parentNode.parentNode.classList.remove('selected');
        })

        document.getElementById('banner-content-img').classList.remove('hidden');
        document.getElementById('banner_home').classList.remove('list-card');
        this.props.changeBanner(item);
        document.getElementById('banner-content-img').classList.remove('openImgAnimation');
        setTimeout(()=>{document.getElementById('banner-content-img').classList.add('openImgAnimation');}, 5);
    }

    render() {
        
        const ListItems = this.props.ListItems.map((item, idx) => {
            return <li key={idx} id={'bannerImg'+idx}>
                        <label onClick={() => {this.changeBannerimg(item, 'bannerImg'+idx)}}>
                            <input type="radio" name="banner" />
                            <img className='banner-list-img fade-in' src= {item.url} alt={item.alt}></img>
                        </label>
                    </li>
            });

        return (
            <div className="banner list-card" id='banner_home'>
                <ul className='banner-list' id='banner-list_home'>
                    {ListItems}
                </ul>
                <div className='banner-content hidden' id='banner-content-img'>
                    <img src={this.props.banner.url} alt={this.props.banner.alt}></img>
                    <div id='img-gradient'>
                    </div>
                    <button onClick={() => this.closeBannerimg()} className='close-btn'>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        );
        }
    }

    const mapStateToProps = (state) => {
        const banner = state.banner;
        return {
            banner
        };
    };


    const mapDispatchToProps = {
        changeBanner,
    };

export default connect(mapStateToProps, mapDispatchToProps)(Banner);