
//DELETE THIS BEFORE PUSHING IF I DON'T USE IT


// import React, { useState, useEffect } from "react";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import MessageRow from "../content/message-list/message-row/MessageRow";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// import ListToolbar from "../content/message-list/list-toolbar/ListToolbar";
// // import ListFooter from "./list-footer/ListFooter";

// import "../content/message-list/messageList.scss";

// const ViewMode = {
//   LIST: 1,
//   CONTENT: 2,
//   EDIT: 3
// };

// const ContactMessages = (props) => {
//   const [viewMode, setViewMode] = useState(ViewMode.LIST);
//   const [contentMessageId, setContentMessageId] = useState(undefined);
//   const [currentLabel, setCurrentLabel] = useState("");
  
//   useEffect(() => {
//     const searchParam = props.location.search;
//     const token = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;

//     if (token && props.messagesResult.pageTokens.length === 0) {
//       props.addInitialPageToken(token);
//     }

//     const labelIds = props.searchQuery === "" ? [props.parentLabel.id] : undefined;

//     props.getLabelMessages({
//       ...labelIds && {labelIds},
//       pageToken: token
//     });
//   }, [])

//   useEffect(() => {
//     const searchParam = props.location.search;
//     const token = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;

//     const labelIds = props.searchQuery === "" ? [props.parentLabel.id] : undefined;
//     props.getLabelMessages({
//       ...labelIds && {labelIds},
//       pageToken: token
//     });
//   }, [props.location.search])


//   const onSelectionChange = (selected, msgId) => {
//     props.toggleSelected([msgId], selected);
//   }
  
//   const renderSpinner = () => {
//     return (
//       <div className="d-flex h-100 justify-content-center align-items-center  ">
//         <FontAwesomeIcon icon={faSpinner} spin size="5x" />
//       </div>
//     );
//   }

//   const renderMessages = () => {
//     if (props.messagesResult.loading) {
//       return renderSpinner();
//     } else if (props.messagesResult.messages.length === 0) {
//       return (
//         <div className="p-4 text-center">
//           There are no messages with this label.
//         </div>
//       );
//     }

//     return props.messagesResult.messages.map(el => {
//       return (
//         <MessageRow
//           data={el}
//           key={el.id}
//           onSelectionChange={onSelectionChange}
//           onClick={props.getMessage}
//         />
//       );
//     });
//   }


//   const renderView = () => {
//     switch (viewMode) {

//       case ViewMode.EDIT:
//         return props.renderEditView();

//       default:
//         return renderMessages();
//     }
//   }

//   const getPageTokens = () => {
//     if (props.messagesResult.loading) {
//       return { nextToken: null, prevToken: null }
//     }
//     const { messagesResult, location } = props;
//     const pathname = location.pathname;
//     let prevToken;
//     let nextToken = messagesResult.nextPageToken;
//     const searchParam = location.search;
//     const currentToken = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : null;
//     if (currentToken) {
//       const tokenIndex = messagesResult.pageTokens.indexOf(currentToken);
//       if (tokenIndex > -1) {
//         nextToken = messagesResult.pageTokens[tokenIndex + 1];
//         prevToken = messagesResult.pageTokens[tokenIndex - 1];
//         if (!prevToken) {
//           if (tokenIndex > 0) {
//           }
//         }
//         prevToken = prevToken ? `${pathname}?${prevToken}` : pathname;
//       }
//       else {
//         prevToken = pathname;
//       }
//     }
//     nextToken = nextToken ? `${pathname}?${nextToken}` : null;
//     return { nextToken, prevToken };
//   }

//   const { messagesResult } = props;
//   const messagesTotal = messagesResult.label ? messagesResult.label.result.messagesTotal : 0;
//   const { nextToken, prevToken } = getPageTokens();

//   return (
//     <React.Fragment>
//       <ListToolbar
//         nextToken={nextToken}
//         prevToken={prevToken}
//         navigateToNextPage={props.navigateToNextPage}
//         navigateToPrevPage={props.navigateToPrevPage}
//       />
//       Hi from contactMessages!
//       <PerfectScrollbar className="container-fluid no-gutters px-0 message-list-container">
//         {renderView()}
//       </PerfectScrollbar>
//       {/* <ListFooter messagesTotal={messagesTotal} /> */}
//     </React.Fragment>
//   );
// }

// export default ContactMessages;
