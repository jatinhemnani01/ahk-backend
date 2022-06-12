const express = require("express");
const router = express.Router();
const db = require("../db/db");

const getItems="kid,name,artist,album,album_cover_art,year,gid,category"


// GET ALL new_karaoke
router.get("/", (_, res) => {
  const query =
    `select ${getItems} from all_karaoke order by date_added desc limit 10;`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({
        ok: false,
        message: err.code,
      });
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

module.exports = router;
