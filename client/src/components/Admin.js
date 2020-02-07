import React, { useState, useEffect, useReducer } from "react";
import { Container, Button, Form, Nav, Table } from "react-bootstrap";
import Signup from "./Signup";
import Axios from "axios";
import Moment from "moment";

const titleStyle = {
  fontWeight: "bold",
  fontSize: "2em"
};

//Activity
function newActivity(e) {
  e.preventDefault();
  let data = {
    username: document.getElementById("newActivityUser").value,
    totalBalance: document.getElementById("newActivityTotalBalance").value,
    deposit: document.getElementById("newActivityDeposit").value,
    approval: document.getElementById("newActivityApproval").value
  };
  Axios.post("/api/newactivity", data)
    .then(resp => {
      console.log(resp);
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

function approveActivity(e) {
  let data = {
    approval: document.getElementById("approveActivityApproval").value,
    username: document.getElementById("approveActivityUser").value
  };
  Axios.post("/api/approveactivity/", data)
    .then(resp => {
      console.log("Approve Activity: ", resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function updateActivity(e) {
  let data = {
    username: document.getElementById("updateActivityUser").value,
    balance: document.getElementById("updateActivityTotalBalance").value,
    deposit: document.getElementById("updateActivityDeposit").value,
    approval: document.getElementById("updateActivityApproval").value
  };
  Axios.post("/api/updateactivity0", data)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function ActivityTab() {
  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showUserValue, setShowUserValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const handleShowUserActivity = (e, userArg) => {
    setShowUserValue(userArg);
    setShowUser(true);
  };

  const ShowUserActivity = () => {
    for (let i = 0; i < users.length; i++) {
      console.log(showUserValue, users[i].username);
      console.log(users.length, i);
      if (showUserValue == users[i].username) {
        return (
          <Table
            striped
            bordered
            hover
            variant="dark"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Deposit</th>
                <th>Total Balance</th>
                <th>UpdatedAt</th>
                <th>UpdatedAt1</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "lightblue" }}>${users[i].deposit}</td>
                <td style={{ color: "red" }}>${users[i].totalBalance}</td>
                <td>
                  {Moment(users[i].updatedAt0).format("MM-DD-YYYY HH:MM")}
                </td>
                <td>{Moment(users[i].updatedAt).format("MM-DD-YYYY HH:MM")}</td>
                <td>{users[i].approval}</td>
              </tr>
            </tbody>
          </Table>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    Axios.get("/api/getactivity0/")
      .then(resp => {
        console.log("getActivity0: ", resp.data);
        setUsers(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
    Axios.get("/api/getuser/")
      .then(resp => {
        // console.log("newStatementUsers: ", resp.data)
        setAllUsers(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <hr />
      {/* Create New Activity */}
      <Form
        onSubmit={e => {
          newActivity(e);
        }}
      >
        <Form.Label style={titleStyle}>Create New Activity</Form.Label>
        <Form.Group controlId="newActivityUser">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {allUsers.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="newActivityTotalBalance">
          <Form.Label>Total Balance</Form.Label>
          <Form.Control type="text" placeholder="Total Balance..." />
        </Form.Group>

        <Form.Group controlId="newActivityDeposit">
          <Form.Label>Deposit</Form.Label>
          <Form.Control type="text" placeholder="Deposit..." />
        </Form.Group>

        <Form.Group controlId="newActivityApproval">
          <Form.Label>Approval Status</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            <option>Pending</option>
            <option>Approved</option>
          </Form.Control>
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <hr />
      {/* Approve Activity */}
      <Form
        onSubmit={e => {
          approveActivity(e);
        }}
      >
        <Form.Label style={titleStyle}>Approve Activity</Form.Label>
        <Form.Group controlId="approveActivityUser">
          <Form.Label>Choose User</Form.Label>
          <Form.Control
            as="select"
            onChange={e =>
              handleShowUserActivity(
                e,
                document.getElementById("approveActivityUser").value
              )
            }
          >
            <option>Select...</option>
            {users.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>
        {showUser ? <ShowUserActivity /> : null}
        <Form.Group controlId="approveActivityApproval">
          <Form.Label>Approval Status</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            <option>Pending</option>
            <option>Approved</option>
          </Form.Control>
        </Form.Group>
        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <hr />
      {/* Update Activity */}
      <Form
        onSubmit={e => {
          updateActivity(e);
        }}
      >
        <Form.Label style={titleStyle}>Update Activity</Form.Label>
        <Form.Group controlId="updateActivityUser">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {users.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="updateActivityTotalBalance">
          <Form.Label>Total Balance</Form.Label>
          <Form.Control type="text" placeholder="Total Balance..." />
        </Form.Group>

        <Form.Group controlId="updateActivityDeposit">
          <Form.Label>Deposit</Form.Label>
          <Form.Control type="text" placeholder="Deposit..." />
        </Form.Group>

        <Form.Group controlId="updateActivityApproval">
          <Form.Label>Approval Status</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            <option>Pending</option>
            <option>Approved</option>
          </Form.Control>
        </Form.Group>
        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <hr />
    </>
  );
}

//Statement
function newStatement(e) {
  let data = {
    username: document.getElementById("newStatementUser").value,
    cycle: document.getElementById("newStatementCycle").value,
    currentBalance: document.getElementById("newStatementCurrentBalance").value,
    notes: document.getElementById("newStatementNotes").value || "NA"
  };
  Axios.post("/api/newstatement", data)
    .then(resp => {
      console.log("newStatement: ", resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function updateStatement(e) {
  // e.preventDefault();
  let data = {
    username: document.getElementById("updateStatementUser").value,
    cycle: document.getElementById("updateStatementCycles").value,
    currentBalance: document.getElementById("updateStatementCurrentBalance")
      .value,
    notes: document.getElementById("updateStatementNotes").value
  };
  Axios.post("/api/updatestatement/", data)
    .then(resp => {
      console.log("updateMent: ", resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function StatementTab() {
  const [statement, setStatement] = useState([]);
  const [users, setUsers] = useState([]);
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    Axios.get("/api/getstatement/")
      .then(resp => {
        console.log("getStatement: ", resp);
        setStatement(resp.data);
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("/api/getuser/")
      .then(resp => {
        // console.log("newStatementUsers: ", resp.data)
        setUsers(resp.data);
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("/api/getcycle/")
      .then(resp => {
        setCycles(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <hr />
      {/* Create New Statement */}
      <Form
        onSubmit={e => {
          newStatement(e);
        }}
      >
        <Form.Label style={titleStyle}>Create New Statement</Form.Label>
        <Form.Group controlId="newStatementUser">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {users.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="newStatementCurrentBalance">
          <Form.Label>Cycle Balance</Form.Label>
          <Form.Control type="text" placeholder="Current Balance..." />
        </Form.Group>

        <Form.Group controlId="newStatementCycle">
          <Form.Label>Choose Cycle</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {cycles.map(item => (
              <option key={item._id}>{item.date}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="newStatementNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />

      <hr />
      {/* Update Statement */}
      <Form
        onSubmit={e => {
          updateStatement(e);
        }}
      >
        <Form.Label style={titleStyle}>Update Statement</Form.Label>
        <Form.Group controlId="updateStatementUser">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {users.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="updateStatementCurrentBalance">
          <Form.Label>Current Balance</Form.Label>
          <Form.Control type="text" placeholder="Current Balance..." />
        </Form.Group>

        <Form.Group controlId="updateStatementCycles">
          <Form.Label>Choose Cycle</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {cycles.map(item => (
              <option key={item._id}>{item.date}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="updateStatementNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />

      <hr />
    </>
  );
}

//Cycle
function newCycle(e) {
  let data = {
    date: document.getElementById("newCycleDate").value
  };
  Axios.post("/api/newcycle/", data)
    .then(resp => {
      console.log("New Cycle:", resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function udpateCycle(e) {
  let data = {
    chooseDate: document.getElementById("updateCycleChooseDate").value,
    date: document.getElementById("updateCycleDate").value
  };
  Axios.post("/api/updatecycle/", data)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function CycleTab() {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    Axios.get("/api/getcycle/")
      .then(resp => {
        console.log("getCycle: ", resp);
        setCycles(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <hr />
      {/* Create New Cycle */}
      <Form
        onSubmit={e => {
          newCycle(e);
        }}
      >
        <Form.Label style={titleStyle}>Create New Cycle</Form.Label>
        <Form.Group controlId="newCycleDate">
          <Form.Label>New Cycle Date</Form.Label>
          <Form.Control type="text" placeholder="Cycle Date..." />
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />

      <hr />
      {/* Update Cycle */}
      <Form
        onSubmit={e => {
          udpateCycle(e);
        }}
      >
        <Form.Label style={titleStyle}>Update Cycle</Form.Label>
        <Form.Group controlId="updateCycleChooseDate">
          <Form.Label>Choose Cycle</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {cycles.map(item => (
              <option key={item._id}>{item.date}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="updateCycleDate">
          <Form.Label>Update Cycle Date</Form.Label>
          <Form.Control type="text" placeholder="Update Cycle Date..." />
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br />
      <br />

      <hr />
    </>
  );
}

function UserInfo(props) {
  const divStyle = {
    marginBottom: ".6em",
    display: "inline-block",
    width: "100%"
  };
  const welcomStyle = {
    color: "green",
    display: "inline-block",
    marginLeft: ".3em",
    fontSize: "1.5em"
  };
  const inputStyle = {
    width: "5em",
    height: "2em",
    display: "inline-block",
    marginLeft: "0.5em",
    marginRight: "0.5em"
  };
  const moneyColor = (balance, deposit) => {
    if (parseFloat(balance) > parseFloat(deposit)) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };
  const approvalColor = approval => {
    if (approval == "Approved") {
      return { color: "green" };
    } else {
      return { color: "goldenrod" };
    }
  };
  return (
    <>
      {props.users.map((item, index) => (
        <div style={divStyle} key={index}>
          <div
            style={{
              marginBottom: "1.5em",
              fontSize: "2em",
              fontFamily: "Oswald, sans-serif"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: ".5em",
                color: "green"
              }}
            >
              {item.username}
              <div
                style={{
                  display: "inline-block",
                  fontSize: ".6em",
                  color: "grey",
                  fontStyle: "italic",
                  marginLeft: ".5em"
                }}
              >
                (since {Moment(item.updatedAt).format("MM-DD-YYYY HH:MM")})
              </div>
            </div>
            <div>
              Total Balance:{" "}
              <div style={moneyColor(item.totalBalance, item.deposit)}>
                $
                {parseFloat(
                  parseFloat(item.totalBalance) - parseFloat(item.deposit)
                ).toFixed(2)}
              </div>
            </div>
            <div>
              Last Deposit Made:{" "}
              <div style={{ color: "green" }}>${item.deposit}</div>
            </div>
            <div>
              Status:{" "}
              <div style={approvalColor(item.approval)}>{item.approval}</div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}

// User Tab Starts
function updateUserData (e) {
  e.preventDefault();
  let data = {
    username: document.getElementById("userDataChoose").value,
    password: document.getElementById("userDataPassword").value,
    group: document.getElementById("userDataGroup").value
  }
  Axios
    .post("/api/updateuser/", data)
    .then(resp => {
      console.log("User Info Updated!");
      document.getElementById("userDataChoose").value = "";
      document.getElementById("userDataPassword").value = "";
      document.getElementById("userDataGroup").value = "";
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteUserData (e) {
  e.preventDefault();
  let data = document.getElementById("userDataDelChoose").value;
  Axios
    .post("/api/deleteuser/" + data)
    .then(resp => {
      console.log("Deleted!");
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

function UpdateUser () {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("/api/getuser/")
      .then(resp => {
        // console.log("newStatementUsers: ", resp.data)
        setUserData(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  return (
    <div>
      <Form
        onSubmit={e => {
          updateUserData(e);
        }}
      >
        <Form.Label style={titleStyle}>Update User: </Form.Label>
        <Form.Group controlId="userDataChoose">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {userData.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="userDataPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="New password..." />
        </Form.Group>

        <Form.Group controlId="userDataGroup">
          <Form.Label>Group</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            <option>Admin</option>
            <option>Member</option>
            <option>Guest</option>
          </Form.Control>
        </Form.Group>

        <Button variant="outline-success" type="submit" className="float-right">
          Submit
        </Button>
      </Form>
      <br /><br />
      <Form
        onSubmit={e => {
          deleteUserData(e);
        }}
      >
        <Form.Label style={titleStyle}>Delete User: </Form.Label>
        <Form.Group controlId="userDataDelChoose">
          <Form.Label>Choose User</Form.Label>
          <Form.Control as="select">
            <option>Select...</option>
            {userData.map(item => (
              <option key={item._id}>{item.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="outline-danger" type="submit" className="float-right">
          Delete
        </Button>
      </Form>
      <br /><br />
    </div>
  )
}

function UserTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/api/getactivity0/")
      .then(resp => {
        console.log("getActivity0: ", resp.data);
        setUsers(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <hr />
      {/* <Signup />
      <hr /> */}
      <div style={titleStyle}>Add User: </div>
      <Signup />
      <hr />
      <UpdateUser />
      <hr />
      <UserInfo users={users} />
    </>
  );
}

// General main display
function WelcomTab() {
  const welcomeStyle = {
    textAlign: "center",
    padding: "6em"
  };
  return (
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
  );
}



export default function Admin() {
  const [tab, dispatch] = useReducer(tabReducer, <WelcomTab />);
  function tabReducer(state, action) {
    switch (action.type) {
      case "activity":
        return <ActivityTab />;
      case "statement":
        return <StatementTab />;
      case "cycle":
        return <CycleTab />;
      case "user":
        return <UserTab />;
      default:
        return <WelcomTab />;
    }
  }
  const conStyle = {
    marginTop: "2em",
    marginBottom: "2em",
    backgroundColor: "white",
    padding: "2em"
  };
  const tabStyle = {
    // color: "blue"
  };
  return (
    <Container style={conStyle}>
      {/* Tab Selection */}
      <Nav
        variant="pills success"
        defaultActiveKey="/home"
        style={{ marginBottom: "1.5em" }}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="activity"
            style={tabStyle}
            onClick={() => {
              dispatch({ type: "activity" });
            }}
          >
            Activity
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="statement"
            style={tabStyle}
            onClick={() => {
              dispatch({ type: "statement" });
            }}
          >
            Statement
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="cycle"
            style={tabStyle}
            onClick={() => {
              dispatch({ type: "cycle" });
            }}
          >
            Cycle
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="user"
            style={tabStyle}
            onClick={() => {
              dispatch({ type: "user" });
            }}
          >
            User
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab}
    </Container>
  );
}
