const { Router } = require("express");
const msgController = require("../controllers/msgController");
const { isAuth } = require("./authMiddleware");
const { createMsgValidator } = require("../validators/validator");

const msgRouter = Router();

/**
 * -------------- POST ROUTES ----------------
 */

msgRouter.post(
  "/create-msg",
  isAuth,
  createMsgValidator,
  msgController.createMsg
);

/**
 * -------------- GET ROUTES ----------------
 */

msgRouter.get("/create-msg", isAuth, msgController.showCreateForm);

module.exports = msgRouter;
