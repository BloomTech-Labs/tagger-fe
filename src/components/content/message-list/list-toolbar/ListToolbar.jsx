import React, { useState } from "react";
import Checkbox from "../../../common/Checkbox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  toggleSelected,
  modifyMessages
} from "../actions/message-list.actions";
import Pager from "../pager-buttons/PagerButtons";
import ListActionButtons from "./ListActionButtons";

const MessageToolbar = (props) => {
  const [selectedMessageIds, setSelectedMessageIds] = useState([]);

  const onSelectionChange = (evt) => {
    const checked = evt.target.checked;

    const messageIds = props.messagesResult.messages.reduce((acc, el) => {
      acc.push(el.id);
      return acc;
    }, []);

    setSelectedMessageIds(messageIds);

    props.toggleSelected(messageIds, checked);
  }

  const navigateToNextPage = () => {
    props.navigateToNextPage(props.nextToken);
  }

  const navigateToPrevPage = () => {
    props.navigateToPrevPage(props.prevToken);
  }

  const modifyMessages = (addLabelIds, removeLabelIds) => {
    const ids = props.messagesResult.messages.filter(el => el.selected).map(el => el.id);
    const actionParams = {
      ...addLabelIds && {addLabelIds},
      ...removeLabelIds && {removeLabelIds}
    };
    props.modifyMessages({ ids, ...actionParams});
  }

  let checked = false;
  let selectedMessages = [];

  if (props.messagesResult) {
    selectedMessages = props.messagesResult.messages.filter(el => el.selected);
    checked = props.messagesResult.messages.length > 0 &&  selectedMessages.length === props.messagesResult.messages.length;
  }

  return (
    <div className="msg-toolbar">
      <div className="pl-2 py-2 pr-4 d-flex align-items-center bd-highlight ">
        <div className="d-flex align-content-center align-items-center">
          <div>
            <Checkbox checked={checked} onChange={onSelectionChange} />
          </div>
          <div />

          <div className="ml-auto p-2 bd-highlight">
            <div>
              {selectedMessages.length ? (
                <ListActionButtons onClick={modifyMessages} />
              ) : null}
            </div>
          </div>
        </div>

        <Pager
          nextToken={props.nextToken}
          prevToken={props.prevToken}
          navigateToPrevPage={navigateToPrevPage}
          navigateToNextPage={navigateToNextPage}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  messagesResult: state.messagesResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleSelected,
      modifyMessages
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageToolbar);
