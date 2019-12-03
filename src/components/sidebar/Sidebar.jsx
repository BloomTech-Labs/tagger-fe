import React, { useEffect, useState } from "react";

import ComposeMessage from "../compose-message/ComposeMessage";
import PerfectScrollbar from "react-perfect-scrollbar";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

import {
  faInbox,
  faEnvelope,
  faTrash,
  faCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import LabelItem from "./LabelItem";

import "./sidebar.scss";

const Sidebar = (props) => {
  const [selectedLabel, setSelectedLabel] = useState();
  
  useEffect(() => {
    setSelectedLabel(props.pathname)
  }, [props.pathname])

  const navigateToList = (evt, labelId) => {
    const label = props.labelsResult.labels.find(el => el.id === labelId);
    props.onLabelClick(label || { id: "" });
  }

  const renderItems = (labelList) => {
    if (labelList.length === 0) {
      return <div />;
    }

    const labels = labelList.reduce((acc, el) => {
      acc.push(el);
      return acc;
    }, []);

    const labelGroups = groupBy(labels, "type");

    const visibleLabels = labelGroups.user.filter(
      el =>
        //el.labelListVisibility === "labelShow" ||
        //el.labelListVisibility === "labelShowIfUnread" ||
        !el.labelListVisibility || true
    );
    const sortedLabels = sortBy(visibleLabels, "name");

    return (
      <React.Fragment>
        {renderFolders(labelGroups.system)}
        {renderLabels(sortedLabels)}
      </React.Fragment>
    );
  }

  const renderFolders = (labels) => {
    const inboxLabel = {
      ...labels.find(el => el.id === "INBOX"),
      name: "Inbox",
      icon: faInbox
    };
    const sentLabel = {
      ...labels.find(el => el.id === "SENT"),
      messagesUnread: 0,
      name: "Sent",
      icon: faEnvelope
    };
    const trashLabel = {
      ...labels.find(el => el.id === "TRASH"),
      messagesUnread: 0,
      name: "Trash",
      icon: faTrash
    };
    const spamLabel = {
      ...labels.find(el => el.id === "SPAM"),
      name: "Spam",
      icon: faExclamationCircle
    };

    const folders = [inboxLabel, sentLabel, trashLabel, spamLabel];

    return (
      <React.Fragment>
        <li key="olders-nav-title" className="pl-2 nav-title">
          Folders
        </li>
        {folders.map(el => {
          const iconProps = { icon: el.icon, size: "lg" };
          return (
            <LabelItem
              key={el.id + "_label"}
              onClick={navigateToList}
              name={el.name}
              id={el.id}
              messagesUnread={el.messagesUnread}
              iconProps={iconProps}
              selected={el.selected}
            />
          );
        })}
      </React.Fragment>
    );
  }

  const renderLabels = (labels) => {
    console.log(labels);

    let taggerLabels = ["tagger_Finance", "tagger_Personal", "tagger_Productivity", "tagger_Promotions", "tagger_Security", "tagger_Shopping", "tagger_Social"]

    labels.map(label => {
      taggerLabels.map((taggerLabel, index) => {
        if (taggerLabel === label.name) {
          taggerLabels.splice(index, 1);
        }
      })
    })

    return (
      <React.Fragment>
        <li key="olders-nav-title" className="pl-2 nav-title">
          Labels
        </li>
        {labels.filter(el => el.name.includes('tagger_')).map(el => {
          const iconProps = {
            icon: faCircle,
            color: el.color ? el.color.backgroundColor : "gainsboro",
            size: "sm"
          };

          const name = el.name.substring(7);

          return (
            <LabelItem
              key={el.id + "_label"}
              onClick={navigateToList}
              name={name}
              id={el.id}
              messagesUnread={el.messagesUnread}
              iconProps={iconProps}
              selected={el.selected}
            />
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <nav className="d-flex flex-column text-truncate left-panel">
      <div className="compose-panel">
        <div className="d-flex justify-content-center p-2 compose-btn">
          <ComposeMessage
            subject=""
            to=""
          >
            <button className="btn btn-dark align-self-center w-75 font-weight-bold">
              Compose
            </button>
          </ComposeMessage>
        </div>
      </div>
      <PerfectScrollbar
        component="ul"
        className="d-flex flex-column border-0 m-0 sidebar"
      >
        {renderItems(props.labelsResult.labels)}
      </PerfectScrollbar>
    </nav>
  );
}

export default Sidebar;
