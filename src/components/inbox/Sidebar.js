import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFile,
  faEnvelope,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import {
  setSnippetFilter,
  clearSmartSearch,
  changeIsComposing,
  setIsDisplayingInSnippets
} from "../../actions";
import ComposeComponent from "../compose/Compose";

const Sidebar = props => {


  const toggleIsComposing = () => {
    props.changeIsComposing(!props.isComposing);
    props.setIsCompose(true);
  };

  const setFilter = filterName => {
    props.clearSmartSearch();
    props.setSnippetFilter(filterName);
    props.setIsDisplayingInSnippets(false);
  };

  return (
    <div className="sidebar col">
      {/* clicking the "+ compose" button toggles the compose module to display */}
      {/* {props.isComposing && (
        <S.ModalContainer>
          <ComposeComponent token={props.token} />
        </S.ModalContainer>
      )} */}
      {/* <S.Button onClick={toggleIsComposing}>+ Compose</S.Button> */}
      <input type="button" className="compose btn" onClick={toggleIsComposing} value="Compose" />
      <nav>
        {/* this onClick sets the snippets to filter email by received */}
        <li onClick={() => setFilter("\\Inbox")}><FontAwesomeIcon icon={faInbox} />Inbox</li>
        {/* this onClick sets the snippets to filter email by sent */}
        <li onClick={() => setFilter("\\Sent")}><FontAwesomeIcon icon={faEnvelope} />Sent</li>
        {/* this onClick sets the snippets to filter email by drafts */}
        <li onClick={() => setFilter("\\Draft")}><FontAwesomeIcon icon={faFile} />Draft</li>
      </nav>
      <div className="tags">
        <li><FontAwesomeIcon icon={faTags} />Tags</li>
      </div>
      <ul>
        {props.boxes.map((box, i) => {
          return (
            <li key={i} onClick={() => props.setSnippetFilter(`${box.name}`)}>
              {box.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ user, composer, inbox }) => ({
  isComposing: composer.isComposing,
  snippetsFilter: inbox.snippetsFilter,
  emailAddress: user.emailAddress,
  boxes: user.boxes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsComposing,
      setSnippetFilter,
      clearSmartSearch,
      setIsDisplayingInSnippets
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
