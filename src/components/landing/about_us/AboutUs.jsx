import React, { useState } from "react";
import "../landing_page.scss";
import img1 from "../images/computer_unsplash.jpg";
import Andrew from "./img/Andrew.jpg";
import Jean from "./img/Jean.jpg";
import Luis from "./img/Luis.jpg";
import Mimi from "./img/Mimi.png";
import Nate from "./img/Nate.png";
import Raymond from "./img/Raymond.jpg";
import Rosie from "./img/Rosie.jpg";
import Vlad from "./img/Vlad.jpg";


const AboutUs = () => {
  const [count, setCount] = useState(1);
  const titles = [
    "Web Developer",
    "Data Scientist",
    "Team Leader"
  ];

  const bannerStyle = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover"
  };

  const imgs = {
    
    
    1: [
      { pic: Andrew, role: titles[1], name: "Andrew Wilson" },
      { pic: Luis, role: titles[1], name: "Luis Flores" }
    ],
  
    2: [
      { pic: Mimi, role: titles[1], name: "Mimi Hoang" },
      { pic: Raymond, role: titles[1], name: "Raymond Trinh" },
      { pic: Nate, role: titles[1], name: "Nate Mosco" }
    ],
    
    3: [
      { pic: Jean, role: titles[2], name: "Jean Pierre Fraga" },
      { pic: Rosie, role: titles[2], name: "Rosie Lasota" },
    ],
    
    4: [{ pic: Vlad, role: titles[3], name: "Vladislav Mogilevskiy" }]
  };
  const handleCount = action => {
    console.log("handleCount() in landing_page/about_us/AboutUs.jsx");
    if (action === "forward" && count === 5) {
      setCount(1);
    } else if (action === "back" && count === 1) {
      setCount(5);
    } else {
      if (action === "forward") {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }
    }
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
              <a href="/inbox">Sign In</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="landing-section landing-banner" style={bannerStyle}></div>

      <div className="landing-content2">
        <button className="carousel-button" onClick={() => handleCount("back")}>
          back
        </button>
        {console.log(imgs[count])}
        {imgs[count].map(i => (
          <div className="team-pic">
            <img
              src={i.pic}
              alt="aboutUs"
              style={{ width: "250px", height: "300px" }}
            />
            <h2>{i.role}</h2>
            <h3>{i.name}</h3>
          </div>
        ))}
        <button
          className="carousel-button"
          onClick={() => handleCount("forward")}
        >
          forward
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
