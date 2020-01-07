import React, { useState } from "react";
import shane from "./img/shane.png";
import richelle from "./img/richelle.png";
import matthew from "./img/matthew.png";
import michael from "./img/michael.png";
import teddy from "./img/teddy.png";
import quinton from "./img/quinton.png";
import edwin from "./img/edwin.png";
import marcus from "./img/matthew.png";
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
  const imgs = {
    1: { pic: richelle, role: titles[0] },
    2: { pic: matthew, role: titles[0] },
    3: { pic: michael, role: titles[1] },
    4: { pic: teddy, role: titles[1] },
    5: { pic: quinton, role: titles[1] },
    6: { pic: edwin, role: titles[1] },
    7: { pic: marcus, role: titles[1] },
    8: { pic: jay, role: titles[2] },
    9: { pic: samuel, role: titles[2] },
    10: { pic: john, role: titles[2] },
    11: { pic: shane, role: titles[3] }
  };
  const handleCount = action => {
    if (action === "forward" && count === 11) {
      setCount(1);
    } else if (action === "back" && count === 1) {
      setCount(11);
    } else {
      if (action === "forward") {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }
    }
  };

  return (
    <div>
      <button onClick={() => handleCount("back")}>back</button>
      <img
        src={imgs[count].pic}
        alt="aboutUs"
        style={{ width: "250px", height: "300px" }}
      />
      <button onClick={() => handleCount("forward")}>forward</button>
      <h2>{imgs[count].role}</h2>
    </div>
  );
};

export default AboutUs;
