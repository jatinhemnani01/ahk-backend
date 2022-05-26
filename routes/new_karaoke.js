const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res) => {

  const new_karaoke = `select ak.kid,artist,name,album_cover_art,album,year from all_karaoke ak
  join new_karaoke nk on ak.kid=nk.kid;`;
  db.query(new_karaoke, (err, result) => {
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
