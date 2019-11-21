import React from "react";
import "./header.scss";
import Signout from "../signout/Signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

import TagsList from "./tags-list/TagsList";

const Header = (props) => {

  const handleSearchClick = (evt) => {
    if (props.searhQuery !== "") {
      performSearch();
    }    
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

  const userInfo = props.googleUser.w3;
  const email = userInfo.U3;
  const fullName = userInfo.ig;
  const picUrl = userInfo.Paa;

  return (
    <div className="header-container">
      <header className="d-flex p-3 align-content-center align-items-center header">
        <div className="header-logo justify-content-center">
          <Link to="/inbox">Tagger</Link>
        </div>
  
        <div className="header-search">
          <div className="input-group w-75 ml-1 mr-auto">
            <input
              type="search"
              className="form-control border-light"
              placeholder="Search mail"
              value={props.searchQuery}
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
        <TagsList />
      </div>
    </div>
  );
}

export default Header;

