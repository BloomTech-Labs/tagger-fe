import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Reply from "./Reply";

import { changeIsDisplayingAnalytics, changeAnalyticsContact } from "../../actions";
import { setAnalyticsContact } from "./helpers/AnalyticsHelper";
import FullHeightIFrame from "./FullHeightIFrame";
import SmartButton from "./SmartButton";


const S = {
    Container: styled.div`
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.5%;
        padding: 1%;
        font-size: 0.8rem;
        background-color: white;
        border-radius: 3px;
    `,
    ContactHeader: styled.div`
        display: flex;
        justify-content: space-between;
        height: 40px;
        box-sizing: border-box;
        width: 100%;
        align-items: center;
    `,
    ContactInfo: styled.div`
        width: 40%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        h3 {
            margin-left: 0;
            border-bottom: 1px solid #00000000;

            :hover {
                color: #2196f3;
                font-weight: 900;
                border-bottom: 1px solid #00000033;
                text-shadow: 0px 1px #2196f387;
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

            span {
                overflow: hidden;
                white-space: nowrap;
                word-break: break-word;
                text-align: left;
                text-overflow: ellipsis;
            }
        }
    `,
    MessageActions: styled.div`
        width: 20%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i:hover {
            color: #2196f3;
            font-weight: 900;
            border-bottom: 1px solid #00000033;
            text-shadow: 0px 1px #2196f387;
            cursor: pointer;
        }
        i:active {
            background: #9893613b;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
            cursor: pointer;
        }
    `,
    Avatar: styled.img`
        height: 30px;
        width: 30px;
        background-color: black;
        border-radius: 15px;
        :hover {
            cursor: pointer;
        }
        :active {
            cursor: pointer;
        }
    `,
    Subject: styled.h2``,
    Message: styled.article`
        text-align: left;
    `,
    Spinner: styled.div`
        border: 2px solid #f3f3f3; /* Light grey */
        border-top: 2px solid #2f86ff; /* Blue */
        border-bottom: 2px solid #2f86ff; /* Blue */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `
};

const ThreadMessage = props => {
  const [replyIsHidden, setReplyIsHidden] = useState(true);
  const [responseType, setResponseType] = useState("Reply");
  function setContact() {
    if (props.snippetsFilter === "\\Sent" || props.snippetsFilter === "\\Draft" ) {
      setAnalyticsContact(props, props.email.to[0])
    } else {
      setAnalyticsContact(props, props.email)
    }
  }
  return (
    <S.Container>
      <S.ContactHeader>
        <S.ContactInfo>
          {/* The onClick for avatar sets the analytics contact  */}
          <S.Avatar
            src={"https://i.postimg.cc/kX2k4dmS/avatar-Placeholder.png"}
            onClick={() => setContact() }
          />{" "}
          {/* this ternary checks if the snippetsFilter is set to "\Sent" or "\Draft" and if it is, it maps over the to array from the email object to display every email address the email was sent to. If the snippetsFilter is not set to "\Sent" or "\Draft" it displays the name of whoever sent the email if they have one, otherwise it displays the email of whoever sent it to */}
          {(props.snippetsFilter === "\\Sent" && props.email.to) ||
          (props.snippetsFilter === "\\Draft" && props.email.to) ? (
            props.email.to.map((contact, i) => {
              var arrayLength = props.email.to.length;
              return (
                <span
                  key={Math.random()}
                  onClick={() => setAnalyticsContact(props, contact)}
                >
                  {/* the JavaScript below this adds a comma after all email addresses except for the last one */}
                  {i !== arrayLength - 1 ? contact + ", " : contact}
                </span>
              );
            })
          ) : props.email.name ? (
            <h3 onClick={() => setAnalyticsContact(props, props.email)}>
              {props.email.name}
            </h3>
          ) : (
            <h3 onClick={() => setAnalyticsContact(props, props.email)}>
              {props.email.from}
            </h3>
          )}
        </S.ContactInfo>
        <S.MessageActions>
        <SmartButton thisEmail={props.email} />
          <i
            title="Reply"
            className="fa fa-reply button"
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply");
            }}
          ></i>
          <i
            title="Reply-All"
            className="fa fa-reply-all button"
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply-All");
            }}
          ></i>
          <i
            title="Delete Email"
            className="fas fa-trash-alt button"
            onClick={() => {
              setReplyIsHidden(false);
              // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
            }}
          ></i>
        </S.MessageActions>
      </S.ContactHeader>

      <S.Subject>{props.email.subject}</S.Subject>
      { /* the spinner displays if isLoaded is false  */}
      <S.Spinner
        style={{
          display:
            props.isLoaded === false
              ? "block"
              : props.email.email_body === "false" ||
                props.email.email_body === "0" ||
                props.isLoaded === true
              ? "none"
              : "block"
        }}
      ></S.Spinner>
      {/* the ternary below checks to see if the email object has html if it doesn't then it displays the the plain text instead of the HTML */}
      {props.email.email_body === "false" || props.email.email_body === "0" ? (
        <S.Message>{props.email.email_body_text}</S.Message>
      ) : (
        <FullHeightIFrame src={props.email.email_body} />
      )}
      {/* the ternary below checks to see if replyIsHidden is true, if it is the Reply component is hidden, if it's false the reply component is shown */}
      {replyIsHidden ? null : (
        <Reply
          responseType={responseType}
          setResponseType={setResponseType}
          email={props.email}
          setReplyIsHidden={setReplyIsHidden}
          token={props.token}
        />
      )}
    </S.Container>
  );
};

const mapStateToProps = ({ inbox, contacts }) => ({
    contacts: contacts.contacts,
    isLoaded: inbox.isIframeLoaded,
    snippetsFilter: inbox.snippetsFilter,
    analyticsContact: inbox.analyticsContact
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeIsDisplayingAnalytics,
            changeAnalyticsContact
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ThreadMessage);
