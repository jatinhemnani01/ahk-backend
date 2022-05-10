const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/table_all_karaoke", (req, res) => {

    const q = 
    `CREATE TABLE all_karaoke (
  kid int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  artist varchar(100) NOT NULL,
  album varchar(100) NOT NULL,
  year date NOT NULL,
  album_cover_art varchar(100) DEFAULT NULL,
  duet tinyint(1) DEFAULT NULL,
  PRIMARY KEY (kid)
  )`

  db.query(q, (err, result) => {
    if (err) {
      res.status(500);
      if(err.code==="ER_TABLE_EXISTS_ERROR"){
          res.json({
              ok:false,
              message:"Table Already Exists"
          })
      }
      console.log(err);
    } else {
        res.status(200);
        res.json({
            ok:true,
            message:"Table Created!"
        });
    }
  });
});



module.exports = router;
