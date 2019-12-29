import React, { Component } from "react";
import "./Signup.css";
import { Container, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const SignupSchema = Yup.object().shape({
  guid: Yup.string()
    .matches(/[0-9]{4}$/, "*Invalid GUID")
    .required("*GUID Required"),
  gpin: Yup.string()
    .matches(/[0-9]{4}$/, "*Invalid GPIN")
    .required("*GPIN Required"),
  gpin2: Yup.string().oneOf([Yup.ref("gpin"), null], "*GPIN Must Match")
});

class Signup extends Component {
  state = {
    signingUpStyle: "none",
    errorMessage: "",
    errorStyle: "none"
  };

  handleOnClickSubmit = () => {
    this.setState({
      dateSelected: !this.state.dateSelected
    });

    let signupData = {
      username: document.getElementById("formSignupUsername").value,
      password: document.getElementById("formSignupPassword").value
    };

    Axios.post("/api/signup/", signupData)
      .then(resp => {
        Axios.get("/api/isloggedin/")
          .then(respSub => {
            console.log(respSub);
            if (respSub.data.message === "n") {
              this.setState({
                errorStyle: "",
                errorMessage: respSub.data.errorMessage
              });
            } else {
              this.setState({
                loggingInStyle: ""
              });
              window.location.replace("/");
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleOnClickReset = event => {
    event.preventDefault();
    document.getElementById("formSignupUsername").value = "";
    document.getElementById("formSignupPassword").value = "";
  };

  render() {
    const signingUpStyle = {
      display: this.state.signingUpStyle,
      color: "green",
      fontWeight: "bolder"
    };
    const errorStyle = {
      display: this.state.errorStyle,
      color: "red"
    };
    const titleStyle = {
      fontWeight: "bold",
      fontSize: "1.6em"
    }
    return (
      <>
        <div
          className={`selectMask_box_signup ${
            this.state.dateSelected ? "maskSignup" : ""
          } `}
          style={signingUpStyle}
        >
          <p style={{ marginTop: "100px", fontSize: "38px" }}>Signing up...</p>
        </div>
        <Container className="formCon">
          <Formik
            initialValues={{ guid: "", gpin: "", gpin2: "" }}
            validationSchema={SignupSchema}
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
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label style={titleStyle}>Please Signup: </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={errorStyle}>
                    {this.state.errorMessage}
                  </Form.Label>
                </Form.Group>
                <Form.Group controlId="formSignupUsername">
                  <Form.Label className="formLabel">User Name</Form.Label>
                  <Form.Label>
                    {touched.guid && errors.guid ? (
                      <div className="error-message">{errors.guid}</div>
                    ) : null}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="New user name..."
                    name="guid"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.guid}
                    className={touched.guid && errors.guid ? "error-box" : null}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your info with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formSignupPassword">
                  <Form.Label className="formLabel">Password</Form.Label>
                  <Form.Label>
                    {touched.gpin && errors.gpin ? (
                      <div className="error-message">{errors.gpin}</div>
                    ) : null}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password..."
                    name="gpin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.gpin}
                    className={touched.gpin && errors.gpin ? "error-box" : null}
                  />
                </Form.Group>
                <Form.Group controlId="formSignupPassword2">
                  <Form.Label className="formLabel">
                    Confirm Password
                  </Form.Label>
                  <Form.Label>
                    {errors.gpin2 ? (
                      <div className="error-message">{errors.gpin2}</div>
                    ) : null}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password..."
                    name="gpin2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.gpin2}
                    className={
                      errors.gpin2 ? "error-box" : null
                    }
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
                  onClick={event => this.handleOnClickReset(event)}
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

export default Signup;
