const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PolishPrice = require("../../models/pricing/polish_schema");
const ProtPrice = require("../../models/pricing/protection_schema");



// Protection Pricing

/**
 * Get
 * Retrieves the protection pricing object from the database
 */
router.get("/protPricing", (req, res) => {
  console.log("Grabbing Prot pricing");

  ProtPrice.findOne().then((items) => res.send(items));
});

/**
 * Post
 * Creates and sends Protection Price object to the database
 */

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

/**
 * Post
 * Searches for protection object by id in the database and updates it
 */

router.post("/updateProt/:id", (req, res) => {

  ProtPrice.findByIdAndUpdate( req.params.id, {
    $set: {
      wheels: req.body.wheels,
      paint: req.body.paint,
      windshield: req.body.windshield,
      allWindows: req.body.allWindows,
      trimLights: req.body.trimLights
    }
  },
  {new : true},
  (err, protPrice) => {
    console.log("Updated ProtPrice");
    if (err) res.send(err);
    else res.send(protPrice);
  }
  )
});



// Polish Pricing

/**
 * Get
 * Retrieves all Polish Price objects
 */

router.get("/polishPricing", (req, res) => {
  PolishPrice.find().then((items) => res.json(items));
});


/**
 * Post
 * Creates and sends new Polish Price object to the database
 */
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


/**
 * Post
 * Finds Polish Price object by id in database and updates it
 */
router.post("/updatePolish/:id", (req, res) => {

  PolishPrice.findByIdAndUpdate( req.params.id, {
    $set: {
      enhancement: req.body.enhancement,
      oneStep: req.body.oneStep,
      twoStep: req.body.twoStep
    }
  },
  {new : true},
  (err, polishPrice) => {
    console.log("Updated PolishPrice");
    if (err) res.send(err);
    else res.send(polishPrice);
  }
  )
});



module.exports = router;
