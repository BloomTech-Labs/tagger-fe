import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import blackCircle from "../../images/pngguru.com.png"


import { 
  changeIsDisplayingAnalytics,
} from "../../actions";

const S = {
  Container: styled.div`
    width: 30%;
    height: 100%;
    box-sizing: border-box; 
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Avatar: styled.img`
    width: 60%;
  `,
};



const AnalyticsBar = props => {

  const closeAnalytics = () => {
    props.changeIsDisplayingAnalytics(false)
  }

  return (
    <S.Container>
        {/* <h1>Analytics</h1> */}
        <button onClick = {() => closeAnalytics()}>X</button>
        <S.Avatar src = {blackCircle}/>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user }) => ({
  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsDisplayingAnalytics
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AnalyticsBar);
