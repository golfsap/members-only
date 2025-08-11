const { Router } = require("express");
const userController = require("../controllers/userController");
const { signupValidator } = require("../validators/userValidator");

const usersRouter = Router();

/**
 * -------------- POST ROUTES ----------------
 */

usersRouter.post("/signup", signupValidator, userController.signup);

/**
 * -------------- GET ROUTES ----------------
 */

usersRouter.get("/signup", userController.showSignupForm);

module.exports = usersRouter;
