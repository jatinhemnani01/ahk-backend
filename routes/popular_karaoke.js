const express = require("express");
const router = express.Router();
const db = require("../db/db");

const getItems="ak.kid,name,artist,album,album_cover_art,year,gid,category"


// GET ALL popular_karaoke
router.get("/", (req, res) => {

  const popular_karaoke = `select ${getItems} from all_karaoke ak
  join popular_karaoke nk on ak.kid=nk.kid order by kid desc`;
  db.query(popular_karaoke, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json(result);
    }
  });
});


// DELETE popular_karaoke
router.delete("/:kid", (req, res) => {
  const {kid}=req.params;
  const popular_karaoke = `delete from popular_karaoke where kid = ${kid}`;
  db.query(popular_karaoke, (err, result) => {
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
  const popular_karaoke = `insert into popular_karaoke(kid) values(${kid})`;
  db.query(popular_karaoke, (err, result) => {
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
