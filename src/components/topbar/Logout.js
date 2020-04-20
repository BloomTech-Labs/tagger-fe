import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const logout = () => {
    
}

const Logout = () => {

    return (
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} className="logout btn" alt="Logout"/>
    )
}

export default Logout;