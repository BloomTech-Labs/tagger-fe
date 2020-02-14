import React, { useState } from "react";
import "../landing_page.scss";
import img1 from "../images/computer_unsplash.jpg";
import shane from "./img/shane.png";
import richelle from "./img/richelle.png";
import matthew from "./img/matthew.png";
import michael from "./img/michael.png";
import teddy from "./img/teddy.png";
import quinton from "./img/quinton.png";
import edwin from "./img/edwin.png";
import marcus from "./img/marcus.png";
import jay from "./img/jay.png";
import samuel from "./img/samuel.png";
import john from "./img/john.png";

const AboutUs = () => {
  const [count, setCount] = useState(1);
  const titles = [
    "UX Designer",
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
      { pic: richelle, role: titles[0], name: "Richelle Ross" },
      { pic: matthew, role: titles[0], name: "Matthew Potter" }
    ],
    // 2: { },
    2: [
      { pic: michael, role: titles[1], name: "Michael Chrupcala" },
      { pic: teddy, role: titles[1], name: "Teddy Ngo" }
    ],
    // 4: ,
    3: [
      { pic: quinton, role: titles[1], name: "Quinton McNamee" },
      { pic: edwin, role: titles[1], name: "Edwin Parker" },
      { pic: marcus, role: titles[1], name: "Marcus Jones" }
    ],
    // 6: ,
    // 7: ,
    4: [
      { pic: jay, role: titles[2], name: "Jay Jacobsohn" },
      { pic: samuel, role: titles[2], name: "Samuel Hepner" },
      { pic: john, role: titles[2], name: "John Morrison" }
    ],
    // 9: ,
    // 10: ,
    5: [{ pic: shane, role: titles[3], name: "Shane Gooch" }]
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
