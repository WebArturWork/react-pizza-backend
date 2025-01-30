const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/get_products", (req, res) => {
  let { category, sortBy, order } = req.query;

  let query = "SELECT * FROM items";
  let queryParams = [];

  // Фильтрация по категории
  if (category) {
    query += " WHERE category_id = ?";
    queryParams.push(category);
    console.log("✔️ Фильтрация по категории", category);
  }

  // Сортировка
  const allowedSortColumns = ["price", "name", "rating"]; // Разрешённые поля для сортировки
  if (sortBy && allowedSortColumns.includes(sortBy)) {
    order = order === "desc" ? "DESC" : "ASC"; // Проверка order
    query += ` ORDER BY ${sortBy} ${order}`;
    console.log("✔️ Сортировка по", sortBy, order);
  }

  // Выполняем SQL-запрос
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("❌ Ошибка получения товаров:", err);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
    console.log("✔️ Товары получены");
    res.status(200).json(results);
  });
});

router.get("/get_top_products", (req, res) => {
  db.query("SELECT * FROM items WHERE rating > 4", (err, results) => {
    if (err) {
      console.error("❌ Ошибка получения товаров:", err);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
    console.log("✔️ ТОП товары получены");
    res.status(200).json(results);
  });
});

module.exports = router;
