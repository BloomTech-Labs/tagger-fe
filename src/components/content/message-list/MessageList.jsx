import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import MessageRow from "./message-row/MessageRow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ContactMessageRow from '../../contact-messages/contact-message-row/ContactMessageRow';
import ListToolbar from "./list-toolbar/ListToolbar";
import ListFooter from "./list-footer/ListFooter";

import "./messageList.scss";

const ViewMode = {
  LIST: 1,
  CONTENT: 2,
  EDIT: 3
};

const MessageList = (props) => {
  const [viewMode, setViewMode] = useState(ViewMode.LIST);
  // const [contentMessageId, setContentMessageId] = useState(undefined);
  // const [currentLabel, setCurrentLabel] = useState("");
  const [filteredMsgsResult, setFilteredMsgsResult] = useState(props.messagesResult);
  const [numSentMessages, setNumSentMessages] = useState({});

  // "Filter" value from Header...if true, filters to whatever is the return value in newMsgs
  const filter = false;

  // useEffect(() => {
    // getReceivedMessages( (!props.email === "none") ? `from:${props.email}` : `from:${props.name}`);
    // getSentMessages(`to:${props.email}`);
    // getLastInteractionData(latestMessageId);
// }, [props])

  useEffect(() => {
    const searchParam = props.location.search;
    const token = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;
    if (token && props.messagesResult.pageTokens.length === 0) {
      props.addInitialPageToken(token);
    }

//HERE'S WHERE I'M STUCK RIGHT NOW....I WANT GETLABELMESSAGES TO RENDER IN THE INBOX...BUT I WANT GETFULLLABELMESSAGES TO PRINT IN THE CONSOLE...I WANT BOTH, BUT ONE SHOULD BE SEEN BY THE USER (20 MESSAGE RESULTS) AND THE OTHER SHOULD BE MY SEARCH RESULTS IN MY VENN DIAGRAM...BUT GETFULLLABELRESULTS IS JUST A SPINNING LOOP...WHY??

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














  const mapThroughMsgs = () => {
    //This will receive either "sentMessages" or "receivedMessages" from <Header> depending on which filter the user chooses.
    
      

    const getSentMessages = async (q) => {
      let sizesObj = [];
      return await window.gapi.client.gmail.users.messages
          .list({
              userId: "me",
              q
          })
          .then(res => {
              sizesObj.push({email: [q, res.result.resultSizeEstimate]});
            
          })
      }



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
      // console.log("MessageResults in DashboardView: ", trimmedArray);

      
      // takes in all of the messages in MessageList.
      const newArr = trimmedArray.map(r => {
        let headerArray = r.payload.headers;
        let index = headerArray.findIndex(n => {
          return n.name ==="To"
        })
        let msgVal = headerArray[index].value;
        if (msgVal.includes("<")) {
          msgVal = msgVal.substring(
            msgVal.lastIndexOf("<") + 1, 
            msgVal.lastIndexOf(">"))} 
        
            //changes "filterArray" to an object of the id, "To/From" field, and the email address of every message in MessageList. IF MESSAGELIST CHANGES THERE WILL BE AN INFINITE LOOP
        return {msgId: r.id, name: headerArray[index].name, value: msgVal};
      });
      console.log("NewArr before: ", newArr);

      //INFINITE LOOP HAPPENS WHEN I HAVE USESTATE UPDATING WITH THE OUTPUT OF MY MAP FUNCTION ON LINE 114...BECAUSE IT RE-RENDERS MESSAGELIST, WHICH RE-RENDERS NEWARR, WHICH RE-RENDERS MESSAGELIST, WHICH...
      //NO HOOK STATE CHANGES HERE.

      newArr.forEach(i => {
        getSentMessages(`to:${i.value}`);
      })

      console.log("NewArr after: ", newArr);

      // sizesObj.filter(f => {
      //   console.log(f);
      //   return f.value > 3
      // });
      // const filteredList = newArr.filter(j => { j.num > 3 });
      // changedArr;

      // var changedArr = sizesObj.filter(function(f) {

      //   return f.size > 3;
      // });
      // console.log("New sizesObj: ", changedArr);

      //HERE I'M DESPERATELY CLOSE TO FILTERING EVERYTHING BASED ON TEMP....WHICH IS THE CURRENT ELEMENT IN FILTER METHOD....BUT FOR SOME REASON I CAN'T ACCESS THE KEY-VALUE PAIR INSICE SIZESOBJ...WHICH MEANS I CAN'T FILTER BASED ON SIZE IN LINE 162 LIKE I'M TRYING.....SO CLOSE!!!!
      trimmedArray.filter(f => {
        let index = f.payload.headers.findIndex(n => {
          return n.name ==="To"
        })
        let temp = f.payload.headers[index].value;
        if (temp.includes("<")) {
          temp = temp.substring(
            temp.lastIndexOf("<") + 1, 
            temp.lastIndexOf(">"))} 
        temp = "to:" + temp;

        return (temp > 0);
      })

      //remember that trimmedArray here DOESN'T return the array...it's returned on line 205, and THAT props.messageResults.messages is what I need to filter.
      return trimmedArray;
    }


      /////// *** STEP 4 *** /////
      // what's left to do here, is match temp string to the user's selection in Header.
    const newMsgs = props.messagesResult.messages.filter(f => {
      let index = f.payload.headers.findIndex(n => {
        return n.name ==="To"
      })
      let temp = f.payload.headers[index].value;
      if (temp.includes("<")) {
        temp = temp.substring(
          temp.lastIndexOf("<") + 1, 
          temp.lastIndexOf(">"))} 
      temp = "to:" + temp;

      return (temp === "to:tngo97@gmail.com");
    })
          /////// *** STEP 4 *** /////























    const messagesUniqueThreadIds = removeDuplicates(filter ? newMsgs : props.messagesResult.messages, 'threadId');
    

    //The two filters here --> these are where a user searches for a term AND their filter gets applied. Filter is coming from Header and lines 93 and 111 will change based on useState input.
    if (props.toggle && props.searchterm) {
      // console.log("messageResults in ContactView: ", messagesUniqueThreadIds);
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
    return (filter ? newMsgs : props.messagesResult.messages)
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

export default MessageList;
