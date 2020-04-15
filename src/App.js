import React, { useState } from 'react';
//import { Switch } from "react-router-dom";
import { connect } from 'react-redux';
import './App.scss';
import TopBar from './components/topbar/TopBar';
import Sidebar from './components/sidebar/Sidebar';
import EmailList from './components/emailList/EmailList';
import EmailSection from './components/emailSection/EmailSection';
import AnalyticsBar from './components/analytics/Analytics';
import Compose from './components/compose/Compose';

//import LandingPage from "./components/landing/LandingPage";
//import Inbox from "./components/inbox/Inbox";
//import PrivateRoute from "./utils/PrivateRoute";

const App = props => {

    const [ composer, setComposer ] = useState(false)

    return(
    <>
    {/* {props.isLoggedIn ? <TopBar /> : null} */}
    <TopBar />
    <main>
        <Sidebar setComposer={setComposer} />
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

// import React, { useEffect } from "react";
// import { Route, Switch, withRouter } from "react-router-dom";
// import "./App.scss";
// import { bindActionCreators, compose } from "redux";
// import { connect } from "react-redux";
// //import { createBrowserHistory } from "history";
// import ReactGA from "react-ga";

// import LandingPage from "./components/landing/LandingPage";
// import Inbox from "./components/inbox/Inbox";
// import Nav from "./components/navigation/Nav";
// import PrivateRoute from "./utils/PrivateRoute";

// ReactGA.event({
//     category: "SignIn",
//     action: "Clicked the signin"
// });

// function App(props) {
//     // Google Analytics
//     useEffect(() => {
//         ReactGA.initialize("UA-158074501-1");
//         ReactGA.pageview(window.location.pathname + window.location.search);
//     }, []);
//     // End Google Analytics

//     return (
//         <>
//             {props.isLoggedIn ? <Nav /> : null}
//             <Switch>
//                 {/* TO SAVE TIME IN DEVELOPMENT, UNCOMMENT TO OVERRIDE "/" */}
//                 {/* <Route exact path="/" component={Inbox}></Route> */}

//                 <Route exact path="/" component={LandingPage}></Route>
//                 <PrivateRoute path="/inbox" component={Inbox} />
//                 {/* <Route path="/inbox" component={Inbox}></Route> */}
//             </Switch>
//             {/* <Route path="/inbox" component={Sidebar}></Route> */}
//         </>
//     );
// }

// const mapStateToProps = ({ imap, user }) => ({
//     isLoggedIn: user.isLoggedIn
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
