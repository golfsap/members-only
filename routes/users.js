const { Router } = require("express");
const userController = require("../controllers/userController");
const { signupValidator, loginValidator } = require("../validators/validator");
const { isAuth } = require("./authMiddleware");

const usersRouter = Router();

/**
 * -------------- POST ROUTES ----------------
 */

usersRouter.post("/signup", signupValidator, userController.signup);

usersRouter.post("/login", loginValidator, userController.login);

usersRouter.post("/join", isAuth, userController.joinClub);

/**
 * -------------- GET ROUTES ----------------
 */

usersRouter.get("/signup", userController.showSignupForm);

usersRouter.get("/login", userController.showLoginForm);

usersRouter.get("/join", isAuth, userController.showJoinForm);

usersRouter.get("/logout", userController.logout);

module.exports = usersRouter;
