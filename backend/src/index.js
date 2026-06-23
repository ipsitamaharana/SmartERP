require("dotenv").config();

const express = require("express");
const supabase = require("./config/supabase");

const app = express();

const PORT = process.env.PORT || 5000;
console.log("PORT from .env =", process.env.PORT);

app.get("/", (req, res) => {
  res.send("SmartERP Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});