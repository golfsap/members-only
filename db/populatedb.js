#!/usr/bin/env/node

const { Client } = require("pg");
require("dotenv").config();

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL_REMOTE,
  });
  await client.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'member', 
        created_at TIMESTAMP DEFAULT NOW()
    );`);
  await client.query(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR (255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW());`);
  await client.end();
  console.log("Done.");
}

main();
