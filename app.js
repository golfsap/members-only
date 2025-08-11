const express = require("express");
const path = require("node:path");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const pool = require("./db/pool");

const pgSession = require("connect-pg-simple")(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new pgSession({ pool: pool, tableName: "session" });

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

const initializePassport = require("./config/passport");
initializePassport(passport);

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  console.log("Session ID:", req.sessionID);
  console.log("Current user:", req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

app.use("/", routes);

/**
 * -------------- SERVER ----------------
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT};`);
});
