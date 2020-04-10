import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { setSliding } from '../../actions';

const HamburgerButton = props => {

    const backButton = true;

    const handleSlidebar = () => {
        props.setSliding(!props.slidebar)
    }

    const handleBackToEmailList = () => {
        //props.setBackButton(false)
        //props.changeIsDisplayingThread(!props.isDisplayingThread)
    }

    return(
        <>
        {/* Below Div is for mobile */}
        <div className="back-or-bar">
            {backButton ? (
                <div className="back-btn btn" onClick={handleBackToEmailList}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            ) : (
                <div className="sidebar-mob-btn btn" onClick={handleSlidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            )}
        </div>
        {/* Below Div is for Tablet */}
        <div className="sidebar-btn btn" onClick={handleSlidebar}>
            <FontAwesomeIcon icon={faBars} />
        </div>
        </>
    )
}

export default connect(null,{setSliding})(HamburgerButton);