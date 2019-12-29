import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Axios from "axios";
import "./Navs.css";

export default class Navs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClickLogout = event => {
    event.preventDefault();
    Axios.get("/api/logout/")
      .then(resp => {
        window.location.replace("/");
        console.log("Logged Out!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const logoutStyle = {
      color: "pink",
      marginLeft: "auto",
      marginRight: "auto"
    };
    const loginStyle = {
      color: "lightgreen",
      marginLeft: "auto",
      marginRight: "auto"
    };
    const signupStyle = {
      color: "lightgreen"
    };
    const welcomStyle = {
      color: "lightgreen"
    };
    const navLinkStyle = {
      marginLeft: "auto",
      marginRight: "auto"
    };
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="/">Bill Book</Navbar.Brand>
          {this.props.auth ? (
            <Nav.Link href="" style={welcomStyle}>
              Hi: {this.props.user} ({this.props.group})
            </Nav.Link>
          ) : (
            ""
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/profile/" style={navLinkStyle}>
                Profile
              </Nav.Link>
              {this.props.auth ? (
                ""
              ) : (
                <Nav.Link href="/login/" style={loginStyle}>
                  Login
                </Nav.Link>
              )}
              {/* {this.props.auth ? (
              ""
            ) : (
              <Nav.Link href="/we0mmm/signup/" style={signupStyle}>
                Signup
              </Nav.Link>
            )} */}
              {this.props.user === "8731" ? (
                <Nav.Link href="/admin/" style={navLinkStyle}>
                  Admin
                </Nav.Link>
              ) : (
                ""
              )}
              {this.props.auth ? (
                <Nav.Link
                  href=""
                  style={logoutStyle}
                  onClick={event => this.handleOnClickLogout(event)}
                >
                  Logout
                </Nav.Link>
              ) : (
                ""
              )}
              {/* <Nav.Link href="/rnotes/" id="panda1" style={{display: "none"}}>
                <img
                  className="App-logo"
                  src="/we0mmm-r.png"
                  style={{ width: "20px", height: "20px" }}
                  alt="Anyway!"
                ></img>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Form inline id="panda">
            {/* <Nav.Link href="/beta/" style={{ color: "grey" }}>
              Beta
            </Nav.Link> */}
            <Nav.Link href="/rnotes/">
              <img
                className="App-logo"
                src="/we0mmm-r.png"
                style={{ width: "20px", height: "20px" }}
                alt="Anyway!"
              ></img>
            </Nav.Link>
          </Form>
        </Navbar>
      </>
    );
  }
}
