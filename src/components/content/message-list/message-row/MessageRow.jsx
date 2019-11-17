import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import MesssageCheckbox from "./MessageCheckbox";

import NameSubjectFields from "./NameSubjectFields";
import AttachmentDateFields from "./AttachmentDateFields";
import {getNameEmail} from '../../../../utils';

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

  return (
    <div className={`d-flex table-row-wrapper${selected}`}>
      <MesssageCheckbox
        selected={props.data.selected}
        onChange={onSelectionChange}
      />
      <div
        onClick={getMessage}
        className={`table-row px-2 py-3${unread}`}
      >
        <NameSubjectFields fromName={fromName} subject={subject} />
        <AttachmentDateFields
          formattedDate={formattedDate}
          hasAttachment={
            props.data.payload.mimeType === "multipart/mixed"
          }
        />
      </div>
    </div>
  );
}

export default withRouter(MessageItem);
