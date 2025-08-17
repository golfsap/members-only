const { body } = require("express-validator");

exports.signupValidator = [
  body("first_name").trim().notEmpty().withMessage("First name is required"),
  body("last_name").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("admin_passcode").custom((value) => {
    if (!value) return true;

    if (value !== process.env.ADMIN_PASSCODE) {
      throw new Error("Incorrect admin passcode");
    }
    return true;
  }),
];

exports.loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

exports.createMsgValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Message text is required.")
    .isLength({ max: 1000 })
    .withMessage("Message text cannot exceed 1000 characters."),
];
