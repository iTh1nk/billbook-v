import React, { Component, useState, useEffect } from "react";
import { Button, Collapse, Form, Container } from "react-bootstrap";
import ShowDetail from "./mainpage/ShowDetail";
import UserInfo from "./mainpage/UserInfo";
import Axios from "axios";

const conStyle = {
  marginTop: "2em",
  marginBottom: "2em",
  backgroundColor: "white",
  padding: "2em",
  width: "90%"
};

export default function MainPage(props) {
  const [cycles, setCycle] = useState([]);

  useEffect(() => {
    Axios.get("/api/getcycle/")
      .then(resp => {
        console.log("User Statement: ", resp.data);
        setCycle(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Container style={conStyle}>
      <UserInfo user={props.user} group={props.group} />
      <hr />
      <div style={{ fontWeight: "bold", marginBottom: "1.5em" }}>
        Monthly Statement
      </div>
      {cycles.map((item, index) => (
        <div key={index} style={{marginBottom: ".6em"}}>
          <ShowDetail cycle={item.date} statement={item.statement} />
        </div>
      ))}
    </Container>
  );
}
