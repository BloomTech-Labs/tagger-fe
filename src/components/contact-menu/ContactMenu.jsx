import React from 'react';

import MenuContent from "./MenuContent";
import avatarName from '../images/avatarName.svg';

import "./contact-menu.scss"

const ContactMenu = (props) => {

    const renderContactMenu = () => {
        return (
            <div className="contact-menu-container">
                <div className="banner">
                    <img className="content-avatar" src={avatarName} />
                    {/* <img alt={`Headshot of ${props.searchterm.name}`}/> */}
                    <h2>{props.searchterm.name}</h2>
                </div>

                <MenuContent
                    email={props.searchterm.email}
                    name={props.searchterm.name}
                />
            </div>
        );
    }

    if (props.searchterm) {
        return renderContactMenu();
    } else {
        return null;
    }
}

export default ContactMenu;