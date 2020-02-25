import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

import LandingPage from "./components/landing/LandingPage";
import Inbox from "./components/inbox/Inbox";
import Nav from "./components/navigation/Nav";
import PrivateRoute from "./utils/PrivateRoute";
const S = {
    Container: styled.div`
        // width: calc(100vw - (100vw - 100%));
        width: 100%;
        margin: 0px;
        height: calc(100vh - (100vh - 100%));
        font-size: 1.1rem;
    `
};

ReactGA.event({
    category: "SignIn",
    action: "Clicked the signin"
});

function App(props) {
    // Google Analytics
    useEffect(() => {
        ReactGA.initialize("UA-158074501-1");
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    // End Google Analytics

    return (
        <S.Container className="App">
            {props.isLoggedIn ? <Nav /> : null}
            <Switch>
                {/* TO SAVE TIME IN DEVELOPMENT, UNCOMMENT TO OVERRIDE "/" */}
                {/* <Route exact path="/" component={Inbox}></Route> */}

                <Route exact path="/" component={LandingPage}></Route>
                <PrivateRoute path="/inbox" component={Inbox} />
                {/* <Route path="/inbox" component={Inbox}></Route> */}
            </Switch>
            {/* <Route path="/inbox" component={Sidebar}></Route> */}
        </S.Container>
    );
}

const mapStateToProps = ({ imap, user }) => ({
    isLoggedIn: user.isLoggedIn
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
