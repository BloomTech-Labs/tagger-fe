import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


// import {  } from "../../actions";

const S = {
  Container: styled.div`
    border: solid purple 5px;
    width: 30%;
    height: 100%;
    box-sizing: border-box; 

  `,
};



const AnalyticsBar = props => {

  return (
    <S.Container>
        <h1>Analytics</h1>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user }) => ({
  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
     
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AnalyticsBar);
