const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET ALL KARAOKE
router.get("/all", (req, res) => {
  db.query("select * from all_karaoke;", (err, result) => {
    if (err) {
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

// GET SINGLE KARAOKE WITH KID
router.get("/", (req, res) => {
  const { kid } = req.query;
  const query = `select * from all_karaoke where kid = ${kid}`;

  db.query(query, (err, result) => {
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

// ADD KARAOKE TO DB
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
  const { kid, name, artist, album, year, album_cover_art, duet } = req.body;

  const query =
    "update all_karaoke set name=?, artist=?,album=?,year=?,album_cover_art=?,duet=? where kid=?";
  const data = [name, artist, album, year, album_cover_art, duet, kid];

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
});

// GET KARAOKE WITH ARTIST, ALBUM, NAME, etc
router.get("/", (req, res) => {
  const { album, artist, name, kid } = req.query;

  if (album) {
    db.query(
      `select * from all_karaoke where album = "${album}"`,
      (err, result) => {
        if (err) {
          res.status(500);
          res.json({
            ok: false,
            message: "Error while getting data",
          });
        } else {
          res.status(200);
          res.json(result);
        }
      }
    );
  } else if (artist) {
    db.query(
      `select * from all_karaoke where artist = "${artist}"`,
      (err, result) => {
        if (err) {
          res.status(500);
          res.json({
            ok: false,
            message: "Error while getting data",
          });
        } else {
          res.status(200);
          res.json(result);
        }
      }
    );
  } else if (name) {
    db.query(
      `select * from all_karaoke where name = "${name}"`,
      (err, result) => {
        if (err) {
          res.status(500);
          res.json({
            ok: false,
            message: "Error while getting data",
          });
        } else {
          res.status(200);
          res.json(result);
        }
      }
    );
  } else if (kid) {
    db.query(`select * from all_karaoke where kid = ${kid}`, (err, result) => {
      if (err) {
        res.status(500);
        res.json({
          ok: false,
          message: "Error while getting data",
        });
      } else {
        res.status(200);
        res.json(result);
      }
    });
  }
});

module.exports = router;
