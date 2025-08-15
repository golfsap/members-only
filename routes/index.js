const { Router } = require("express");
const usersRoutes = require("./users");
const msgRoutes = require("./msgs");
const msgController = require("../controllers/msgController");

const indexRouter = Router();

indexRouter.get("/", msgController.getHomepage);

indexRouter.use("/", usersRoutes);
indexRouter.use("/", msgRoutes);

module.exports = indexRouter;
