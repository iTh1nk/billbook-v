const controller = require("../controllers/controller");

module.exports = (app, passport) => {
  app.post(
    "/api/signup/",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
  app.post(
    "/api/login/",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
  app.post("/api/signupadmin/", controller.signupAdmin);

  app.post("/api/newactivity/", controller.newActivity);
  app.get("/api/getactivity0/", controller.getActivity0);
  app.get("/api/getactivity1/:user", controller.getActivity1);
  app.post("/api/updateactivity0/", controller.updateActivity0);
  app.post("/api/updateactivity1/", controller.updateActivity1);
  app.post("/api/approveactivity/", controller.approveActivity);
  
  app.post("/api/newcycle/", controller.newCycle);
  app.get("/api/getcycle/", controller.getCycle);
  app.post("/api/updatecycle/", controller.updateCycle);

  app.post("/api/newstatement/", controller.newStatement);
  app.post("/api/updatestatement/", controller.updateStatement);
  app.get("/api/getstatement/", controller.getStatement);
  
  app.get("/api/getuser/", controller.getUser);
  app.get("/api/isloggedin/", isLoggedIn);
  app.get("/api/logout/", logout);
  app.post("/api/updateuser/", controller.updateUser);
  app.post("/api/deleteuser/:username", controller.deleteUser);

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

  function logout(req, res) {
    req.session.destroy(function(err) {
      res.json({message: "y"})
    });
  }
}