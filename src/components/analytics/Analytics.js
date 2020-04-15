import React from 'react';
import { connect } from 'react-redux';
import { setAnalyticsBar } from '../../actions';
import Bars from './Bars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const Analytics = props => {

   const closeAnalytics = () => {
        props.setAnalyticsBar(false)
   }

    return (
        <div className="analytics-bar">
            <FontAwesomeIcon icon={faTimesCircle} className= "analytics-bar-close btn" onClick={closeAnalytics}/>

            <div className= "analytics-avatar col">
            <FontAwesomeIcon icon={faUserCircle} className="analytics-bar-avatar"/>
            <h2>{/* this displays the contact name.... which was passed via props */}</h2>
            {/* maps over over the everyone it was sent to. prevously it was done mapping over a to object */}
        
            </div>
            
            <div className="analytics-body">

             <p>Sent messages</p>
              <Bars /> 

             <p>Sent messages</p>
               <Bars/>

             <p>Recieved messages</p>
               <Bars/>

            </div>

        </div>
    );
};

export default connect(null,{setAnalyticsBar})(Analytics);