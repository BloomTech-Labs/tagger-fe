import React, {useState, useEffect, useRef} from "react";
import "./header.scss";
import Signout from "../signout/Signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import axios from "axios";

const Header = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [latestMessageId, setLatestMessageId] = useState('');
  const [numReceivedMessages, setNumReceivedMessages] = useState(0);
  const [numSentMessages, setNumSentMessages] = useState(0);
  const [lastInteraction, setLastInteraction] = useState('Calculating...');

  const handleSearchClick = (evt) => {
    if (props.searchQuery !== "") {
      performSearch();
    }    
  }

  const handleInputClick = (evt) => {
    setIsClicked(true);
  }

  const handleInputChange = (evt) => {
    props.setSearchQuery(evt.target.value);
    performSemanticSearch(evt.target.value);
  }

  const handleFilterChange = (e) => {
    props.setFilterType(e.target.getAttribute("name"));
    props.setFilter(e.target.value);
  }

  const performSearch = debounce(() => {
    const searchParams = {}
    if (!props.searchQuery || props.searchQuery === "") {
      searchParams.labelIds = ["INBOX"];
    }
    props.getLabelMessages({...searchParams})
  }, 1000);

  const performSemanticSearch = debounce(q => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    axios.post(proxyurl + 'http://tagger-search-test.us-east-2.elasticbeanstalk.com/',
      { "search": q })
      .then(res => props.setSearchQuery(`{${res.data.search} ${res.data.search_two} ${res.data.search_three}}`))
      .then(() => performSearch());
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
        <div className="header-logo justify-content-center align-items-center">
          <Link className="header-link" to="/inbox">Tagger</Link>
          <button 
            className="toggle-btn btn bg-white text-dark align-self-center mr-2 font-weight-bold"
            onClick={props.toggleDash}
          >
            {props.toggle === false ? 'Contacts' : 'Dashboard'}
          </button>
        </div>
  
        <div className="header-search">
          <div className="input-group w-75 ml-1 mr-auto">

            <input
              type="search"
              className="form-control"
              placeholder="Search mail"
              value={props.searchQuery}
              onClick={handleInputClick}
              onChange={handleInputChange}
            />
            <div className="input-group-append" onClick={handleSearchClick}>
              <button
                className="search-btn btn btn-light bg-white text-dark"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {/* <OutsideAlerter>
            <div 
            className="search-modal-div"
            style={isClicked ? {display:"flex"} : {display:'none'}}
            > */}
              <div className="search-modal-menu-column">
              <div className="center-text">
                <select
                className="search-dropdown-list"
                name="sent"
                onChange={handleFilterChange}
                >
                  <option defaultValue="selected" value={0}>Sent Messages</option>
                  {/* <option value="">
                    <input value=""></input> - 
                    <input value=""></input>
                  </option> */}
                  <option value={14}>1 - 4</option>
                  <option value={59}>5 - 9</option>
                  <option value={1019}>10 - 19</option>
                  <option value={2049}>20 - 49</option>
                  <option value={5010000}>50+</option>
                </select></div>

                <div className="center-text">
                <select
                className="search-dropdown-list"
                name="from"
                onChange={handleFilterChange}
                >
                  <option selected="selected" value={0}>Received Messages</option>
                  {/* <option value="">
                    <input value=""></input> - 
                    <input value=""></input>
                  </option> */}
                  <option value={14}>1 - 4</option>
                  <option value={59}>5 - 9</option>
                  <option value={1019}>10 - 19</option>
                  <option value={2049}>20 - 49</option>
                  <option value={5010000}>50 - 99</option>
                </select></div>

              {/*  <div className="center-text">
                <select
                className="search-dropdown-list"
                >
                  <option selected="selected">Last Interaction</option>
                  {/* <option value="">
                    <input value=""></input> - 
                    <input value=""></input>
                  </option> 
                  <option value="">Last Week</option>
                  <option value="">Last 2 Weeks</option>
                  <option value="">Last Month</option>
                  <option value="">Last 6 Months</option>
                  <option value="">Last Year</option>
                </select></div>*/}
              </div> 


            {/* </div> */}
            {/* </OutsideAlerter> */}

          </div>
          <div className="gmail-icons">
            <span className="user-name" title={email}>
              {fullName}
            </span>
  
            <img className="mx-2 profile-pic" src={picUrl} alt="" />
          </div>
        </div>
  
        <Signout onSignout={props.onSignout} />
      </header>
    </div>
  );
}

export default Header;

