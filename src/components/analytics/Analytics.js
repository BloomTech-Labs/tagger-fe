import React from 'react';
import { connect } from 'react-redux';
import { setAnalyticsBar } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Analytics = props => {

   const closeAnalytics = () => {
        props.setAnalyticsBar(false)
   }

   const sentWidth = (props.sentEmails / props.totalEmails) * 100 + '%';
   const receivedWidth = (props.receivedEmails / props.totalEmails) * 100 + '%';

    return (
        <div className="analytics-bar">
            <FontAwesomeIcon icon={faTimesCircle} className= "analytics-bar-close btn" onClick={closeAnalytics}/>

            <div className= "analytics-avatar col">
            <FontAwesomeIcon icon={faUserCircle} className="analytics-bar-avatar"/>
            <h3>{props.address}</h3>
            <h2>{props.name}</h2>
            {/* maps over over the everyone it was sent to. prevously it was done mapping over a to object */}
        
            </div>
            
            <div className="analytics-body">

              <p>Total messages</p>
              <div style={{width:"100%"}} className='barwidth'>
                <span className="num">{props.totalEmails}</span>
              </div> 

             <p>Sent messages</p>
             <div style={{width:sentWidth}} className='barwidth'>
                <span className="num">{props.sentEmails}</span>
              </div>

             <p>Recieved messages</p>
             <div style={{width:receivedWidth}} className='barwidth'>
                <span className="num">{props.receivedEmails}</span>
              </div>

            </div>

        </div>
    );
};

const mapStateToProps = ({analyticsbar}) => ({

  totalEmails:analyticsbar.totalEmails,
  sentEmails:analyticsbar.sentEmails,
  receivedEmails:analyticsbar.receivedEmails,
  address:analyticsbar.address,
  name:analyticsbar.name
})

export default connect(mapStateToProps,{setAnalyticsBar})(Analytics);