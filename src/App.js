import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import TopBar from './components/topbar/TopBar';
import Sidebar from './components/sidebar/Sidebar';
import Pagination from './components/pagination/Pagination';
import EmailList from './components/emailList/EmailList';
import EmailSection from './components/emailSection/EmailSection';
import AnalyticsBar from './components/analytics/Analytics';
import Compose from './components/compose/Compose';

const App = props => {

    const [ composer, setComposer ] = useState(false)

    return(
    <>
    {/* {props.isLoggedIn ? <TopBar /> : null} */}
    <TopBar />
    <main>
        <Sidebar setComposer={setComposer} />
        <Pagination />
        <div className={props.isViewEmail ? 'email-list-min' : 'email-list'}> {/* className="email-list-min" or email-list for full width */}
            <EmailList setComposer={setComposer}/>
        </div>
        {props.isViewEmail && (
            <div className="email-body" id={props.analyticsBar ? 'email-body-analytics' : null}> {/* add the id="email-body-analytics" for analytics column */}
                <EmailSection />
            </div>
        )}
        {props.analyticsBar ? <AnalyticsBar /> : null}
    </main>
    {composer && <Compose setComposer={setComposer}/>}
    {/* <Switch> */}
        {/* TO SAVE TIME IN DEVELOPMENT, UNCOMMENT TO OVERRIDE "/" */}
        {/* <Route exact path="/" component={Inbox}></Route> */}

        {/* <Route exact path="/" component={LandingPage}></Route> */}
        {/* <PrivateRoute path="/inbox" component={Inbox} /> */}
        {/* <Route path="/inbox" component={Inbox}></Route> */}
    {/* </Switch> */}
    {/* <Route path="/inbox" component={Sidebar}></Route> */}
    </>
    )
}

const mapStateToProps = ({analyticsbar, viewEmail}) => ({
    analyticsBar:analyticsbar.analyticsbar,
    isViewEmail:viewEmail.displayEmailSection
})

export default connect(mapStateToProps)(App);