import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LabelItem = (props) => {

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
      <FontAwesomeIcon size="sm" {...iconProps} />
      {name}

      {messagesUnread > 0 ? (
        <div className={"msg-count"}>{messagesUnreadLocale}</div>
      ) : null}
    </li>
  );
}

export default LabelItem;
