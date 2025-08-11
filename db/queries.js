const pool = require("./pool");

async function addUser({ email, first_name, last_name, password_hash }) {
  const result = await pool.query(
    "INSERT INTO users (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, first_name, last_name, password_hash]
  );
  return result.rows[0];
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

module.exports = {
  addUser,
  findUser,
  findById,
  updateUserRole,
};
