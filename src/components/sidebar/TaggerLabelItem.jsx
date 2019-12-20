import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaggerLabelItem = (props) => {

  const onClick = (evt) => {
    props.onClick(evt, props.id);
  }

  const { name, messagesUnread } = props;
  const iconProps = props.iconProps;

  let selected = props.selected ? " selected" : "";

  const messagesUnreadLocale = messagesUnread.toLocaleString();
  return (
    <li
      className={`text-truncate text-left text-dark pl-4 pr-5 py-2 border-0 ${selected}`}
      title={
        name + (messagesUnread > 0 ? ` (${messagesUnreadLocale})` : "")
      }
      onClick={onClick}
    >
      

      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        {iconProps.icon}
        </svg>
      {name}

      {messagesUnread > 0 ? (
        <div className={"msg-count"}>{messagesUnreadLocale}</div>
      ) : null}
    </li>
  );
}

export default TaggerLabelItem;