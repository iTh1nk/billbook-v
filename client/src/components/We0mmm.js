import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./We0mmm.css";

class We0mmm extends Component {
  render() {
    // const imgStyle = {
    //   display: "block",
    //   marginTop: "5em",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   width: "18em",
    //   boxShadow: "20px 20px 50px black"
    // };
    return (
      <div style={{width: "18em", marginLeft: "auto", marginRight: "auto"}}>
        <a href="/login/">
          <img
            // style={imgStyle}
            className="img-style"
            src="/favicon.ico"
            // className="App-logo"
            alt="No Logins? No Worries!"
          />
        </a>
      </div>
    );
  }
}

export default We0mmm;
