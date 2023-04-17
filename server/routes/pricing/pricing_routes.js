const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PolishPrice = require("../../models/pricing/polish_schema");
const ProtPrice = require("../../models/pricing/protection_schema");

// Protection Pricing
router.get("/protPricing", (req, res) => {
  console.log("Grabbing Prot pricing");

  ProtPrice.findOne().then((items) => res.send(items));
});

router.post("/protPricing", (req, res) => {
  const newProt = new ProtPrice({
    wheels: req.body.wheels,
    paint: req.body.paint,
    windshield: req.body.windshield,
    allWindows: req.body.allWindows,
    trimLights: req.body.trimLights,
  });

  newProt.save().then((item) => res.json(item));
  console.log("Created prot pricing");
});

router.put("/updateProt", (req, res) => {});

// Polish Pricing

router.post("/polishPricing", (req, res) => {
  const newPolish = new PolishPrice({
    size: req.body.size,
    enhancement: req.body.enhancement,
    oneStep: req.body.oneStep,
    twoStep: req.body.twoStep,
  });

  newPolish.save().then((item) => res.json(item));
  console.log("Created new polish pricing");
});

router.get("/polishPricing", (req, res) => {
  PolishPrice.find().then((items) => res.json(items));
});

module.exports = router;
