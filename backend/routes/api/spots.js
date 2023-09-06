const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, Review, SpotImage, User } = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

//GET SPOT BY ID !!!WORKING!!!
router.get("/:spotId(\\d+)", async (req, res, next) => {
  let spots = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: Review },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
  });

  if (!spots) {
    res.status(404);
    return res.json({
      message: "Couldn't find a Spot with the specified id",
    });
  }

  spots = spots.toJSON();

  spots.Reviews.forEach((review) => {
    let sum = 0;
    sum += review.stars;
    let avg = sum / spots.Reviews.length;
    spots.numReviews = spots.Reviews.length;
    spots.avgStarRating = avg;
  });
  delete spots.Reviews;
  // delete spots.SpotImages
  // spots.SpotImages = spots.SpotImages

  spots.Owner = spots.User;
  delete spots.User;

  return res.json(spots);
});
router.post('/', requireAuth, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    
    if (!req.body) {
        res.status(400)
        return res.json({
            "message": "Bad Request",
  "errors": {
    "address": "Street address is required",
    "city": "City is required",
    "state": "State is required",
    "country": "Country is required",
    "lat": "Latitude is not valid",
    "lng": "Longitude is not valid",
    "name": "Name must be less than 50 characters",
    "description": "Description is required",
    "price": "Price per day is required"
  }
        })
    };
    const newSpot = Spot.build

});
//GET ALL SPOTS !!!WORKING!!!
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }],
  });

  if (!spots) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  let spotsList = [];
  spots.forEach((element) => {
    spotsList.push(element.toJSON());
  });

  spotsList.forEach((spot) => {
    spot.Reviews.forEach((review) => {
      let sum = 0;
      sum += review.stars;
      let avg = sum / spot.Reviews.length;
      spot.avgRating = avg;
    });
    delete spot.Reviews;
  });

  spotsList.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      spot.previewImage = image.url;
      if (!spot.previewImage) spot.previewImage = "No Image Found";
    });
    delete spot.SpotImages;
  });

  return res.json({ Spots: spotsList });
});

//GET ALL SPOTS OWNED BY CURRENT USER !!!WORKING!!!
router.get("/current", requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: { "ownerId": req.user.dataValues.id },
        include: [{ model: Review }, {model: User}, {model: SpotImage}],
    });
  
    if (!spots) {
        res.status(404);
        return res.json({
      message: "Spot couldn't be found",
        });
    };

    let spotsList = [];
    spots.forEach((element) => {
      spotsList.push(element.toJSON());
    });
  
    spotsList.forEach((spot) => {
      spot.Reviews.forEach((review) => {
        let sum = 0;
        sum += review.stars;
        let avg = sum / spot.Reviews.length;
        spot.avgRating = avg;
      });
      delete spot.Reviews;
    });
  
    spotsList.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
        spot.previewImage = image.url;
        if (!spot.previewImage) spot.previewImage = "No Image Found";
      });
      delete spot.SpotImages;
      delete spot.User;
    });
  
    return res.json({ Spots: spotsList })
});
module.exports = router;
