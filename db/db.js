const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "2002",
  database: "ahk-db",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("mysql Connected");
});

module.exports = db;
