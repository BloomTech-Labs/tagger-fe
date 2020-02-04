import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import axios from "axios";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import NotFound from "../not-found/NotFound";
import ContactList from '../contact-list/ContactList'
import "../main/_main.scss";
// import ContactMessages from '../contact-messages/ContactMessages';
import ContactMenu from '../contact-menu/ContactMenu';

import MessageList from "../content/message-list/MessageList";
import MessageContent from "../content/message-list/message-content/MessageContent";

import { Route, Switch, withRouter } from "react-router-dom";

import { useLocalStorage } from "../../utils";

// import { getUserContacts } from "../contact-list/actions/contact-list.actions";
import { getLabels } from "../sidebar/sidebar.actions";

import {
  getLabelMessages,
  emptyLabelMessages,
  toggleSelected,
  setPageTokens,
  addInitialPageToken,
  clearPageTokens,
  setSearchQuery
} from "../content/message-list/actions/message-list.actions";

import { selectLabel } from '../sidebar/sidebar.actions';
import { signOut } from '../../api/authentication';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Main = (props) => {
  const [signedInUser, setSignedInUser] = useState();
  const [toggle, setToggle] = useLocalStorage('view', false);
  const [searchterm, setSearchterm] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [emailRetrieved, setEmailRetrieved] = useState(false)  // << Move to Redux @ earliest convenience.


  useEffect(() => {
    console.log("useEffect() in main/Main.jsx")

    if(!emailRetrieved){
      // If user email not retrieved, retrieve email from Auth token
      const url = props.history.location.hash;
      const token = extractTokenFromUrl(url)
      getEmailAndIdFromToken(token)
      .then((res) => {
        console.log("RES: ", res)
        const email = res.email
        const user_id = res.user_id
        setEmailRetrieved(true) // The task of storing this variable should be switched from useState to Redux Store.
      })
    }

    /* Label list is fetched from here 
    so that we can declare Routes by labelId 
    before rendering anything else */
    getLabelList();
    getUserContacts();
  }, []);

  const extractTokenFromUrl = (urlString) => {
    // Pulls OAuth access token from page URL
    const newSplit = urlString.split("");
    const tokenStartIndex = newSplit.findIndex(element => element === "=");
    const tokenEndIndex = newSplit.findIndex(element => element === "&");
    const token = newSplit
      .splice(tokenStartIndex + 1, tokenEndIndex - tokenStartIndex - 1)
      .join("");
    return token;
  }

  const getEmailAndIdFromToken = (token) => {
    // API call to derive user email and ID from OAuth access token
    const apiKey = process.env.REACT_APP_APIKEY
    return axios.get(`https://people.googleapis.com/v1/people/me?personFields=emailAddresses&key=${apiKey}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      const email = res.data.emailAddresses[0].value
      const user_id = res.data.emailAddresses[0].metadata.source.id
      return {email, user_id}
    })
    
  };

  useEffect(() => {
    console.log("useEffect() in main/Main.jsx")
    setSignedInUser(props.signedInUser);

    const { labels } = props.labelsResult;
    const { pathname } = props.location;
    const selectedLabel = labels.find(el => el.selected);
    const labelPathMatch = labels.find(el => el.id.toLowerCase() === pathname.slice(1));
    if (!selectedLabel) {
      if (labelPathMatch && props.searchQuery === "") {
        props.selectLabel(labelPathMatch.id);
      }      
    }
    else {
      if (labelPathMatch && selectedLabel.id !== labelPathMatch.id) {
        props.selectLabel(labelPathMatch.id);
      } 
    }
  }, [props.signedInUser]);

  const getUserContacts = () => {
    console.log("getUserContacts() in main/Main.jsx")
    // props.getUserContacts();
  }

  const navigateToNextPage = (token) => {
    console.log("navigateToNextPage() in main/Main.jsx")
    const searchParam = props.location.search;
    const currentToken = searchParam.indexOf("?") === 0 ? searchParam.slice(1) : "";
    props.setPageTokens({
      prevPageToken: currentToken
    });
    props.history.push(token);
  }

  const navigateToPrevPage = (token) => {
    console.log("navigateToPrevPage() in main/Main.jsx")
    props.history.push(token);
  }

  const loadLabelMessages = (label) => {
    console.log("loadLabelMessages() in main/Main.jsx")
    const currentSearchQuery = props.searchQuery;
    props.clearPageTokens();
    props.selectLabel(label.id);    

    const newPathToPush = `/${label.id.toLowerCase()}`;

    if (currentSearchQuery && currentSearchQuery !== "") {
      props.setSearchQuery("");
      const {pathname} = props.location;
      if (newPathToPush === pathname) {
        getLabelMessages({ labelIds: [label.id] });
        return;
      }
    }

    props.history.push(`/${label.id.toLowerCase()}`);
  }
  

  const getLabelList = () => {
    console.log("getLabelList() in main/Main.jsx")
    props.getLabels();
  }

  const getLabelMessages = ({ labelIds, q, pageToken }) => {
    console.log("getLabelMessages) in main/Main.jsx")
    props.emptyLabelMessages();    
    props.getLabelMessages({labelIds, q, pageToken});
  }


  const addInitialPageToken = (token) => {
    console.log("addInitialPageToken() in main/Main.jsx")
    props.addInitialPageToken(token);
  }

  const renderLabelRoutes = (props) => {
    console.log("renderLabelRoutes() in main/Main.jsx")
    const { labelsResult } = props;
    return labelsResult.labels.map(el => (
      
      <Route
        key={el.id + '_route'}
        exact
        path={"/" + el.id}
        render={routeProps => {
          return (
            <MessageList
              {...routeProps}
              getLabelMessages={getLabelMessages}
              messagesResult={props.messagesResult}
              toggleSelected={props.toggleSelected}
              navigateToNextPage={navigateToNextPage}
              navigateToPrevPage={navigateToPrevPage}
              pageTokens={props.pageTokens}
              addInitialPageToken={addInitialPageToken}
              parentLabel={labelsResult.labels.find(el => el.id === routeProps.match.path.slice(1))}
              searchQuery={props.searchQuery}
              searchterm={searchterm}
              toggle={toggle}
              filter={filter}
              setFilter={setFilter}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          ) 
        }}
      />
    ));    
  }

  // const renderSpinner = () => {
  //   return (
  //     <div className="d-flex h-100 align-items-center justify-content-center">
  //       <FontAwesomeIcon icon={faSpinner} spin size="5x" />
  //     </div>
  //   )
  // }

  const onSignout = () => {
    console.log("onSignout() in main/Main.jsx")
    // signOut().then(_ => {
    //   props.history.replace('inbox');
    //   window.location.reload(true);
    // })
  }


  const toggleDash = () => {
    console.log("toggleDash() in main/Main.jsx")
    setToggle(!toggle);
  }

  const newFunc = (cb) => {
    console.log("newFunc() in main/Main.jsx")
    setSearchterm(cb);
  }


  const renderInboxViewport = () => {

    // if (props.labelsResult.labels.length < 1) {
    //   return renderSpinner();
    // }

    return (
      <Fragment>
        <Header
          googleUser={props.googleUser} 
          onSignout={onSignout} 
          setSearchQuery={props.setSearchQuery}
          getLabelMessages={getLabelMessages} 
          searchQuery={props.searchQuery}
          toggleDash={toggleDash}
          toggle={toggle}
          filter={filter}
          setFilter={setFilter}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <section
        className="main hbox space-between">
          <div className="sidebar-container">
            <Sidebar
              getLabelList={getLabelList}
              pathname={props.location.pathname}
              labelsResult={props.labelsResult}
              onLabelClick={loadLabelMessages}
            />
          </div>

          {/* <ContactList
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            getLabelMessages={getLabelMessages} 
          /> */}
          

          <article className="inbox d-flex flex-column position-relative">
            <Switch>
              {renderLabelRoutes(props)}
              <Route
                exact
                path="/notfound"
                component={NotFound}
              />
              <Route
                exact
                path="/:id([a-zA-Z0-9]+)"
                component={MessageContent}
              />
            </Switch>
          </article>
        </section>
      </Fragment>
      // <div>1</div>
    );
  }

  const renderContactViewport = () => {
    console.log("renderContactViewport() in main/Main.jsx")

    // if (props.labelsResult.labels.length < 1) {
    //   return renderSpinner();
    // }

    return (
      <Fragment>
        <Header googleUser={props.googleUser} 
          onSignout={onSignout} 
          setSearchQuery={props.setSearchQuery}
          getLabelMessages={getLabelMessages} 
          searchQuery={props.searchQuery}
          toggleDash={toggleDash}
          filter={filter}
          setFilter={setFilter}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <section className="main hbox">
          
          <div className="sidebar-container">
            <Sidebar
              getLabelList={getLabelList}
              pathname={props.location.pathname}
              labelsResult={props.labelsResult}
              onLabelClick={loadLabelMessages}
            />
          </div>

          <ContactList
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            getLabelMessages={getLabelMessages} 
            searchterm={newFunc}
          />

          {/* <div className="contacts-view-container d-flex position-relative">
            Hi */}


          {/* <ContactMessages>

          </ContactMessages> */}
          
          <article className="d-flex flex-column position-relative">
            <Switch>
              {renderLabelRoutes(props)}
              <Route
                exact
                path="/notfound"
                component={NotFound}
              />
              <Route
                exact
                path="/:id([a-zA-Z0-9]+)"
                render={(props) => <MessageContent {...props} toggle={toggle} />}
              />
            </Switch>
          </article>
            <ContactMenu
                searchterm={searchterm}/>
        </section>
      </Fragment>
      // <div>2</div>
    );
  }


  
  if (!toggle) {
    return renderInboxViewport();
  } else {
    return renderContactViewport();
  }



}

const mapStateToProps = state => ({
  labelsResult: state.labelsResult,
  messagesResult: state.messagesResult,
  pageTokens: state.pageTokens,
  searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLabels,
      getLabelMessages,
      // getUserContacts,
      emptyLabelMessages,
      toggleSelected,
      selectLabel,
      setPageTokens,
      addInitialPageToken,
      clearPageTokens,
      setSearchQuery
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Main);
