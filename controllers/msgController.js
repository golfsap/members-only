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

exports.getHomepage = async (req, res) => {
  try {
    const messages = await db.getAllMessages();

    res.render("index", {
      messages,
      user: req.user || null,
      isClubMember: req.user?.role === "club",
      isAdmin: req.user?.role === "admin",
    });
  } catch (err) {
    console.error(err);
    res.render("index", { messages: [], isClubMember: false });
  }
};

exports.deleteMsg = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await db.getMessageById({ id });

    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    const deleted = await db.deleteMessage({ id });

    if (!deleted) {
      return res.status(400).json({ msg: "Cannot delete message" });
    }

    res.redirect("/");
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.render("index", {
      errors: ["Server error, please try again later"],
    });
  }
};
