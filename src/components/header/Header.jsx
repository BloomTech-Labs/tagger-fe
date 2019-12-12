import React, {useState, useEffect, useRef} from "react";
import "./header.scss";
import Signout from "../signout/Signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";

//
//Scrap earlier notes -- now I'm just filtering in MessageList. I send the filter from here to MessageList using props.filter...so I just need to update that here using props.setFilter.

//Look at line 16 of MenuContent...somehow, I need to filter using those results, but I ALSO need to get those results for a user's searchQuery.


/*
1. Find the full array of messageResults...not the 20-message page token.
2a. Run a map function against each sender in this array...
2b. ...and filter THAT array based on the user's input.

*/



// Step 1. Paste code for total messages & sent messages & etc. so I have access to that data for xyz user.
// Step 2. Pull searchQuery from teh searchbar, and pair it with step 1's data but search through ALL users.
// Step 3. Change performSearch (or w/e it's called) so it can make requests to GAPI using new parameters like date range.

//Here's the problem -- Teddy code is receiving props.name and props.email from ContactList click of one ContactCard. Those are needed for these GAPI queries. AND my search query must search ALL messages/contacts with these search params, NOT just one user.

//I do have access to props.searchQuery -- easy way to grab user;'s search (step 2).
//I think performSearch default is whatever inbox is specified in "from:"/"sent:"...

//No...maybe....I just filtered the rendered messages based on what's selected in Header here. Send the prop or change state somehow to pass the filter to the message-rendering component.

const Header = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [latestMessageId, setLatestMessageId] = useState('');
  const [numReceivedMessages, setNumReceivedMessages] = useState(0);
  const [numSentMessages, setNumSentMessages] = useState(0);
  const [lastInteraction, setLastInteraction] = useState('Calculating...');


// PASTED CODE FROM MENUCONTENT  **STARTS HERE**


  // useEffect(() => {
  //     getReceivedMessages( (!props.email === "none") ? `from:${props.email}` : `from:${props.name}`);
  //     getSentMessages(`to:${props.email}`);
  //     getLastInteractionData(latestMessageId);
  // }, [props])

  // const getReceivedMessages = async (q) => {
  //   console.log(window.gapi.client.gmail.users.messages);
  //     return await window.gapi.client.gmail.users.messages
  //         .list({
  //             userId: "me",
  //             q
  //         })
  //         .then(res => {
  //             setLatestMessageId(res.result.messages[0].id);
  //             setNumReceivedMessages(res.result.resultSizeEstimate);
  //         });
  // }

  // const getSentMessages = async (q) => {
  //     return await window.gapi.client.gmail.users.messages
  //         .list({
  //             userId: "me",
  //             q
  //         })
  //         .then(res => {
  //             setNumSentMessages(res.result.resultSizeEstimate);
  //         })
  // }

  // const getLastInteractionData = async id => {
  //     return await window.gapi.client.gmail.users.messages
  //         .get({
  //             userId: "me",
  //             id: id
  //         })
  //         .then(res => {
  //             const date = res.result.internalDate;
  //             setLastInteraction(moment(Number(date)).fromNow());
  //         })
  // }


// PASTED CODE FROM MENUCONTENT **ENDS HERE**




  const handleSearchClick = (evt) => {
    if (props.searchQuery !== "") {
      performSearch();
    }    
  }

  const handleInputClick = () => {
    setIsClicked(true);
    console.log("Test if filter in Header: ", props.filter);
  }

  const handleInputChange = (evt) => {
    props.setSearchQuery(evt.target.value);  
    performSearch();
  }

  const performSearch = debounce(() => {
    const searchParams = {}
    if (!props.searchQuery || props.searchQuery === "") {
      searchParams.labelIds = ["INBOX"];
    }
    props.getLabelMessages({...searchParams})
  }, 1000);


/////////////
//  code for useOutsideAlerter and useRef hook from https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=%2Fsrc%2FOutsideAlerter.js
function useOutsideAlerter(ref) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target) && isClicked) {
      setIsClicked(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}
//**
//*





  const userInfo = props.googleUser.w3;
  const email = userInfo.U3;
  const fullName = userInfo.ig;
  const picUrl = userInfo.Paa;

  return (
    <div className="header-container">
      <header className="d-flex p-3 align-content-center align-items-center header">
        <div className="header-logo justify-content-center">
          <Link to="/inbox">Tagger</Link>
          <button 
            className="btn btn-light align-self-center mr-2 font-weight-bold"
            onClick={props.toggleDash}
          >
            {props.toggle === false ? 'Contacts' : 'Dashboard'}
          </button>
        </div>
  
        <div className="header-search">
          <div className="input-group w-75 ml-1 mr-auto">
            
            <OutsideAlerter>
            <div 
            className="search-modal-div"
            style={isClicked ? {display:"flex"} : {display:'none'}}
            >
              <div className="search-modal-menu-column">
                <div>
                <h4>Total Messages</h4>
                  <label>Minimum</label>
                  <input type="text" />
                  <label>Maximum</label>
                  <input type="text"/>
                </div>
                <div>
                  <h4>Received Messages</h4>
                  <label>Minimum</label>
                  <input type="text" />
                  <label>Maximum</label>
                  <input type="text"/>
                </div>
                <div>
                <h4>Received Messages</h4>
                  <label>Minimum</label>
                  <input type="text" />
                  <label>Maximum</label>
                  <input type="text"/>
                </div>
              </div>

              <div className="search-modal-menu-column">  
                <div>
                  <h4>Last Interaction</h4>
                  <input type="text" />
                  to
                  <input type="text" />
                  </div> 
                <div>
                  <h4>Tags</h4>
                  <label>Finance</label>
                  <input type="checkbox"/>
                  <label>Social</label>
                  <input type="checkbox"/>
                  <label>Travel</label>
                  <input type="checkbox"/>
                  <label>Shopping</label>
                  <input type="checkbox"/>
                  <label>Productivity</label>
                  <input type="checkbox"/>
                  <label>Other</label>
                  <input type="checkbox"/>
                </div>
              </div>
            </div>
            </OutsideAlerter>

            <input
              type="search"
              className="form-control border-light"
              placeholder="Search mail"
              value={props.searchQuery}
              onClick={handleInputClick}
              onChange={handleInputChange}
            />
            <div className="input-group-append" onClick={handleSearchClick}>
              <button
                className="btn btn-light btn-outline-light bg-white text-dark"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div>
            <span className="user-name" title={email}>
              {fullName}
            </span>
  
            <img className="mx-2 profile-pic" src={picUrl} alt="" />
          </div>
        </div>
  
        <Signout onSignout={props.onSignout} />
      </header>
      <div className="header">
      </div>
    </div>
  );
}

export default Header;

