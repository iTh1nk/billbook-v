import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";

const conStyle = {
  marginTop: "2em",
  marginBottom: "2em",
  width: "28em",
  // height: window.innerHeight,
  backgroundColor: "white",
  padding: "3em"
};

const labelStyle = {
  fontSize: "1.6em",
  marginBottom: ".5em",
  fontWeight: "bold"
};

const textStyle = {
  fontSize: "1em"
};

const formStyle = {
  marginBottom: "2em"
};

const dateStyle = {
  fontSize: ".6em",
  marginLeft: "1em",
  fontStyle: "italic"
};

function InProgress() {
  return (
    <>
      In Progress...
      <img
        src="/inprogress.gif"
        style={{ width: "2em", height: "1.6em" }}
        alt="In Progress..."
      ></img>
    </>
  );
}

function Progress(props) {
  return (
    <Form style={formStyle}>
      <Form.Label style={labelStyle}>{props.version}</Form.Label>
      <a style={dateStyle}>{props.date}</a>
      <Form.Text style={textStyle}>{props.content}</Form.Text>
    </Form>
  );
}

export default function Rnotes() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <Container style={conStyle}>
      <Progress
        version={<InProgress />}
        content={
          <pre>
            Test bugs <br />
            Deploy to AWS <br />
            Fill in data <br />
            Test useReducer<br />
            Setup API routes protection
          </pre>
        }
      />
      <Progress
        version="v .6"
        date="12.23.2019"
        content={
          <pre>
            Test & Fix bugs <br />
            Enhance admin page <br />
            <div
              style={{
                textDecoration: "line-through",
                display: "inline-block"
              }}
            >
              Fill in profile page
            </div>{" "}
            <br />
            <div
              style={{
                textDecoration: "line-through",
                display: "inline-block"
              }}
            >
              Setup API routes protection
            </div>
          </pre>
        }
      />
      <Progress
        version="v .5"
        date="12.19.2019"
        content={
          <pre>
            MainPage frontend setup <br />
            Admin page setup <br />
            Relative backend setup
          </pre>
        }
      />
      <Progress
        version="v .2"
        date="12.11.2019"
        content={
          <pre>
            Setup database <br />
            Integrate authentication <br />
            Relative backend setup
          </pre>
        }
      />
      <Progress
        version="v .1"
        date="12.07.2019"
        content={
          <pre>
            File structure setup <br />
            Integrate 'Formik' and 'Yup' <br />
            Setup node server <br />
            Test deployment <br />
          </pre>
        }
      />
    </Container>
  );
}
