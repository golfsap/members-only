const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

exports.showSignupForm = async (req, res) => {
  res.render("signup");
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, first_name, last_name, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const user = await db.addUser({
      email,
      first_name,
      last_name,
      password_hash,
    });

    if (!user) {
      return res.status(500).json({ message: "Could not register user", user });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email already in use" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
