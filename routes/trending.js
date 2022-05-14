const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res) => {

  const trending_query = `select kid,artist,name,album_cover_art,album from all_karaoke where kid IN(select kid from trending);`;
  db.query(trending_query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
      console.log(err);
    } else {
      res.status(200);
      res.json(result);
      console.log(result);
    }
  });
});

module.exports = router;
