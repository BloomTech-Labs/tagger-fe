import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default props => {
  return (
    <div className="wrapper text-4">
      <div className="wrapper align-items-center text-2">
        <div className="text from-name">
          {props.fromName}
          {props.hover
          ? <FontAwesomeIcon className="ml-2" icon={faUserPlus}/>
          : null}
        </div>
        <div className="text">{props.subject}</div>
      </div>
    </div>
  );
};
