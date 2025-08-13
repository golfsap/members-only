const { Router } = require("express");
const usersRoutes = require("./users");
const msgRoutes = require("./msgs");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

indexRouter.use("/", usersRoutes);
indexRouter.use("/", msgRoutes);

module.exports = indexRouter;
