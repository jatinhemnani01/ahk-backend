const express = require("express");
const router = express.Router();
const db = require("../db/db");

// CREATE all_karaoke TABLE
router.post("/table_all_karaoke", (req, res) => {
  const q = `CREATE TABLE all_karaoke (
  kid int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  artist varchar(100) NOT NULL,
  album varchar(100) NOT NULL,
  year varchar(10) NOT NULL,
  album_cover_art varchar(1000) DEFAULT NULL,
  duet tinyint(1) DEFAULT NULL,
  PRIMARY KEY (kid)
  )`;

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        res.json({
          ok: false,
          message: "Table Already Exists",
        });
      }
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Table Created!",
      });
    }
  });
});

// CREATE trending TABLE
router.post("/table_trending_karaoke", (req, res) => {
  const q = `CREATE TABLE trending_karaoke (
  id int NOT NULL AUTO_INCREMENT,
  kid int NOT NULL,
  PRIMARY KEY (id)
  )`;

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        res.json({
          ok: false,
          message: "Table Already Exists",
        });
      }
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Table Created!",
      });
    }
  });
});

// CREATE new_karaoke TABLE
router.post("/table_new_karaoke", (req, res) => {
  const q = `CREATE TABLE new_karaoke (
  id int NOT NULL AUTO_INCREMENT,
  kid int NOT NULL,
  PRIMARY KEY (id)
  )`;

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        res.json({
          ok: false,
          message: "Table Already Exists",
        });
      }
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Table Created!",
      });
    }
  });
});



// CREATE popular_karaoke TABLE
router.post("/table_popular_karaoke", (req, res) => {
  const q = `CREATE TABLE popular_karaoke (
  id int NOT NULL AUTO_INCREMENT,
  kid int NOT NULL,
  PRIMARY KEY (id)
  )`;

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        res.json({
          ok: false,
          message: "Table Already Exists",
        });
      }
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Table Created!",
      });
    }
  });
});


// CREATE artists TABLE 
router.post("/table_artists", (req, res) => {
  const q = `CREATE TABLE artists (
    name varchar(100) NOT NULL,
    id int NOT NULL AUTO_INCREMENT,
    artist_image varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    trending tinyint(1) NOT NULL,
    PRIMARY KEY (id)
  )`;

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        res.json({
          ok: false,
          message: "Table Already Exists",
        });
      }
    } else {
      res.status(200);
      res.json({
        ok: true,
        message: "Table Created!",
      });
    }
  });
});

module.exports = router;
