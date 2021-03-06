import React, { useState, useEffect, useReducer } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./UserInfo.css";
import Axios from "axios";
import Moment from "moment";
// import toaster from "toasted-notes";

export default function UserInfo(props) {
  const [afterSub, setAfterSub] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [group, setGroup] = useState("");
  const [user, setUser] = useState("");
  const [getDeposit, setGetDeposit] = useState("");
  const [getBalance, setGetBalance] = useState("");
  const [getApproval, setGetApproval] = useState("");
  const [getDate, setGetDate] = useState("");
  const [getDifference, setGetDifference] = useState("");

  //React-Bootstrap Modal Hook
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   toaster.notify(
  //     <div style={{ fontWeight: "bold" }}>
  //       "These violent delights have violent ends”
  //     </div>,
  //     {
  //       duration: 5000
  //     }
  //   );
  // }, []);

  useEffect(() => {
    setUser(props.user);
    setGroup(props.group);
    Axios.get("https://api.we0mmm.site/api/getactivity1/" + user, {
      withCredentials: true,
    })
      .then((resp) => {
        setGetDeposit(resp.data.deposit);
        setGetBalance(resp.data.totalBalance);
        setGetDifference(
          parseFloat(resp.data.totalBalance).toFixed(2) -
            parseFloat(resp.data.deposit).toFixed(2)
        );
        setGetApproval(resp.data.approval);
        setGetDate(resp.data.updatedAt);
        dispatch({ type: props.user });
        dispatch2({ type: props.user });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const getTotalBalance = () => {
    let color = "";
    if (getDifference > 0) {
      color = "red";
    } else {
      color = "green";
    }
    return [parseFloat(getDifference).toFixed(2), color];
  };

  const handleOnClickSubmit = () => {
    let data = {
      username: user,
      deposit: deposit,
      totalBalance: getTotalBalance()[0],
    };
    document.getElementById("userDeposit").value = "";
    Axios.post("https://api.we0mmm.site/api/updateactivity1/", data, {
      withCredentials: true,
    })
      .then((resp) => {
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const decideApproval = () => {
    if (getApproval == "Pending") {
      return ["Pending Approval", "goldenrod"];
    } else {
      return ["Approved", "green"];
    }
  };

  const divStyle = {
    marginBottom: ".6em",
    display: "inline-block",
    width: "100%",
  };
  const welcomStyle = {
    color: "green",
    display: "inline-block",
    marginLeft: ".3em",
    fontSize: "1.5em",
  };
  const inputStyle = {
    width: "5em",
    height: "2em",
    display: "inline-block",
    marginLeft: "0.5em",
    marginRight: "0.5em",
  };
  const btnStyle = {
    display: "inline-blockÎ",
  };
  const warnStyle = {
    display: "inline-block",
    fontWeight: "bold",
    color: "darkblue",
    fontStyle: "italic",
  };
  const DepositSchema = Yup.object().shape({
    deposit: Yup.string()
      .matches(/^\d+([.]{0,1}\d{0,2})/, "*Invalid Deposit Amount")
      .required("*Deposit Amount Is Required"),
  });
  const [userShowName, dispatch] = useReducer(userShowNameFun, props.user);
  function userShowNameFun(state, action) {
    switch (action.type) {
      case "8731":
        return "Administrator";
      case "9299":
        return "Qian";
      case "9289":
        return "(This account is managed by 9532)";
      case "9532":
        return "Chen & Xue";
      case "6223":
        return "Yuhang & Yenan";
      case "9319":
        return "Kaishuo & Meng";
      case "8653":
        return "(This account is managed by 9319)";
      case "8820":
        return "(This account is managed by 6223)";
      case "9900":
        return "(This account is managed by 6223)";
      case "0467":
        return "(This account is managed by 8731)";
      default:
        return props.user;
    }
  }
  const [userShowWarn, dispatch2] = useReducer(userShowWarnFun, props.user);
  function userShowWarnFun(state, action) {
    switch (action.type) {
      case "8731":
        return "250";
      case "9299":
        return "250";
      case "9289":
        return "0";
      case "9532":
        return "(250 + 250)";
      case "6223":
        return "150 (From 8820)";
      case "9319":
        return "(200 + 200)";
      case "8653":
        return "200";
      case "8820":
        return "150";
      case "9900":
        return "0";
      case "0467":
        return "0";
      default:
        return props.user;
    }
  }
  return (
    <div style={divStyle}>
      <div
        style={{
          display: "inline-block",
          fontWeight: "bold",
          fontSize: "1.5em",
        }}
      >
        You are logged in as:{" "}
      </div>
      <div style={welcomStyle}>
        {/* {user === "8731" ? " Administrator" : props.user} */}
        {userShowName}
      </div>
      <hr />
      <p className="topNotification">
        <span>
          <div style={{ display: "inline-block" }}>
            <img
              style={{ width: "1.5em", height: "1.5em", marginRight: ".3em" }}
              src="attention.gif"
            ></img>
          </div>
          <div style={warnStyle}>
            Please let me know if any questions or concerns thru WeChat.
          </div>
        </span>
      </p>
      <hr />
      <div
        style={{
          marginBottom: "1.5em",
          fontSize: "2em",
          fontFamily: "Oswald, sans-serif",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: ".5em" }}>
          Current Status:{" "}
          <div
            style={{
              display: "inline-block",
              fontSize: ".6em",
              color: "grey",
              fontStyle: "italic",
            }}
          >
            (since {Moment(getDate).format("MM-DD-YYYY HH:MM")})
          </div>
        </div>
        <div>
          Total Balance Due:{" "}
          <div style={{ color: getTotalBalance()[1] }}>
            ${getTotalBalance()[0]}
          </div>
        </div>
        <div>
          Last Deposit Made: <div style={{ color: "green" }}>${getDeposit}</div>
        </div>
        <div>
          Status:{" "}
          <div style={{ color: decideApproval()[1] }}>
            {decideApproval()[0]}
          </div>
        </div>
      </div>
      <hr />
      <div style={{ fontWeight: "bold" }}>
        After transferring deposit to account owner, please specify the amount
        here:
      </div>
      <Formik
        initialValues={{ deposit: "" }}
        validationSchema={DepositSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setDeposit(values.deposit);
          handleShow();
          setSubmitting(true);
          // resetForm();
          // setAfterSub(`Your $${values.deposit} payment has been recorded!`);
          setTimeout(() => {
            setAfterSub("");
            setSubmitting(false);
          }, 3000);
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
              <Form.Label>
                {errors.deposit ? (
                  <div className="error-message">{errors.deposit}</div>
                ) : null}
              </Form.Label>
              <br />
              I made a transfer
              <Form.Control
                id="userDeposit"
                type="text"
                placeholder="$"
                name="deposit"
                style={inputStyle}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deposit}
                className={errors.deposit ? "error-box" : null}
              />
              to account owner.
            </Form.Group>

            <Button
              size="sm"
              variant="outline-success"
              style={btnStyle}
              type="submit"
              disabled={isSubmitting}
            >
              Confirm
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Record Deposit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to record{" "}
                <a style={{ color: "green", fontWeight: "bold" }}>${deposit}</a>{" "}
                deposit~
                <div
                  style={{
                    color: "grey",
                    fontSize: ".8em",
                    fontStyle: "italic",
                  }}
                >
                  (Attention: You may notice the deposit won't reflect when
                  you're using a tablet or phone, please try again or use a
                  computer.)
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button variant="primary" onClick={handleOnClickSubmit}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
      {/* <div className="">
        <span className="nortification animateOpen">{afterSub}</span>
      </div> */}
    </div>
  );
}
