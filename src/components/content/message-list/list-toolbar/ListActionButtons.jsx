import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './listToolbar.scss';

const ListActionButtons = (props) => {
  const getClickHandler = (action) => {
    return evt => {
      props.onClick(action);
    };
  }

  const trashHandler = getClickHandler(["TRASH"]);

  return (
    <div>
      <div className="action-btn">
        <FontAwesomeIcon
          title="Move to Trash"
          onClick={trashHandler}
          icon={faTrash}
          size="lg"
        />
      </div>
    </div>
  );
}

export default ListActionButtons;

