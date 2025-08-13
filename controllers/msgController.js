const { validationResult } = require("express-validator");
const db = require("../db/queries");

exports.showCreateForm = (req, res) => {
  res.render("create-msg");
};

exports.createMsg = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("create-msg", {
      errors: errors.array().map((e) => e.msg),
    });
  }

  const { title, text } = req.body;
  const user_id = req.user.id;

  try {
    const post = await db.createMsg({ user_id, title, content: text });

    if (!post) {
      return res.render("create-msg", { errors: ["Could not create message"] });
    }

    res.redirect("/");
  } catch (err) {
    console.error("Create message error:", err);
    return res.render("create-msg", {
      errors: ["Server error, please try again later"],
    });
  }
};
