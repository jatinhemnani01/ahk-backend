const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/",(req,res)=>{
    const {q} = req.query;

    db.query(`select * from all_karaoke where name like "%${q}%"`,(err,result)=>{
        if(err){
            res.status(500);
            res.json({ok:false,message:"Server Error"})
        } else {
            res.status(200)
            res.json(result);
        }
    })

})


module.exports = router;