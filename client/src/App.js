import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navs from "./components/Navs";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";
import NoMatch from "./components/NoMatch";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import Rnotes from "./components/Rnotes";
import We0mmm from "./components/We0mmm";
import Admin from "./components/Admin";

function isLoggedIn() {
  Axios.get("/api/isloggedin/")
    .then(resp => {
      console.log("isLoggedIn: ", resp);
    })
    .catch(err => {
      console.log(err);
    });
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    console.log("App isLoggedIn: ", isLoggedIn);
    Axios.get("/api/isloggedin/")
      .then(resp => {
        if (resp.data.message === "n") {
          console.log("App isLoggedIn(n): ", resp);
          setIsLoggedIn(false);
        } else {
          console.log("App isLoggedIn(y): ", resp);
          setIsLoggedIn(true);
          setUser(resp.data.user);
          setGroup(resp.data.group);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div>
      {/* <img src='./favicon.ico' className="App-logo" style={{width: "10%", height: "10%"}} alt="logo" /> */}
      <Navs auth={isLoggedIn} user={user} group={group} />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              isLoggedIn ? (
                <MainPage auth={isLoggedIn} user={user} group={group} />
              ) : (
                <We0mmm />
              )
            }
          />
          <Route
            exact
            path="/profile/"
            render={props => (isLoggedIn ? <Profile /> : <Login />)}
          />
          <Route
            exact
            path="/login/"
            render={props =>
              isLoggedIn ? (
                <MainPage auth={isLoggedIn} user={user} group={group} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            exact
            path="/we0mmm/signup/"
            render={props =>
              isLoggedIn ? (
                <MainPage auth={isLoggedIn} user={user} group={group} />
              ) : (
                <Signup />
              )
            }
          />
          <Route
            exact
            path="/admin/"
            render={props =>
              user === "8731" ? (
                <Admin auth={isLoggedIn} user={user} group={group} />
              ) : (
                <NoMatch />
              )
            }
          />
          <Route exact path="/beta/" component={Signup} />
          <Route exact path="/rnotes/" component={Rnotes} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
