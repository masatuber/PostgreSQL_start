require('dotenv').config(); // コードベタ打ち注意
const Pool = require("pg").Pool;
// 読込________________________________
const DB_USER_NAME = process.env.DB_USER;
const DB_HOST_NAME = process.env.DB_HOST;
const CREATE_DB_NAME = process.env.DB_NAME;
const PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.DB_PORT;
// _____________________________________
const pool = new Pool({
  user: DB_USER_NAME, // ログインのユーザー postgres
  host: DB_HOST_NAME,
  database: CREATE_DB_NAME, // データベース作成時の名前
  password: PASSWORD,
  port: PORT,
});

module.exports = pool;