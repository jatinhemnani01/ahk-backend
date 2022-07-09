const express = require("express");
const router = express.Router();
const db = require("../db/db");

// function to convert views to string with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

router.post("/count", (req, res) => {
  const { kid } = req.query;
  const query = `SELECT views from all_karaoke ak WHERE kid=${kid};`;

  db.query(query, (err, result) => {
    if (err || result.length == 0) {
      res.json({ message: "No data!" });
    } else {
      const newView = result[0].views + 1;
      db.query(
        `UPDATE all_karaoke SET views=? WHERE kid=${kid};`,
        [newView],
        (err, result) => {
          if (err) {
            res.status(400);
            res.json({ message: "Error on updating views!" });
          } else {
            res.status(200).json({ views: numberWithCommas(newView) });
          }
        }
      );
    }
  });
});

module.exports = router;
