import React from "react";
import { withRouter } from "react-router-dom";
import he from "he";
import moment from "moment";
import MesssageCheckbox from "../../content/message-list/message-row/MessageCheckbox";

import NameSubjectFields from "../../content/message-list/message-row/NameSubjectFields";
import AttachmentDateFields from "../../content/message-list/message-row/AttachmentDateFields";
import {getNameEmail} from '../../../utils';
import '../contact-messages.scss';

const MessageItem = (props) => {

  const onSelectionChange = (evt) => {
    props.onSelectionChange(evt.target.checked, props.data.id);
  }

  const getMessage = (evt) => {
    props.history.push(`/${props.data.id}`);
  }

  const getFromName = (from) => {
    const nameEmail = getNameEmail(from);
    return nameEmail.name;
  }

  const getFormattedDate = (date, fallbackDateObj) => {
    let messageDate = moment(date);
    if (!messageDate.isValid()) {
      messageDate = moment(fallbackDateObj.parserFn(fallbackDateObj.date));
    }
    const nowDate = moment(new Date());
    const isMessageFromToday = messageDate.format("YYYYMMDD") === nowDate.format("YYYYMMDD");
    let formattedDate;
    if (isMessageFromToday) {
      formattedDate = messageDate.format("h:mm A");
    }
    else {
      if (messageDate.year() !== nowDate.year()) {
        formattedDate = messageDate.format("YYYY/MM/DD");
      }
      else {
        formattedDate = messageDate.format("MMM D");
      }
    }
    return formattedDate;
  }

  const receivedHeader = props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
  const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
  let formattedDate = getFormattedDate(date, {date: props.data.internalDate, parserFn: parseInt});
  const unread = props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
  const selected = props.data.selected ? " selected" : "";
  const subjectHeader = props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
  const subject = subjectHeader ? subjectHeader.value : "";
  const fromHeader = props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
  let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";

  let snippet = props.snippet;
  if (snippet.length > 180) {
    snippet = snippet.substring(0, 180);
  }

  return (
          //This commented code is from the original application....useful as a reference but we're building new cards.
    // <div className={`d-flex table-row-wrapper${selected}`}>
    //   <MesssageCheckbox
    //     selected={props.data.selected}
    //     onChange={onSelectionChange}
    //   />
    //   <div
    //     onClick={getMessage}
    //     className={`table-row px-2 py-3${unread}`}
    //   >
    //     <NameSubjectFields fromName={fromName} subject={subject} />
    //     <AttachmentDateFields
    //       formattedDate={formattedDate}
    //       hasAttachment={
    //         props.data.payload.mimeType === "multipart/mixed"
    //       }
    //     />
    //   </div>
    // </div>

    <section className="message-tile">
        <div className="message-card">
          <div className="message-subject">
            <NameSubjectFields fromName={fromName} subject={subject} />
            <AttachmentDateFields
                formattedDate={formattedDate}
                hasAttachment={
                    props.data.payload.mimeType === "multipart/mixed"
                }/>
          </div>
          <div className="tagger-tag">Tagger Tag</div>
          <div className="snippet">
            {he.decode(snippet)}
          </div>
        </div>
        <hr className="my-1" />
        <div className="thread-count">
          xyz more messages
        </div>
    </section>

  );
}

export default withRouter(MessageItem);
