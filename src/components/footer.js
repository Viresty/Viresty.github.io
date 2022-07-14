import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../css/footer.css';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        general: [
            {name: 'VỀ CHÚNG TÔI',
             id: 'about-us',
             link: '/about-us'},
            {name: 'DIỄN ĐÀN',
             id: 'forum',
             link: '/forum'},
            {name: 'FAQs',
             id: 'faqs',
             link: '/faqs'},
        ]
      }
    }

    render() {

        const general = this.state.general.map((item, idx) => {
            return <li key={idx}><Link id={item.id+'NavLinkItem'} to={item.link}>{item.name}</Link></li>
          });

        return (
            <div className='container' id="footer-container">
                <div className='content' id="footer-content">
                    <div id='general-contact'>
                        <p>CHUNG</p>
                        <ul>
                            {general}
                        </ul>
                    </div>
                    <div id='footer-contact'>
                        <p>LIÊN HỆ</p>
                        <address>
                            Email: <a herf='mailto:viresty@example.com'>viresty@example.com</a>.<br></br>
                            Phone: <a herf='tel:123-456-7890'>123-456-7890</a>
                        </address>
                    </div>
                </div>
            </div>
        );
    }
  }

export default Footer;