const pool = require("./pool");

async function addUser({ email, first_name, last_name, password_hash }) {
  const result = await pool.query(
    "INSERT INTO users (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, first_name, last_name, password_hash]
  );
  return result.rows[0];
}

module.exports = {
  addUser,
};
