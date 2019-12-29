import React, { useState } from "react";
import { Button, Collapse, Form, Container, Table } from "react-bootstrap";

export default function ShowDetail(props) {
  const [open, setOpen] = useState(false);
  const toggle = arg => {};
  const btnStyle = {
    width: "100%",
    textAlign: "left"
  };
  const tableTitleStyle = {
    color: "lightblue",
    // width: "2em"
  }
  return (
    <div>
      <Button
        style={btnStyle}
        variant="outline-primary"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Billing Cycle => {props.cycle}
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" style={{ marginTop: "15px" }}>
          <Container>
            <Table striped bordered hover variant="dark" style={{textAlign: "center"}}>
              <thead style={tableTitleStyle}>
                <tr>
                  <th>Phone</th>
                  <th>CurrentBal</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {props.statement.map((itemSub, index) => (
                  <tr key={index}>
                    <td style={{color: "lightblue"}}>{itemSub.username}</td>
                    <td style={{color: "red"}}>${itemSub.currentBalance}</td>
                    <td style={{color: "goldenrod"}}>{itemSub.notes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </Collapse>
    </div>
  );
}
