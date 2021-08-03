const express = require('express')
const router = express.Router();
const star = require("../model/star");


router.post('/', async(req,res) =>{
    try{
        const storeRating = new star({
            rating: req.body.rating,
            date: req.body.date,
        });
         const stored = await storeRating.save();
         res.status(201).send(stored);

    }catch(e){
        res.status(400).send(e.name);
    }
});


router.get('/', async(req,res) =>{
    try{
      const getData = await star.find().sort({rating:-1});

      res.status(200).send(getData);
    }catch(e){
       res.status(400).send(e.name);
    }
})

module.exports = router;