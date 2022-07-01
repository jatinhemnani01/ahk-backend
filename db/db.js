const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host:process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.getConnection((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("mysql Connected");
});

module.exports = db;
