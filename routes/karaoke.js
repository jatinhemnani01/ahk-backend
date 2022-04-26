const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/all", (req, res) => {
  db.query("select * from `ahk-db`.all_karaoke;", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({
        ok: false,
      });
      return;
    }
    res.status(200);
    res.json({
      ok: true,
      data: result,
    });
  });
});

router.post("/add_karaoke", (req, res) => {
  const { name, artist, album, year, album_cover_art, duet } = req.body;

  const karaoke = {
    name,
    artist,
    album,
    year,
    album_cover_art,
    duet,
  };

  db.query("insert into `ahk-db`.all_karaoke SET ?", karaoke, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({
        ok: false,
        message: "Error adding karaoke to database",
      });
      return;
    }
    res.json({
      ok: true,
      message: "Karaoke added to database",
      data: karaoke,
    });
  });
});

module.exports = router;
