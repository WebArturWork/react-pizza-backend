const express = require("express");
const { PORT } = require("./config");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const generalRoutes = require("./routes/index");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/api", generalRoutes);

const server = app.listen(PORT, () =>
  console.log(`🚀 Сервер запущен на порту ${PORT}`)
);
server.setTimeout(300000);

module.exports = app;
