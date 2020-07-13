/*
 * Created(Part) on Mon Jul 13 2020
 *
 * Copyright (c) 2020 We0mmm
 */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const path = require("path");
const routes = require("./routes/routes");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const db = require("./models");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(logger("dev"));

app.use(
  session({
    secret: "mac master",
    cookie: { maxAge: 30 * 60 * 1000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: "/\.we0mmm\.site$/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
  credentials: true,
  origin: true,
  exposedHeaders:
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Content-Range, X-Content-Range",
  allowedHeaders:
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Content-Range, X-Content-Range",
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use("/api/test", (req, res) => {
  return res.send("hello");
});
app.use("/api/a/json", (req, res) => {
  return res.json({message: "No One Else Like You!"})
})

require("./config/passport/passport")(passport, db.User);
require("./routes/routes")(app, passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/billbookverizon",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

http.listen(PORT, () => {
  console.log(`🌊  App is listening on PORT: ${PORT}`);
});
