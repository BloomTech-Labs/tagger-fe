import React from 'react';
import './landing_page.scss';
import img1 from './images/computer_unsplash.jpg';
import img2 from './images/friends_unsplash.jpg';
import img3 from './images/gmail_unsplash.jpg';
import img4 from './images/writing_unsplash.jpg';

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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>   
                    <li><a href="#">Try It</a></li>  
                    </ul>  
                </div>
            </nav>

            <div className="landing-content">
                <div className="landing-section landing-banner" style={bannerStyle}>

                </div>

                <div className="landing-section landing-section1">
                    <div className="landing-feature feature-1">
                        <div>
                            <h3>Lorem Ipsum.</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                        </div>
                        <img className="product-img" src={img2}></img>
                    </div>
                    <div className="bottom-border"></div>

                    <div className="landing-feature feature-2">
                    <img className="product-img" src={img3}></img>
                    <div>
                            <h3>Lorem Ipsum.</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                    </div>
                    </div>
                    <div className="bottom-border"></div>

                    <div className="landing-feature feature-3">
                    <div>
                            <h3>Lorem Ipsum.</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, delectus dignissimos. Sunt eligendi labore quod, temporibus placeat obcaecati officiis, est ipsam harum animi voluptatem vel qui iste! Tempore, tempora! Magni.</p>
                    </div>
                    <img className="product-img" src={img4}></img>
                    </div>
                </div>


                <div className="landing-section landing-section2"></div>
            </div>

            <div className="landing-footer">
                <address>
                    123 Fake Street <br></br>
                    San Francisco, CA <br></br>
                    United States 
                </address>
                <ul>
                    <li><a href="#">Get To Know Us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
        </section>
    );
}

export default LandingPage;