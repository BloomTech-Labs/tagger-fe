import React from 'react';

import "./contact-list.scss";

//Have to add this component below a scrollbar region like the sidebar and messageList

const ContactList = () => {
    return (
        <div className="contact-list">
                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>

                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>

                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>

                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>
                
                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>

                <div className="user-card">
                <img alt="Image of John Miller"></img>
                <div className="user-text-container">
                    <h2>John Miller</h2>
                    <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                </div>
                </div>

        </div>
    );
}


export default ContactList;