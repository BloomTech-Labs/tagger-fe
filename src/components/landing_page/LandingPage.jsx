import React from "react";
import "./landing_page.scss";
import img1 from "./images/computer_unsplash.jpg";
import img2 from "./images/friends_unsplash.jpg";
import img3 from "./images/gmail_unsplash.jpg";
import img4 from "./images/writing_unsplash.jpg";
import contacts from "./images/contact_dash.png";
import emails from "./images/email_dash.png";
import gif1 from "./images/gif1.gif";
import gif2 from "./images/gif2.gif";



const LandingPage = () => {
  const bannerStyle = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover"
  };
  return (
    <section className="landing-container">
      <nav className="landing-nav">
        <div className="logo">Tagger</div>
        <div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/inbox">Try It</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="landing-content">
        <div
          className="landing-section landing-banner"
          style={bannerStyle}
        ></div>

        <div className="landing-section landing-section1">
          <div className="landing-feature feature-1">
            <div>
              <h3>Stay connected</h3>
              <p>
                Whoever you're talking to -- clients, friends, or family -- stay
                in touch and see your connections right in your dashboard.
                You'll see stats that show you how frequently you email
                eachother, the last date that you contacted them, and more,
                right next to your messages.
              </p>
            </div>
            <img className="product-img" src={gif1}></img>
            {/* <video autoPlay loop muted playsInline key={gif1}>
                            <source src={gif1} type="video/mp4"></source>
                        </video> */}
          </div>
          <div className="bottom-border"></div>

          <div className="landing-feature feature-2">
            <img className="product-img" src={contacts}></img>
            <div>
              <h3>Gmail, but better</h3>
              <p>
                Our team's spent a lot of time with Gmail -- and even MORE time
                getting frustrated with it. Tagger is powered by your Gmail
                account and features a new & improved design, custom-made for
                your modern life.
              </p>
            </div>
          </div>
          <div className="bottom-border"></div>

          <div className="landing-feature feature-3">
            <div>
              <h3>Work smarter, not harder</h3>
              <p>
                Have you ever spent too long searching for an old email thread?
                Us too! Tagger was built to auto-tag and sort your messages
                using advanced Machine Learning tools, so you'll never lose
                track of the conversations that matter to you.
              </p>
            </div>
            <img className="product-img" src={gif2}></img>
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
          <li>
            <a href="#">Get To Know Us</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LandingPage;
