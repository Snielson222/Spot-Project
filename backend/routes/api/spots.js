const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require("../../db/models");
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
const validateLogin = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

//DELETE A SPOT IN PROGRESS
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const editSpot = await Spot.findByPk(req.params.spotId);

  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (req.user.dataValues.id != editSpot.ownerId) {
    res.status(404);
    return res.json({
      message: "Spot must belong to the current user",
    });
  }

  await editSpot.destroy();

  return res.json({
    message: "Successfully deleted",
  });
});

//EDIT A SPOT !!!WORKING!!!
router.put("/:spotId", requireAuth, validateLogin, async (req, res, next) => {
  const editSpot = await Spot.findByPk(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (req.user.dataValues.id != editSpot.ownerId) {
    res.status(404);
    return res.json({
      message: "Spot must belong to the current user",
    });
  }

  editSpot.address = address;
  editSpot.city = city;
  editSpot.state = state;
  editSpot.country = country;
  editSpot.lat = lat;
  editSpot.lgn = lng;
  editSpot.name = name;
  editSpot.description = description;
  editSpot.price = price;

  await editSpot.save();

  res.status(200);
  return res.json(editSpot);
});

//CREATE A SPOT !!!WORKING!!!
router.post("/", requireAuth, validateLogin, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.build({
    ownerId: req.user.dataValues.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await newSpot.save();
  res.status(201);
  return res.json(newSpot);
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
    where: { ownerId: req.user.dataValues.id },
    include: [{ model: Review }, { model: User }, { model: SpotImage }],
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
    delete spot.User;
  });

  return res.json({ Spots: spotsList });
});

//ADD AN IMAGE !!!WORKING!!!
router.post("/:imageId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const editSpot = await SpotImage.findOne({
    where: { spotId: req.params.imageId },
  });

  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (req.user.dataValues.id != editSpot.ownerId) {
    res.status(404);
    return res.json({
      message: "Spot must belong to the current user",
    });
  }

  const newImg = await SpotImage.build({
    spotId: req.params.imageId,
    url,
    preview,
  });
  await newImg.save();

  let newnewImg = newImg.toJSON();
  delete newnewImg.spotId;
  delete newnewImg.updatedAt;
  delete newnewImg.createdAt;
  res.json(newnewImg);
});


//GET REVIEWS BY SPOT ID !!!WORKING!!!
router.get("/:spotId(\\d+)/reviews", async (req, res, next) => {
  let reviews = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Review, include: [{model: User, attributes: ['id', 'firstName', 'lastName']},
      {model: ReviewImage, attributes: ["id", "url"]}
    ]}
    ]
  });

  if (!reviews) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found"
    });
  };

  return res.json({Reviews: reviews.Reviews});
});

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
    check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5")
    .notEmpty()
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
];

//CREATE A REVIEW FOR A SPOT
router.post("/:spotId(\\d+)/reviews", requireAuth, validateReview, async (req, res, next) => {
  const {review, stars} = req.body;
  const checkSpot = await Spot.findByPk(req.params.spotId, {
    include: {model: Review}
  })

  if (!checkSpot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found"
    });
  };
  checkSpot.Reviews.forEach(review => {

    if (req.user.dataValues.id === review.userId){
      res.status(500)
      return res.json({
        "message": "User already has a review for this spot"
      })
    }
  })

  const newReview = await Review.build({
    userId: req.user.dataValues.id,
    spotId: req.params.spotId,
    review,
    stars
  })
  await newReview.save()
  res.status(201)
  return res.json(newReview);
});

//GET ALL BOOKINGS FOR A SPOT BY ID
router.get("/:spotId(\\d+)/bookings", requireAuth, async (req, res, next) => {

  const bookings = await Spot.findByPk(req.params.spotId, {
      include: [{model: Booking,
      include: {model: User,
      attributes: ['id', 'firstName', "lastName"]}}]
  })

  if (!bookings) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found"
        })
  }

  jsonBooking = bookings.toJSON()

  if (req.user.dataValues.id != bookings.ownerId) {
    jsonBooking.Bookings.forEach(booking => {
      delete booking.User
      delete booking.id
      delete booking.userId
      delete booking.createdAt
      delete booking.updatedAt
    })
    return res.json({"Bookings": jsonBooking.Bookings})
  }
  if (req.user.dataValues.id == bookings.ownerId) {
    return res.json({"Bookings":jsonBooking.Bookings})
  }

});

module.exports = router;
