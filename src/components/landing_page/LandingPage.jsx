import React from 'react';
import './landing_page.scss';
import img1 from './images/computer_unsplash.jpg';

const LandingPage = () => {
    const bannerStyle = {
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover"
    }
    return (
        <section className="landing-container">
            <nav className="landing-nav">
                <div className="logo">
                    Tagger
                </div>
                <div>
                    <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>   
                    <li><a href="">Tagger</a></li>  
                    </ul>  
                </div>
            </nav>

            <div className="landing-content">
                <div className="landing-section landing-banner" style={bannerStyle}>

                </div>

                <div className="landing-section landing-section1">
                    <div className="landing-feature feature-1">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                    </div>
                    <div className="landing-feature feature-2">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                    </div>
                    <div className="landing-feature feature-3">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                    </div>
                </div>


                <div className="landing-section landing-section2"></div>
            </div>
        </section>
    );
}

export default LandingPage;