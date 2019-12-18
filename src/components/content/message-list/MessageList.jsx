import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";
import MessageRow from "./message-row/MessageRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ContactMessageRow from '../../contact-messages/contact-message-row/ContactMessageRow';
import ListToolbar from "./list-toolbar/ListToolbar";
import ListFooter from "./list-footer/ListFooter";
import {getFilterCounts} from './actions/message-list.actions';

import "./messageList.scss";

const ViewMode = {
  LIST: 1,
  CONTENT: 2,
  EDIT: 3
};

const MessageList = (props) => {
    //Update this based on the user's filter input in Header.
  // const [filter, setFilter] = useState(false);
  const [viewMode, setViewMode] = useState(ViewMode.LIST);
  const [filteredMsgsResult, setFilteredMsgsResult] = useState(props.messagesResult.messages);

  useEffect(() => {
    const searchParam = props.location.search;
    const token = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;
    if (token && props.messagesResult.pageTokens.length === 0) {
      props.addInitialPageToken(token);
    }


    const labelIds = props.searchQuery === "" ? [props.parentLabel.id] : undefined;

    props.getLabelMessages({
      ...labelIds && {labelIds},
      pageToken: token
    });
  }, [])

  useEffect(() => {
    const searchParam = props.location.search;
    const token = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;

    const labelIds = props.searchQuery === "" ? [props.parentLabel.id] : undefined;

    props.getLabelMessages({
      ...labelIds && {labelIds},
      pageToken: token
    });
  }, [props.location.search])


  const onSelectionChange = (selected, msgId) => {
    props.toggleSelected([msgId], selected);
  }

  
  const renderSpinner = () => {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center  ">
        <FontAwesomeIcon icon={faSpinner} spin size="5x" />
      </div>
    );
  }

  ///////// FILTER LOGIC /////////
useEffect(() => {
  filteredMsgsResult.forEach(i => {
    props.getFilterCounts(i);
  })
}, [filteredMsgsResult])

useEffect(() => {
  setFilteredMsgsResult(filterLogic());
}, [props.filter])

