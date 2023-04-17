const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../../models/quotes/quote_schema");

const PolishPrice = require("../../models/pricing/polish_schema");
const ProtPrice = require("../../models/pricing/protection_schema");

router.get("/", (req, res) => {
  res.send("We are on quotes");
});

router.post("/", (req, res) => {
  ProtPrice.findOne().then((items) => {
    let price = 0;
    let polishPricing;
    let protPricing;
    let polishLevel = 0;
    let size = "";

    if (req.body.waterspots === true) polishLevel += 1;
    if (req.body.swirls === true) polishLevel += 1;
    if (req.body.scratches === true) polishLevel += 1;

    protPricing = items;

    switch (req.body.carSize) {
      case "smartCar":
        size = "small";
        break;
      case "porsche":
        size = "small";
        break;
      case "tesla":
        size = "medium";
        break;
      case "suv":
        size = "large";
        break;
      case "truck":
        size = "large";
        break;
      case "van":
        size = "xLarge";
        break;
    }

    PolishPrice.findOne({ size: size }).then((items) => {
      console.log(items);

      switch (polishLevel) {
        case 0:
          price += items.enhancement;
          break;
        case 1:
          price += items.oneStep;
          break;
        default:
          price += items.twoStep;
          break;
      }

      if (protection.contains("wheels")) price += protPricing.wheels;
      if (protection.contains("allWindows")) price += protPricing.allWindows;
      if (
        protection.contains("windshield") &&
        !protection.contains("allWindows")
      ) {
        price += protPricing.windshield;
      }
      if (protection.contains("paint")) price += protPricing.paint;
      if (protection.contains("trimLights")) price += protPricing.trimLights;

      console.log("Price: $" + price);

      // console.log(polishPricing);
    
      const newQuote = new Quote({
        name: req.body.name,
        email: req.body.email,
        carSize: req.body.carSize,
        waterspots: req.body.waterspots,
        swirls: req.body.swirls,
        scratches: req.body.scratches,
        protection: req.body.protection,
        priceEstimation: price,
        emailList: req.body.emailList,
      });
    
      newQuote.save().then((item) => res.json(item));
    });
  });


  console.log("Created new quote");
});

module.exports = router;
