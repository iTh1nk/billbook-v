const controller = require("../controllers/controller");

module.exports = (app, passport) => {
  // app.post(
  //   "/api/signup/",
  //   passport.authenticate("local-signup", {
  //     successRedirect: "/",
  //     failureRedirect: "/"
  //   })
  // );
  app.post(
    "/api/login/",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
  app.post("/api/signupadmin/", isLoggedInAPI, controller.signupAdmin);

  app.post("/api/newactivity/", isLoggedInAPI, controller.newActivity);
  app.get("/api/getactivity0/",isLoggedInAPI, controller.getActivity0);
  app.get("/api/getactivity1/:user", isLoggedInAPI, controller.getActivity1);
  app.post("/api/updateactivity0/", isLoggedInAPI, controller.updateActivity0);
  app.post("/api/updateactivity1/", isLoggedInAPI, controller.updateActivity1);
  app.post("/api/approveactivity/", isLoggedInAPI, controller.approveActivity);

  app.post("/api/newcycle/", isLoggedInAPI, controller.newCycle);
  app.get("/api/getcycle/", isLoggedInAPI, controller.getCycle);
  app.post("/api/updatecycle/", isLoggedInAPI, controller.updateCycle);

  app.post("/api/newstatement/", isLoggedInAPI, controller.newStatement);
  app.post("/api/updatestatement/", controller.updateStatement);
  app.get("/api/getstatement/", isLoggedInAPI, controller.getStatement);

  app.get("/api/getuser/", isLoggedInAPI, controller.getUser);
  app.get("/api/isloggedin/", isLoggedIn);
  app.get("/api/logout/", isLoggedInAPI, logout);
  app.post("/api/updateuser/", isLoggedInAPI, controller.updateUser);
  app.post("/api/deleteuser/:username", isLoggedInAPI, controller.deleteUser);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      res.json({
        message: "y",
        user: req.user.username,
        id: req.user._id,
        group: req.user.group
      });
      // return next();
    } else {
      // res.redirect('/');
      res.json({ message: "n", errorMessage: req.flash("error") });
    }
  }

  function isLoggedInAPI(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("Routes: HERE")
      return next();
    } else {
      res.json({ message: "n", generalMessage: "Unauthorized Action!" });
      // res.json({ message: "n" })
    }
  }
  function logout(req, res) {
    req.session.destroy(function(err) {
      res.json({ message: "y" });
    });
  }
};
