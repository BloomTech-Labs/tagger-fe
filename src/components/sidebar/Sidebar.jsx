import React, { useEffect, useState } from "react";

import ComposeMessage from "../compose-message/ComposeMessage";
import PerfectScrollbar from "react-perfect-scrollbar";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
// import taEvents from '../images/Ellipse 63.svg'
// import taEntertainment from '../images/Ellipse 64.svg'
// import taFinance from '../images/Ellipse 65.svg'
// import taProductivity from '../images/Ellipse 66.svg'
// import taShopping from '../images/Ellipse 67.svg'
// import taSocial from '../images/Ellipse 68.svg'
// import taTravel from '../images/Ellipse 69.svg'
// import taOther from '../images/Ellipse 70.svg'

import {
  faInbox,
  faEnvelope,
  faTrash,
  faCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import LabelItem from "./LabelItem";
import TaggerLabelItem from "./TaggerLabelItem";

import "./sidebar.scss";

const Sidebar = (props) => {
  const [selectedLabel, setSelectedLabel] = useState();
  
  useEffect(() => {
    console.log("useEffect() in sidebar/Sidebar.jsx")
    setSelectedLabel(props.pathname)
  }, [props.pathname])

  const navigateToList = (evt, labelId) => {
    console.log("navigateToList() in sidebar/Sidebar.jsx")
    const label = props.labelsResult.labels.find(el => el.id === labelId);
    props.onLabelClick(label || { id: "" });
  }

  const renderItems = labelList => {
    console.log("renderItems() in sidebar/Sidebar.jsx")
    if (labelList.length === 0) {
      return <div />;
    }

    const labels = labelList.reduce((acc, el) => {
      acc.push(el);
      return acc;
    }, []);

    const labelGroups = groupBy(labels, "type");

    if (!labelGroups.user) {
      return (
        <React.Fragment>
          {renderFolders(labelGroups.system)}
        </React.Fragment>
      )
    }

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
    console.log("renderFolders() in sidebar/Sidebar.jsx")
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

    console.log("renderLabels() in sidebar/Sidebar.jsx")

    const taggerIcon = (el) => {
      if (el.name === "tagger_Entertainment") {
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#BD6906"/>
      } else if (el.name === "tagger_Events"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#FD9D2C"/>
      } else if (el.name === "tagger_Finance"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#E7DD00"/>
      } else if (el.name === "tagger_Other"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#777777"/>
      } else if (el.name === "tagger_Productivity"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#06B2BD"/>
      } else if (el.name === "tagger_Shopping"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#2C84FD"/>
      } else if (el.name === "tagger_Social"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#FF0099"/>
      } else if (el.name === "tagger_Travel"){
        return <circle cx="6.5" cy="6.5" r="6.5" fill="#42F68A"/>
      }
    }

    return (
      <React.Fragment>
        <li key="olders-nav-title" className="pl-2 nav-title">
          Tags
        </li>
        {labels.filter(el => el.name.includes('tagger_')).map(el => {
          const iconProps = {
            icon: taggerIcon(el),
            color: el.color ? el.color.backgroundColor : "gainsboro",
            size: "sm"
          };

          const name = el.name.substring(7);
          return (
            <TaggerLabelItem
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
