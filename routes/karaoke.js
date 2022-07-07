const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { parseGid } = require("../utils/parseGid");

// GET ALL KARAOKE

const getItems = "kid,name,artist,album,album_cover_art,gid,category";

router.get("/all", (req, res) => {
  const { page, limit } = req.query;
  const start_index = (page - 1) * limit;
  const end_index = limit;
  db.query(
    `select ${getItems} from all_karaoke ORDER BY kid desc limit ${start_index},${end_index}`,
    (err, result) => {
      if (err) {
        res.status(500);
	      console.log(err);
        res.json({
          ok: false,
        });
        return;
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
});

// ADD KARAOKE TO DB
router.post("/add_karaoke", (req, res) => {
  const { name, artist, album, album_cover_art, gid, category } =
    req.body;

  const karaoke = {
    name,
    artist,
    album,
    album_cover_art,
    gid: parseGid(gid),
    category,
    date_added: new Date().toLocaleDateString(),
  };

  db.query("insert into all_karaoke SET ?", karaoke, (err, result) => {
    if (err) {
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
    });
  });
});

// DELETE KARAOKE FROM DB

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = `delete from all_karaoke where kid=${id}`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({
        ok: false,
        message: "Error while deleting data from database",
      });
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Karaoke delted from database",
      });
    }
  });
});

// UPDATE KARAOKE
router.patch("/update", (req, res) => {
  const { kid, name, artist, album, album_cover_art, gid, category } =
    req.body;

  const query =
    "update all_karaoke set name=?, artist=?,album=?,album_cover_art=?,gid=?,category=? where kid=?";
  const data = [
    name,
    artist,
    album,
    album_cover_art,
    parseGid(gid),
    category,
    kid,
  ];

  if (kid == null || undefined || "") {
    res.status(400).json({ ok: false, message: "provide kid to update" });
  } else {
    db.query(query, data, (err, result) => {
      if (err) {
        res.status(400);
        res.json({
          ok: false,
          message: "Error while updating data in database",
        });
      } else {
        res.status(200);
        res.json({
          ok: true,
          message: "data updated in the database",
        });
      }
    });
  }
});

// GET KARAOKE WITH ALBUM
router.get("/album", (req, res) => {
  const { q, page, limit } = req.query;
  const start_index = (page - 1) * limit;
  const end_index = limit;

  const query = `select ${getItems} from all_karaoke where album="${q}" ORDER BY kid desc limit ${start_index},${end_index}`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err);
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

// GET KARAOKE WITH ARTIST
router.get("/artist", (req, res) => {
  const { q, page, limit } = req.query;
  const start_index = (page - 1) * limit;
  const end_index = limit;

  const query = `select ${getItems} from all_karaoke where artist="${q}" ORDER BY kid desc limit ${start_index},${end_index}`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err);
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

// GET KARAOKE WITH KID
router.get("/kid", (req, res) => {
  const { q } = req.query;

  const query = `select ${getItems} from all_karaoke where kid = ${q}`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({
        ok: false,
        message: err.code,
      });
    } else {
      res.status(200);
      res.json(result[0]);
    }
  });
});

module.exports = router;
