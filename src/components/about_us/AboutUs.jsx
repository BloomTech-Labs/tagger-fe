import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shane from "./img/shane.jpg";
import richelle from "./img/richelle.jpg";
import matthew from "./img/matthew.jpg";
import michael from "./img/michael.jpg";
import teddy from "./img/teddy.jpg";
import quinton from "./img/quinton.jpg";
import edwin from "./img/edwin.jpg";
import marcus from "./img/matthew.jpg";
import jay from "./img/jay.jpg";
import samuel from "./img/samuel.jpg";
import john from "./img/john.jpg";

const AboutUs = () => {
  const [count, setCount] = useState(1);
  const imgs = {
    1: richelle,
    2: matthew,
    3: michael,
    4: teddy,
    5: quinton,
    6: edwin,
    7: marcus,
    8: jay,
    9: samuel,
    10: john,
    11: shane
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
      <button onClick={() => handleCount("forward")}>y</button>
      <FontAwesomeIcon icon="arrow" />
      <img
        src={imgs[count]}
        alt="aboutUs"
        style={{ width: "50px", height: "50px" }}
      />
      <button onClick={() => handleCount("back")}>x</button>
    </div>
  );
};

export default AboutUs;
