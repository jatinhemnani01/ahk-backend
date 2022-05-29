const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET ALL new_karaoke
router.get("/", (_, res) => {
  const query =
    "select kid,artist,name,album_cover_art,album,year from all_karaoke order by date_added desc limit 10;";

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({
        ok: false,
        message: err.code,
      });
    } else {
      res.status(200);
      res.json({
        ok: true,
        data: result,
      });
    }
  });
});

module.exports = router;
