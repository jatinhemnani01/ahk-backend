const express = require("express");
const router = express.Router();
const db = require("../db/db");


// SEARCH KARAOKE BY NAME
router.get("/name",(req,res)=>{
    const {q} = req.query;

    db.query(`select name, artist, kid, album, year, album_cover_art from all_karaoke where name like "%${q}%`,(err,result)=>{
        if(err){
            res.status(500);
            res.json({ok:false,message:"Server Error"})
        } else {
            res.status(200)
            res.json({
                ok:true,
                data:result
            });
        }
    })

})

// SEARCH KARAOKE BY ARTIST
router.get('/artist',(req,res)=>{
    const {q} = req.query;
    db.query(`select name, artist, kid, album, year, album_cover_art from all_karaoke where artist like "%${q}%"`,(err,result)=>{
        if(err){
            res.status(500);
            res.json({
                ok:false,
                message:"Server Error"
            })
        } else {
            res.status(200);
            res.json({
                ok:true,
                data:result
            })
        }
    })
})


// SEARCH KARAOKE BY ALBUM
router.get('/album',(req,res)=>{
    const {q} = req.query;
    db.query(`select name, artist, kid, album, year, album_cover_art from all_karaoke where album like "%${q}%"`,(err,result)=>{
        if(err){
            res.status(500);
            res.json({
                ok:false,
                message:"Server Error"
            })
        } else {
            res.status(200);
            res.json({
                ok:true,
                data:result
            })
        }
    })
})

module.exports = router;