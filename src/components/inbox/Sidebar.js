import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFile,
  faPaperPlane,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import {
  setSnippetFilter,
  clearSmartSearch,
  changeIsComposing,
  setIsDisplayingInSnippets
} from "../../actions";
import ComposeComponent from "../compose/Compose";
const S = {
  ModalContainer: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Container: styled.div`
    flex-direction: row;
    // height: calc(100vh-64px);
    height: 100%;
    width: 230px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-right: solid #e0e0e0 1px;

    hr {
      width: 90%;
      margin: 15% auto;
    }

    ul {
      padding: 0px;
      list-style-type: none;
      margin: 0px;
      display: flex;
      flex-direction: column;
      margin-left: 15%;

      li {
        display: flex;
        font-size: 1rem;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        color: #454545;
        align-items: center;
        margin-bottom: 3vh;
        border-bottom: 1px solid #00000000;
       
      :hover {
        color: #2196F3;
        font-weight: 900;
        border-bottom: 1px solid #00000033;
        text-shadow: 0px 1px #2196f387;
        cursor:pointer;
      }
      :active {
          background: #9893613b;
          -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
          -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
          box-shadow: inset 0px 0px 5px #c1c1c1;
          outline: none;
          cursor:pointer;
      }
        
        div {
          width: 30px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      li:nth-last-child(1) {
        margin: 0px;
      }
    }
  };

  `,
  Button: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 35px;
    color: white;
    background-color: #2f86ff;
    border-radius: 6px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin: 8% 0%;
    margin-left: calc((100% - 110px) / 2);
    :hover {
      cursor: pointer;
    }
    :active {
      background: #9893613b;
      -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
      -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
      box-shadow: inset 0px 0px 5px #c1c1c1;
      outline: none;
      cursor: pointer;
    }
  `,

  FontAwesomeIcon: styled(props => <FontAwesomeIcon {...props} />)`
    margin-right: 5px;
    color: grey;
  `
};

const Sidebar = props => {
  const toggleIsComposing = e => {
    e.preventDefault();
    props.changeIsComposing(!props.isComposing);
  };

  const setFilter = filterName => {
    props.clearSmartSearch();
    props.setSnippetFilter(filterName);
    props.setIsDisplayingInSnippets(false);
  };

  return (
    <S.Container>
      {/* clicking the "+ compose" button toggles the compose module to display */}
      {props.isComposing ? (
        <S.ModalContainer>
          <ComposeComponent token={props.token} />
        </S.ModalContainer>
      ) : null}
      <S.Button onClick={toggleIsComposing}>+ Compose</S.Button>

      <ul>
        {/* this onClick sets the snippets to filter email by received */}
        <li onClick={() => setFilter("\\Inbox")}>
          <div>
            <S.FontAwesomeIcon icon={faInbox} />
          </div>
          <span>Inbox</span>
        </li>
        {/* this onClick sets the snippets to filter email by sent */}
        <li onClick={() => setFilter("\\Sent")}>
          <div>
            <S.FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <span>Sent</span>
        </li>
        <li>
          <div>
            <S.FontAwesomeIcon icon={faFile} />
          </div>
          {/* this onClick sets the snippets to filter email by drafts */}
          <span onClick={() => setFilter("\\Draft")}>Drafts</span>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <div>
            <S.FontAwesomeIcon icon={faTags} />
          </div>
          Tags
        </li>
      </ul>
      <ul>
        {props.boxes.map((box, i) => {
          return (
            <li key={i} onClick={() => props.setSnippetFilter(`${box.name}`)}>
              {box.name}
            </li>
          );
        })}
      </ul>
    </S.Container>
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
