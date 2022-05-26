const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET ALL new_karaoke
router.get("/", (req, res) => {

  const new_karaoke = `select ak.kid,artist,name,album_cover_art,album,year from all_karaoke ak
  join new_karaoke nk on ak.kid=nk.kid order by kid desc`;
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


// DELETE new_karaoke
router.delete("/:kid", (req, res) => {
  const {kid}=req.params;
  const new_karaoke = `delete from new_karaoke where kid = ${kid}`;
  db.query(new_karaoke, (err, result) => {
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
  const new_karaoke = `insert into new_karaoke(kid) values(${kid})`;
  db.query(new_karaoke, (err, result) => {
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
