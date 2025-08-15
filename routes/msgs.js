const { Router } = require("express");
const msgController = require("../controllers/msgController");
const { isAuth, isAdmin } = require("./authMiddleware");
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

/**
 * -------------- DELETE ROUTES ----------------
 */

msgRouter.delete("/messages/:id", isAdmin, msgController.deleteMsg);

module.exports = msgRouter;