const filterLogic = () => {
  const uniqueContacts = props.messagesResult.messages.map(r => {
    let headerArray = r.payload.headers;
    let index = headerArray.findIndex(n => {
      return n.name ==="To"
    })
    let msgVal = headerArray[index].value;
    if (msgVal.includes("<")) {
      msgVal = msgVal.substring(
        msgVal.lastIndexOf("<") + 1, 
        msgVal.lastIndexOf(">"))} 
    
    return {msgId: r.id, name: headerArray[index].name, value: msgVal};
  });

  let noDupes = uniqueContacts.map(i => {
    return i["value"];
  });

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  const distinctContacts = noDupes.filter(distinct);

  console.log(distinctContacts);
  return distinctContacts;
}

  ///////// FILTER LOGIC /////////



  const mapThroughMsgs = () => {


    function removeDuplicates(originalArray, objKey) {
      var trimmedArray = [];
      var values = [];
      var value;
    
      for (var i = 0; i < originalArray.length; i++) {
        value = originalArray[i][objKey];
    
        if (values.indexOf(value) === -1) {
          trimmedArray.push(originalArray[i]);
          values.push(value);
        }
      }
    
      return trimmedArray;
    }

    const finalMsgs = () => {
      if (props.messagesResult.filterCounts == undefined || props.messagesResult.filterCounts.length === 0) {
      return props.messagesResult.messages;

    } else if ( props.messagesResult.filterCounts.length > 0) {
      
      const newMsgs = props.messagesResult.messages.filter(f => {
        let index = f.payload.headers.findIndex(n => {
          if (props.filterType === "sent") {
          return n.name ==="To"
          } else if (props.filterType === "from") {
            return n.name === "From"
          }
        })
        let temp = f.payload.headers[index].value;
        if (temp.includes("<")) {
          temp = temp.substring(
            temp.lastIndexOf("<") + 1, 
            temp.lastIndexOf(">"))} 

        let num = 0;
        if (props.messagesResult.filterCounts.find(x => x.id === temp)) {

          num = props.messagesResult.filterCounts.find(x => x.id === temp).size
        } else {
          return;
        }
        let min = null;
        let max = null;

        if (props.filter.length === 2) {
          min = props.filter.slice(0,1);
          max = props.filter.slice(1,2);
        } else if  (props.filter.length === 4) {
          min = props.filter.slice(0,2);
          max = props.filter.slice(2,4);
        } else if  (props.filter.length === 7) {
          min = props.filter.slice(0,2);
          max = props.filter.slice(2,7);
        } else {
          min = 0;
          max = 10000;
        }
        // console.log("min: ", min, "max: ", max);
        return ((num >= parseInt(min)) && (num <= parseInt(max)));
      })
      return newMsgs;
    }}

    const messagesUniqueThreadIds = removeDuplicates(finalMsgs(), 'threadId');

    //The two filters here --> these are where a user searches for a term AND their filter gets applied. Filter is coming from Header and lines 93 and 111 will change based on useState input.
    if (props.toggle && props.searchterm) {
      return messagesUniqueThreadIds
      // .filter(arr => {
      //   // console.log("Contacts: ", arr.snippet);
        // return arr.snippet === props.filter
      // })
      .map(el => {
        return (
          <ContactMessageRow
            data={el}
            key={el.id}
            onSelectionChange={onSelectionChange}
            onClick={props.getMessage}
  
            snippet={el.snippet}
          />
        )
      })
    }
    return finalMsgs()
    // .filter(arr => {
    //   // console.log(arr.snippet);
      // return arr.snippet === props.filter
    // })
    .map(el => {
      if (!props.toggle) {
        return (
          <MessageRow
            data={el}
            key={el.id}
            onSelectionChange={onSelectionChange}
            toggle={props.toggle}
          />
      )} 
      else if (!props.searchterm) {
        return;
      } 
    });
  }

  const renderMessages = () => {

    if (props.messagesResult.loading) {
      return renderSpinner();
    } else if (props.messagesResult.messages.length === 0) {
      return (
        <div className="p-4 text-center">
          There are no messages with this label.
        </div>
      );
    } else {
      return mapThroughMsgs()
    }
  }


  const renderView = () => {
    switch (viewMode) {

      case ViewMode.EDIT:
        return props.renderEditView();

      default:
        return renderMessages();
    }
  }

  const getPageTokens = () => {
    if (props.messagesResult.loading) {
      return { nextToken: null, prevToken: null }
    }
    const { messagesResult, location } = props;
    const pathname = location.pathname;
    let prevToken;
    let nextToken = messagesResult.nextPageToken;
    const searchParam = location.search;
    const currentToken = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;
    if (currentToken) {
      const tokenIndex = messagesResult.pageTokens.indexOf(currentToken);
      if (tokenIndex > -1) {
        nextToken = messagesResult.pageTokens[tokenIndex + 1];
        prevToken = messagesResult.pageTokens[tokenIndex - 1];
        if (!prevToken) {
          if (tokenIndex > 0) {
          }
        }
        prevToken = prevToken ? `${pathname}?${prevToken}` : pathname;
      }
      else {
        prevToken = pathname;
      }
    }
    nextToken = nextToken ? `${pathname}?${nextToken}` : null;
    return { nextToken, prevToken };
  }

  const { messagesResult } = props;
  const messagesTotal = messagesResult.label ? messagesResult.label.result.messagesTotal : 0;
  const { nextToken, prevToken } = getPageTokens();

if (!props.toggle) {
  return (
    <React.Fragment>
      <ListToolbar
        nextToken={nextToken}
        prevToken={prevToken}
        navigateToNextPage={props.navigateToNextPage}
        navigateToPrevPage={props.navigateToPrevPage}
      />

      <PerfectScrollbar className="container-fluid no-gutters px-0 message-list-container">
        {/* <button onClick={testReducer}>Click me to test</button> */}
        {renderView()}
      </PerfectScrollbar>
      <ListFooter messagesTotal={messagesTotal} />
    </React.Fragment>
    
  );
} else {
  return (
    <React.Fragment>

        <PerfectScrollbar className="container-fluid no-gutters px-0 contact-message-list">
          {renderView()}
        </PerfectScrollbar>
    
    </React.Fragment>
    
  );
}

}

const mapStateToProps = state => {
  return {
      filterCount: state.filterCounts,
      messages: state.messages
  }
}

export default connect(
  mapStateToProps, {getFilterCounts}
)(MessageList);