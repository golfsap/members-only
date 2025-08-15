const pool = require("./pool");

async function addUser({ email, first_name, last_name, password_hash, role }) {
  if (role) {
    const result = await pool.query(
      "INSERT INTO users (email, first_name, last_name, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, first_name, last_name, password_hash, role]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      "INSERT INTO users (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, first_name, last_name, password_hash]
    );
    return result.rows[0];
  }
}

async function findUser({ email }) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, email, first_name, last_name, role FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function updateUserRole(id) {
  const result = await pool.query(
    "UPDATE users SET role = 'club' WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

async function createMsg({ user_id, title, content }) {
  const result = await pool.query(
    "INSERT INTO posts (user_id, title, content) VALUES ($1,$2, $3) RETURNING *",
    [user_id, title, content]
  );
  return result.rows[0];
}

async function getAllMessages() {
  const result = await pool.query(
    "SELECT posts.id, posts.title, posts.content, posts.created_at, users.first_name, users.last_name FROM posts JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC"
  );
  return result.rows;
}

async function getMessageById({ id }) {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0];
}

async function deleteMessage({ id }) {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  addUser,
  findUser,
  findById,
  updateUserRole,
  createMsg,
  getAllMessages,
  getMessageById,
  deleteMessage,
};
