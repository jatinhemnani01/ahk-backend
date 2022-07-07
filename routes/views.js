const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/count", (req, res) => {
  const { kid } = req.query;
  res.send(kid);
});

module.exports = router;
