const express = require("express");
const router = express.Router();
const db = require("../db/db");

// SEARCH KARAOKE BY NAME
router.get("/name", (req, res) => {
  const { q, page, limit } = req.query;
  const start_index = (page - 1) * limit;
  const end_index = limit;
  db.query(
    `select name, artist, kid, album, year, album_cover_art from all_karaoke where name like "${q}%" limit ${start_index},${end_index}`,
    (err, result) => {
      if (err) {
        res.status(500);
        console.log(err);
        res.json({ ok: false, message: err.code });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
});

// SEARCH KARAOKE BY ARTIST
router.get("/artist", (req, res) => {
    const { q, page, limit } = req.query;
    const start_index = (page - 1) * limit;
    const end_index = limit;
    db.query(
      `select name, artist, kid, album, year, album_cover_art from all_karaoke where artist like "${q}%" order by kid desc limit ${start_index},${end_index}`,
      (err, result) => {
        if (err) {
          res.status(500);
          console.log(err);
          res.json({ ok: false, message: err.code });
        } else {
          res.status(200);
          res.json(result);
        }
      }
    );
  });

// SEARCH KARAOKE BY ALBUM
router.get("/album", (req, res) => {
    const { q, page, limit } = req.query;
    const start_index = (page - 1) * limit;
    const end_index = limit;
    db.query(
      `select name, artist, kid, album, year, album_cover_art from all_karaoke where album like "${q}%" order by kid desc limit ${start_index},${end_index}`,
      (err, result) => {
        if (err) {
          res.status(500);
          console.log(err);
          res.json({ ok: false, message: err.code });
        } else {
          res.status(200);
          res.json(result);
        }
      }
    );
  });

module.exports = router;
