import React, { Component } from "react";
import "./Login.css";
import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import * as Yup from "yup";
import Axios from "axios";

const LoginSchema = Yup.object().shape({
  guid: Yup.string()
    .matches(/[0-9]{4}$/, "*Invalid GUID")
    .required("*GUID Required"),
  gpin: Yup.string()
    .matches(/[0-9]{4}$/, "*Invalid GPIN")
    .required("*GPIN Required"),
});

class Login extends Component {
  state = {
    loggingInStyle: "none",
    errorStyle: "none",
    errorMessage: "",
  };

  handleOnClickSubmit = () => {
    this.setState({
      dateSelected: !this.state.dateSelected,
    });

    let signupData = {
      username: document.getElementById("loginGuid").value,
      password: document.getElementById("loginGpin").value,
    };

    Axios.post("http://100.26.98.176/api/login/", signupData, {
      withCredentials: true,
    })
      .then((resp) => {
        Axios.get("http://100.26.98.176/api/isloggedin/", {
          withCredentials: true,
        })
          .then((respSub) => {
            console.log(resp, "*", respSub)
            if (respSub.data.message == "n") {
              this.setState({
                errorStyle: "",
                errorMessage:
                  respSub.data.errorMessage.length === 0
                    ? "Server Error"
                    : respSub.data.errorMessage,
              });
            } else {
              this.setState({
                loggingInStyle: "",
              });
              window.location.replace("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOnClickReset = (event) => {
    event.preventDefault();
    document.getElementById("loginGuid").value = "";
    document.getElementById("loginGpin").value = "";
  };

  render() {
    const loggingInStyle = {
      display: this.state.loggingInStyle,
      color: "green",
      fontWeight: "bolder",
    };
    const errorStyle = {
      display: this.state.errorStyle,
      color: "red",
    };
    const titleStyle = {
      fontWeight: "bold",
      fontSize: "1.6em",
    };
    return (
      <>
        <div
          className={`selectMask_box_login ${
            this.state.dateSelected ? "maskLogin" : ""
          } `}
          style={loggingInStyle}
        >
          <p style={{ marginTop: "100px", fontSize: "38px" }}>Logging in...</p>
        </div>
        <Container className="formCon">
          <Formik
            initialValues={{ guid: "", gpin: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              this.handleOnClickSubmit();
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label style={titleStyle}>Please Login: </Form.Label>
                </Form.Group>
                <Form.Group controlId="loginGuid">
                  <Form.Label style={errorStyle}>
                    {this.state.errorMessage}
                  </Form.Label>
                  <br />
                  <Form.Label className="formLabel">GUID</Form.Label>
                  <Form.Label>
                    {touched.guid && errors.guid ? (
                      <div className="error-message">{errors.guid}</div>
                    ) : null}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your GUID..."
                    name="guid"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.guid}
                    className={touched.guid && errors.guid ? "error-box" : null}
                  />
                </Form.Group>
                <Form.Group controlId="loginGpin">
                  <Form.Label className="formLabel">GPIN</Form.Label>
                  <Form.Label>
                    {touched.gpin && errors.gpin ? (
                      <div className="error-message">{errors.gpin}</div>
                    ) : null}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your GPIN..."
                    name="gpin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gpin}
                    className={touched.gpin && errors.gpin ? "error-box" : null}
                  />
                </Form.Group>
                <br />
                <Button
                  variant="outline-success"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={(event) => {
                    this.handleOnClickReset(event);
                  }}
                >
                  Reset
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </>
    );
  }
}

export default Login;
