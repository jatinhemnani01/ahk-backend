const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET ALL trending_karaoke
router.get("/", (req, res) => {

  const trending_karaoke = `select ak.kid,artist,name,album_cover_art,album,year from all_karaoke ak
  join trending_karaoke nk on ak.kid=nk.kid order by kid desc`;
  db.query(trending_karaoke, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json(result);
    }
  });
});


// DELETE trending_karaoke
router.delete("/:kid", (req, res) => {
  const {kid}=req.params;
  const trending_karaoke = `delete from trending_karaoke where kid = ${kid}`;
  db.query(trending_karaoke, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json({
        ok:true,
        message:"Deleted from db!"
      });
    }
  });
});

router.post("/", (req, res) => {
  const {kid} = req.body;
  const trending_karaoke = `insert into trending_karaoke(kid) values(${kid})`;
  db.query(trending_karaoke, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json({
        ok:true,
        message:"Added to db!"
      });
    }
  });
});


module.exports = router;
