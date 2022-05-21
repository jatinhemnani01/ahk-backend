const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res) => {

  const popular_query = `select kid,artist,name,album_cover_art,album from all_karaoke where kid IN(select kid from popular_karaoke);`;
  db.query(popular_query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json({
        ok:true,
        data:result
      });
    }
  });
});

module.exports = router;
