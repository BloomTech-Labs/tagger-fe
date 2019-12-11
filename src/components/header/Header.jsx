import React, {useState, useEffect, useRef} from "react";
import "./header.scss";
import Signout from "../signout/Signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";


const Header = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSearchClick = (evt) => {
    if (props.searhQuery !== "") {
      performSearch();
    }    
  }

  const handleInputClick = () => {
    setIsClicked(true);
    console.log(isClicked);
  }

  const handleInputChange = (evt) => {
    props.setSearchQuery(evt.target.value);  
    performSearch();
  }



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
//



  const performSearch = debounce(() => {
    const searchParams = {}
    if (!props.searchQuery || props.searchQuery === "") {
      searchParams.labelIds = ["INBOX"];
    }
    props.getLabelMessages({...searchParams})
  }, 1000);

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

