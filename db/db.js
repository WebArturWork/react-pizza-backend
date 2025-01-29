const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../config");

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("⚙️ Подключение к базе данных успешно!");
});

module.exports = db;
