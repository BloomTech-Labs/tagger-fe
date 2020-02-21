import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components"








export default class FullheightIframe extends Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: "0px",
      isLoaded: false
    };
  }

  render() {
    return (
      <iframe
        title="iframe"
        style={{
          width: "100%",
          height: this.state.iFrameHeight,
          overflow: "visible"
        }}
        onLoad={() => {
          const obj = ReactDOM.findDOMNode(this);
          this.setState({
            iFrameHeight:
              obj.contentWindow.document.body.scrollHeight + 10 + "px"
          });
        }}
        ref="iframe"
        srcDoc={this.props.src}
        width="100%"
        height={this.state.iFrameHeight}
        scrolling="no"
        frameBorder="0"
      />
    );
  }
}
