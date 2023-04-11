const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../../models/quotes/quote_schema")

router.get('/', (req, res) => {
    res.send("We are on quotes")

});

router.post("/", (req, res) => {
    const newQuote = new Quote({
      name: req.body.name,
      email: req.body.email,
      carSize: req.body.carSize,
      waterspots: req.body.waterspots,
      swirls: req.body.swirls,
      scratches: req.body.scratches,
      protection: req.body.protection,
      priceEstimation: req.body.priceEstimation,
      emailList: req.body.emailList
    });

    
  
    newQuote.save().then((item) => res.json(item));
    console.log("Created new quote");
  });




module.exports = router;
