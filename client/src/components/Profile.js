import React, { Component } from "react";
import { Container } from "react-bootstrap";

const divStyle = {
  backgroundImage: "url('/bg.jpg')",
  // width: window.innerWidth,
  // height: window.innerHeight
};
const conStyle = {
  backgroundColor: "white",
  padding: "2em",
  marginTop: "2em",
  // width: "30em"
};

function WelcomTab() {
  const welcomeStyle = {
    textAlign: "center",
    padding: "6em"
  };
  return (
    <>
    TO BE UPDATED...
    <div style={welcomeStyle}>
      <div
        style={{
          marginBottom: "2em",
          fontFamily: "Great Vibes",
          fontSize: "4em"
        }}
      >
        "Simplicity is the Ultimate Sophistication"{" "}
      </div>
      <div
        className="float-right"
        style={{ fontFamily: "Dancing Script", fontSize: "2em" }}
      >
        - Leonardo da Vinci
      </div>
    </div>
    </>
  );
}

export default function Profile() {
  return (
    <div style={divStyle}>
      <br />
      <Container style={conStyle}>
        <WelcomTab />
      </Container>
    </div>
  );
}
