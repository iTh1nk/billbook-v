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
    const ifWeb = "https://coronavirus.1point3acres.com/#stat";
    // const ifWeb = "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik";
    const ifWebStyle = {
      width: "14em",
      marginLeft: "auto",
      marginRight: "auto"
    };
    // const wStyle = {
    //   marginTop: ".8em",
    //   marginBottom: ".8em",
    //   color: "white",
    //   width: "18em",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   boxShadow: "20px 20px 50px black",
    // };
    return (
      <>
        <div style={{ width: "12em", marginLeft: "auto", marginRight: "auto" }}>
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
        {/* <div style={wStyle}></div> */}
        <hr />
        <div style={ifWebStyle}>
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="230"
            height="350"
            src={ifWeb}
          ></iframe>
        </div>
      </>
    );
  }
}

export default We0mmm;
