const express = require("express");
const router = express.Router();
const db = require("../db/db");

const getItems = "name,id,artist_image";

// GET ALL ARTISTS
router.get("/", (req, res) => {
  const artists = `select ${getItems} from artists ORDER BY id desc`;
  db.query(artists, (err, result) => {
    if (err) {
      res.status(500);
      console.log(err);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// GET TRENDING ARTISTS
router.get("/trending", (req, res) => {
  const artists = `select ${getItems} from artists where trending = 1 ORDER BY id desc`;
  db.query(artists, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// ADD AN ARTIST
router.post("/add", (req, res) => {
  const { name, artist_image, trending } = req.body;

  const body = {
    name,
    artist_image,
    trending,
  };

  const artists_query = `INSERT INTO artists SET ?`;
  db.query(artists_query, body, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
      console.log(err);
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Added to db!",
      });
    }
  });
});

// DELETE ARTIST
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const artists_query = `DELETE FROM artists where id = ${id}`;
  db.query(artists_query, (err, result) => {
    if (err) {
      res.status(500);
      res.json({ ok: false, message: "Server Error" });
      console.log(err);
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Deleted from db!",
      });
    }
  });
});

module.exports = router;
