import React from 'react';
import "./contact-menu.scss"

const ContactMenu = () => {
    return (
        <div className="contact-menu-container">
            <div className="banner">
                <img alt="Headshot of John Mille"/>
                <h2>John Miller</h2>
            </div>

            <div className="menu-content">
                <h4>Total Messages</h4>
                <p>303</p>

                <h4>Sent Messages</h4>
                <p>130</p>

                <h4>Received Messages</h4>
                <p>173</p>

                <h4>Average Message Length</h4>
                <p>73 words</p>

                <h4>Last Interaction</h4>
                <p>2 months ago</p>
            </div>
        </div>
    );
}

export default ContactMenu;