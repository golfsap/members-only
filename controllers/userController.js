const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const passport = require("passport");

exports.showSignupForm = (req, res) => {
  res.render("signup");
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", { errors: errors.array().map((e) => e.msg) });
  }

  const { email, first_name, last_name, password, admin_passcode } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const userData = {
      email,
      first_name,
      last_name,
      password_hash,
    };

    if (admin_passcode && admin_passcode === process.env.ADMIN_PASSCODE) {
      userData.role = "admin";
    }

    const user = await db.addUser(userData);

    if (!user) {
      return res.render("signup", { errors: ["Could not register user"] });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.render("signup", { errors: ["Email already in use"] });
    }
    console.error(err);
    return res.render("signup", {
      errors: ["Server error, please try again later"],
    });
  }
};

exports.showLoginForm = (req, res) => {
  res.render("login");
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", { errors: errors.array().map((e) => e.msg) });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      return res.render("login", { errors: [info.message] });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.showJoinForm = (req, res) => {
  if (req.user.role === "club") {
    return res.redirect("/");
  }
  res.render("join");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.joinClub = async (req, res, next) => {
  const { passcode } = req.body;

  try {
    if (passcode === process.env.MEMBER_PASSCODE) {
      const user = await db.updateUserRole(req.user.id);

      if (!user) {
        return res.render("join", {
          errors: ["Could not update member status"],
        });
        // return res
        //   .status(500)
        //   .json({ message: "Could not update member status" });
      }

      res.redirect("/");
    } else {
      res.render("join", { errors: ["Sorry, wrong passcode :("] });
    }
  } catch (err) {
    next(err);
  }
};
