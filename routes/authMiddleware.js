exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ msg: "You are not authorized to view this resource." });
  //   res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.role === "admin") {
    return next();
  }
  res
    .status(401)
    .json({
      msg: "You are not authorized to view this resource because you are not an admin.",
    });
};
