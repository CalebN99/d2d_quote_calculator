const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../../models/quotes/quote_schema");

const PolishPrice = require("../../models/pricing/polish_schema");
const ProtPrice = require("../../models/pricing/protection_schema");

/**
 * Get
 * Retrieves all Quote objects from the database
 */
router.get("/", (req, res) => {
  Quote.find().then((items) => res.json(items));
});

/**
 * Get
 * Retrieves all Quote objects from the database
 */
router.get("/quote", (req, res) => {
  res.send("Hello")
});

/**
 * Delete
 * Finds Quote object by id and deletes it
 */
router.delete("/:id/delete", (req, res) => {
  Quote.findByIdAndRemove(req.params.id).then((items) =>
    res.send("Deleted Quote")
  );
});

/**
 * Patch
 * Updates Quote ( Specifically updating notes)
 */

router.patch("/:id/update", (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((quote) => {
    if (!quote) {
      return res.statusCode(404).send();
    }
    res.send(quote)
  }).catch((error) => {
    res.statusCode(500).send(error);
  })
})

/**
 * Post
 * Creates a Quote using nested methods
 */
router.post("/", (req, res) => {
  // Pulls Protection Price object
  ProtPrice.findOne().then((items) => {
    let price = 0;
    let protPricing;
    let size = "";

    protPricing = items;

    // Sets size of vehicle based on car based in the body
    switch (req.body.carSize) {
      case "smartCar":
        size = "small";
        break;
      case "porsche":
        size = "medium";
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
      case "passengerVan":
        size = "xLarge";
        break;
    }

    // Pulls Polish Price object based on the size set above
    PolishPrice.findOne({ size: size }).then((items) => {
      let polishLevel = 0;

      // Calculates level of polish based on variables in the body
      if (req.body.waterspots) polishLevel += 1;
      if (req.body.swirls) polishLevel += 1;
      if (req.body.scratches) polishLevel += 1;


      // Based off the polish level above, adds cost of service from the Polish Price object to final price
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

      // Based of services included in the protection array in the body, adds costs from Protection Price
      // object of each service included to the final price
      if (req.body.protection.includes("wheels")) {
        price += protPricing.wheels;
      }
      if (req.body.protection.includes("allWindows")) {
        price += protPricing.allWindows;
      }

       // Checks if allWindows is not selected, if it's not, then it will add windshield pricing
       // if windshield is included
      if (
        req.body.protection.includes("windshield") &&
        !req.body.protection.includes("allWindows")
      ) {
        price += protPricing.windshield;
      }

      if (req.body.protection.includes("paint")) {
        price += protPricing.paint;
      }
      if (req.body.protection.includes("trimLights"))
        price += protPricing.trimLights;

      // Removes windshield from protection array if allWindows is included
      if (
        req.body.protection.includes("windshield") &&
        req.body.protection.includes("allWindows")
      ) {
        req.body.protection = req.body.protection.filter(
          (e) => e !== "windshield"
        );
      }


      console.log("Number:" + req.body.number);

      // Creates new Quote object, saves it to database and returns it to the front-end
      const newQuote = new Quote({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        carSize: req.body.carSize,
        waterspots: req.body.waterSpots,
        swirls: req.body.swirls,
        scratches: req.body.scratches,
        protection: req.body.protection,
        priceEstimation: price,
        emailList: req.body.emailList,
        referer: req.body.referer,
        notes: req.body.notes,
        contactMe: req.body.contactMe
      });

      newQuote.save().then((item) => res.json(item));
    });
  });

  console.log("Created new quote");
});

module.exports = router;
