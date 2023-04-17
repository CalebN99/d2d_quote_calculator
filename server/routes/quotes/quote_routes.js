const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../../models/quotes/quote_schema");

const PolishPrice = require("../../models/pricing/polish_schema");
const ProtPrice = require("../../models/pricing/protection_schema");

router.get("/", (req, res) => {
  Quote.find().then((items) => res.json(items));
});

router.delete("/:id/delete", (req, res) => {
  Quote.findByIdAndRemove(req.params.id).then((items) => res.send("Deleted Quote"))
})

router.post("/", (req, res) => {
  ProtPrice.findOne().then((items) => {
    let price = 0;
    let polishPricing;
    let protPricing;
    let size = "";



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

      let polishLevel = 0;
      console.log(req.body.swirls)
      if (req.body.waterspots) polishLevel += 1;
      if (req.body.swirls) polishLevel += 1;
      if (req.body.scratches) polishLevel += 1;

      console.log("Polish Level: " + polishLevel);

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

      console.log(req.body.protection)

      if (req.body.protection.includes("wheels")) price += protPricing.wheels;
      if (req.body.protection.includes("allWindows")) price += protPricing.allWindows;
      if (
        req.body.protection.includes("windshield") &&
        !req.body.protection.includes("allWindows")
      ) {
        price += protPricing.windshield;
      }
      if (req.body.protection.includes("paint")) price += protPricing.paint;
      if (req.body.protection.includes("trimLights")) price += protPricing.trimLights;



      if (req.body.protection.includes("windshield") &&
      req.body.protection.includes("allWindows")) {
        req.body.protection = req.body.protection.filter(e => e !== "windshield")
      }

      console.log("Price: $" + price);

      // console.log(polishPricing);
    
      const newQuote = new Quote({
        name: req.body.name,
        email: req.body.email,
        carSize: req.body.carSize,
        waterspots: req.body.waterSpots,
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
