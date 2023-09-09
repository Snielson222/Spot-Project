const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
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
      message: "Spot couldn't be found",
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
  if (!spots.Reviews.length) {
    spots.avgStarRating = 0
    spots.numReviews = 0
  }
  delete spots.Reviews;

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

//DELETE A SPOT !!!WORKING!!!
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const editSpot = await Spot.findByPk(req.params.spotId);

  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (req.user.dataValues.id != editSpot.ownerId) {
    res.status(401);
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
    res.status(401);
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

const validateQuery = [
  check("page")
  .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
  .optional()
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .isDecimal({ min: 1 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 1 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];
//GET ALL SPOTS
//*************** NEED QUERY WORK STILL ***************/
router.get("/", validateQuery, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  if (!page) page = 1;
  if (!size) size = 20;
  page = parseInt(page);
  size = parseInt(size);
  let pagination = {};

  if (page >= 1 && size >= 1) {
    if (size > 10) size = 10;
    if (page > 20) page = 20;
    pagination.limit = size;
    pagination.offset = (page - 1) * size;
  }

  let where = {};

  if (minLat && minLat !== "") {
    where.lat = { [Op.gte]: minLat };
  }
  if (maxLat && maxLat !== "") {
    where.lat = { [Op.lte]: maxLat };
  }
  if (minLng && minLng !== "") {
    where.lng = { [Op.gte]: minLng };
  }
  if (maxLng && maxLng !== "") {
    where.lng = { [Op.lte]: maxLng };
  }
  if (minPrice && minPrice !== "") {
    where.price = { [Op.gte]: minPrice };
  }
  if (maxPrice && maxPrice !== "") {
    where.price = { [Op.lte]: maxPrice };
  }

  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }],
    where,
    ...pagination,
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

  return res.json({ Spots: spotsList, page: page, size: size });
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

  let sum = 0;
  spotsList.forEach((spot) => {
    spot.Reviews.forEach((review) => {
      sum += review.stars;
      let avg = sum / spot.Reviews.length;
      spot.avgRating = avg;
    });
    if (!spot.Reviews.length) {
      spot.avgRating = 0
    }
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
  const editSpot = await Spot.findByPk(req.params.imageId);

  if (!editSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (req.user.dataValues.id != editSpot.ownerId) {
    res.status(401);
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
      {
        model: Review,
        include: [
          { model: User, attributes: ["id", "firstName", "lastName"] },
          { model: ReviewImage, attributes: ["id", "url"] },
        ],
      },
    ],
  });

  if (!reviews) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  return res.json({ Reviews: reviews.Reviews });
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
router.post(
  "/:spotId(\\d+)/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const checkSpot = await Spot.findByPk(req.params.spotId, {
      include: { model: Review },
    });

    if (!checkSpot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
      });
    }
    checkSpot.Reviews.forEach((review) => {
      if (req.user.dataValues.id === review.userId) {
        res.status(500);
        return res.json({
          message: "User already has a review for this spot",
        });
      }
    });

    const newReview = await Review.build({
      userId: req.user.dataValues.id,
      spotId: req.params.spotId,
      review,
      stars,
    });
    await newReview.save();
    res.status(201);
    return res.json(newReview);
  }
);

//GET ALL BOOKINGS FOR A SPOT BY ID !!!WORKING!!!
router.get("/:spotId(\\d+)/bookings", requireAuth, async (req, res, next) => {
  const bookings = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Booking,
        include: { model: User, attributes: ["id", "firstName", "lastName"] },
      },
    ],
  });

  if (!bookings) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  jsonBooking = bookings.toJSON();



  if (req.user.dataValues.id != bookings.ownerId) {
    jsonBooking.Bookings.forEach((booking) => {
      delete booking.User;
      delete booking.id;
      delete booking.userId;
      delete booking.createdAt;
      delete booking.updatedAt;
      const start = new Date(booking.startDate)
      booking.startDate = start.toISOString().split('T')[0];
      const end = new Date(booking.endDate)
      booking.endDate = end.toISOString().split('T')[0];
    });
    return res.json({ Bookings: jsonBooking.Bookings });
  }
  if (req.user.dataValues.id == bookings.ownerId) {
    jsonBooking.Bookings.forEach((booking) => {
      const start = new Date(booking.startDate)
      booking.startDate = start.toISOString().split('T')[0];
      const end = new Date(booking.endDate)
      booking.endDate = end.toISOString().split('T')[0];
    })
    return res.json({ Bookings: jsonBooking.Bookings });
  }
});

const validateBooking = [
  check('endDate')
  .custom(async (endDate, {req}) => {
  if (new Date(endDate).getTime() < new Date(req.body.startDate).getTime())
throw new Error("endDate cannot be on or before startDate")}),
  handleValidationErrors,
];

//CREATE A SPOT !!!WORKING!!!
router.post(
  "/:spotId(\\d+)/bookings",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;

    const testSpot = await Spot.findByPk(req.params.spotId, {
      include: { model: Booking },
    });

    
    if (!testSpot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
      });
    }
    const allBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      include: { model: Spot },
    });
    const bookingArray = [];
    allBookings.forEach((booking) => {
      bookingArray.push(booking.toJSON());
    });

    const start = new Date(startDate);
    const end = new Date(endDate);
  
      bookingArray.forEach((booking) => {
        if (
          start.getTime() >= booking.startDate.getTime() &&
          end.getTime() <= booking.endDate.getTime()
        ) {
          res.status(403);
          return res.json({
            message:
              "Sorry, this spot is already booked for the specified dates",
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
        }
      });

    if (testSpot.ownerId == req.user.dataValues.id) {
      res.status(401);
      return res.json("Spot must NOT belong to the current user");
    }

    const newBooking = await Booking.build({
      spotId: req.params.spotId,
      userId: req.user.dataValues.id,
      startDate,
      endDate,
    });
    await newBooking.save();

    return res.json(newBooking);
  }
);

module.exports = router;
